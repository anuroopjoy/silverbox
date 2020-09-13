import { IPagination } from '../interfaces/pagination.interface';

export class PaginationHandler {
    // #region Properties (4)

    private ITEMS_PER_PAGE = 5;
    private MAX_PAGES = 5;
    private pConfig: IPagination;

    public pages: number[] = [];

    // #endregion Properties (4)

    // #region Constructors (1)

    constructor(count: number) {
        const countToDisplay = count < this.MAX_PAGES ? 1 : this.MAX_PAGES;
        const last = Math.ceil(count / countToDisplay);
        this.config = { selected: 1, total: count, countToDisplay, last };
    }

    // #endregion Constructors (1)

    // #region Public Accessors (2)

    public get config(): IPagination {
        return this.pConfig;
    }

    public set config(v: IPagination) {
        this.pConfig = v;
    }

    // #endregion Public Accessors (2)

    // #region Public Methods (5)

    public getCurrentPage() {
        return this.config.selected;
    }

    public getNextToDisplay(items: any[], pageNo: number) {
        if (!this.isAvailable(pageNo)) {
            if (!this.handlePagesToShow(pageNo)) {
                pageNo = this.getCurrentPage();
            }
        }
        const end = pageNo * this.ITEMS_PER_PAGE;
        return items.slice(end - 5, end);
    }

    public handlePagesToShow(start: number = 1) {
        const { last, countToDisplay } = this.config;
        if (start >= 1 && start <= last) {
            const lenToDisplay = (last - start) + 1;
            this.pages = Array(
                lenToDisplay > countToDisplay ? countToDisplay : lenToDisplay
            ).fill(null).map((x, i) => i + start);
            return true;
        }
        return false;
    }

    public isAvailable(pageIndex: number) {
        return this.pages.includes(pageIndex);
    }

    public setCurrentPage(pageNo: number) {
        if (this.isAvailable(pageNo)) {
            this.config.selected = pageNo;
        }
    }

    // #endregion Public Methods (5)
}
