import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PaginationHandler } from '../../helpers/pagination/pagination-handler';
import { IMail } from './mailfolder.interfaces';
import { mockAttachmentsList, mockFromList } from './mock.data';

@Component({
    selector: 'app-mailfolder',
    templateUrl: './mailfolder.component.html',
    styleUrls: ['./mailfolder.component.css'],
})
export class MailfolderComponent implements OnInit {
    // #region Properties (5)

    public items: IMail[] = [];
    public itemsToDisplay: IMail[] = [];
    public pagination: PaginationHandler;
    @Input() public selectedFolder: number;
    @Output() public toggleClicked = new EventEmitter();

    // #endregion Properties (5)

    // #region Constructors (1)

    constructor() { }

    // #endregion Constructors (1)

    // #region Public Methods (4)

    public back() {
        const nextPage = this.pagination.getCurrentPage() - 1;
        this.changePage(nextPage);
    }

    public changePage(pageNo: number) {
        this.itemsToDisplay = this.pagination.getNextToDisplay(this.items, pageNo);
        this.pagination.setCurrentPage(pageNo);
    }

    public next() {
        const nextPage = this.pagination.getCurrentPage() + 1;
        this.changePage(nextPage);
    }

    public ngOnInit(): void {
        this.createMails();
        this.pagination = new PaginationHandler(this.items.length);
        const currentPage = this.pagination.getCurrentPage();
        this.itemsToDisplay = this.pagination.getNextToDisplay(this.items, currentPage);
        this.pagination.handlePagesToShow();
    }

    // #endregion Public Methods (4)

    // #region Private Methods (3)

    private createMails() {
        for (let i = 0; i < 54; i++) {
            const date = this.randomDate(new Date(2020, 0, 1), new Date())
                .toLocaleDateString();
            this.items.push({
                from: mockFromList[this.randomNumber(0, 5)],
                subject: '(GT2) Daily Funding Report - ' + date,
                date,
                isCollapased: true,
                attachments: [mockAttachmentsList[this.randomNumber(0, 8)], mockAttachmentsList[this.randomNumber(0, 8)]]
            });
        }
        this.items = this.items.sort((x, y) => new Date(x.date) > new Date(y.date) ? -1 : 1);
    }

    private randomDate(start: Date, end: Date) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    private randomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // #endregion Private Methods (3)
}
