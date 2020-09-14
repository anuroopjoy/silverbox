import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PaginationHandler } from '../../helpers/pagination/pagination-handler';
import { IContentSearchResults, IMail } from './mailfolder.interfaces';
import { mockAttachmentsList, mockFromList, mockMailFolders } from './mock.data';

@Component({
    selector: 'app-mailfolder',
    templateUrl: './mailfolder.component.html',
    styleUrls: ['./mailfolder.component.css'],
})
export class MailfolderComponent implements OnInit {
    // #region Properties (7)

    public contentSearchText = '';
    public mailFolders = mockMailFolders;
    public mails: IMail[] = [];
    public mailsViewable: IMail[] = [];
    public pagination: PaginationHandler;
    public displayContentSearch = false;
    public contentSearchResults: IContentSearchResults[] = [];
    @Input() public selectedFolder: number;
    @Output() public toggleClicked = new EventEmitter();

    public searchForm: FormGroup;

    // #endregion Properties (7)

    // #region Constructors (1)

    constructor(private fb: FormBuilder, private http: HttpClient) {
        this.searchForm = this.fb.group({
            keyWord: ['']
        });
    }

    // #endregion Constructors (1)

    // #region Public Methods (6)

    public back() {
        const nextPage = this.pagination.getCurrentPage() - 1;
        this.changePage(nextPage);
    }

    public changeMailFolder(index: number) {
        this.selectedFolder = index;
        this.mails = [];
        this.mailsViewable = [];
        this.createMails();
        this.initializePagination();
    }

    public changePage(pageNo: number) {
        this.mailsViewable = this.pagination.getNextToDisplay(this.mails, pageNo);
        this.pagination.setCurrentPage(pageNo);
    }

    public next() {
        const nextPage = this.pagination.getCurrentPage() + 1;
        this.changePage(nextPage);
    }

    public ngOnInit(): void {
        this.createMails();
        this.initializePagination();
    }

    public toggleItemView(item: IMail) {
        item.isCollapased = !item.isCollapased;
    }

    public async doContentSearch() {
        const keyWord = this.searchForm.get('keyWord').value;
        if (keyWord) {
            this.contentSearchResults = [];
            this.contentSearchResults = (
                await this.http.get('/BlobSearch?keyWord=' + keyWord)
                    .toPromise() as IContentSearchResults[]
            );
            this.toggleMailsView();
        }
    }

    // #endregion Public Methods (6)

    // #region Private Methods (4)

    private createMails() {
        const folder = this.mailFolders[this.selectedFolder];
        if (folder?.useMock) {
            const len = this.randomNumber(10, 55);
            for (let i = 0; i < len; i++) {
                const date = this.randomDate(new Date(2020, 0, 1), new Date())
                    .toLocaleDateString();
                this.mails.push({
                    from: mockFromList[this.randomNumber(0, 5)],
                    subject: folder?.name + ' - ' + date,
                    date,
                    isCollapased: true,
                    attachments: [mockAttachmentsList[this.randomNumber(0, 8)], mockAttachmentsList[this.randomNumber(0, 8)]]
                });
            }
            this.mails = this.mails.sort((x, y) => new Date(x.date) > new Date(y.date) ? -1 : 1);
            folder.count = this.mails.length;
        }
    }

    public toggleMailsView() {
        this.displayContentSearch = this.searchForm.get('keyWord').value;
    }

    private initializePagination() {
        this.pagination = new PaginationHandler(this.mails.length);
        const currentPage = this.pagination.getCurrentPage();
        this.mailsViewable = this.pagination.getNextToDisplay(this.mails, currentPage);
    }

    private randomDate(start: Date, end: Date) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    private randomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // #endregion Private Methods (4)
}
