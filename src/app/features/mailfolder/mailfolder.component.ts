import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';

import { PaginationHandler } from '../../helpers/pagination/pagination-handler';
import {
    IContentSearchResults,
    IMail,
    IMailFolder,
} from './mailfolder.interfaces';
import { mockAttachmentsList, mockFromList } from './mock.data';

@Component({
    selector: 'app-mailfolder',
    templateUrl: './mailfolder.component.html',
    styleUrls: ['./mailfolder.component.css'],
})
export class MailfolderComponent implements OnInit {
    // #region Properties (7)

    public contentSearchText = '';
    public mailFolders: IMailFolder[] = [];
    public mails: IMail[] = [];
    public mailsViewable: IMail[] = [];
    public pagination: PaginationHandler;
    public displayContentSearch = false;
    public contentSearchResults: IContentSearchResults[] = [];

    public mailFolderIndex: number;

    @Output() public toggleClicked = new EventEmitter();

    @Input() public set selectedFolder(val: number) {
        if (val !== undefined) {
            this.changeMailFolder(val);
        }
    }
    public searchForm: FormGroup;

    // #endregion Properties (7)

    // #region Constructors (1)

    constructor(private fb: FormBuilder, private http: HttpClient, private loaderService: LoaderService) {
        this.searchForm = this.fb.group({
            keyWord: [''],
        });
    }

    // #endregion Constructors (1)

    // #region Public Methods (6)

    public back() {
        const nextPage = this.pagination.getCurrentPage() - 1;
        this.changePage(nextPage);
    }

    public async changeMailFolder(index: number) {
        this.mailFolderIndex = index;
        this.mails = [];
        this.mailsViewable = [];
        await this.getMails();
        this.initializePagination();
    }

    public changePage(pageNo: number) {
        this.mailsViewable = this.pagination.getNextToDisplay(
            this.mails,
            pageNo
        );
        this.pagination.setCurrentPage(pageNo);
    }

    public next() {
        const nextPage = this.pagination.getCurrentPage() + 1;
        this.changePage(nextPage);
    }

    public async ngOnInit() {
        try {
            this.loaderService.isLoading.next(false);
            this.mailFolders = ((await this.http
                .get('/GetSubjects')
                .toPromise()) as [{ name: string; subjectCount: number }]).map(
                    ({ name, subjectCount }) => ({
                        name,
                        count: subjectCount,
                        useMock: false,
                        isSelected: false,
                    })
                );
            this.changeMailFolder(this.mailFolderIndex);
        } catch (err) {
            console.log(err);
            this.loaderService.isLoading.next(false);
        } finally {
            this.loaderService.isLoading.next(false);
        }
    }

    public toggleItemView(item: IMail) {
        item.isCollapased = !item.isCollapased;
    }

    public async doContentSearch() {
        const keyWord = this.searchForm.get('keyWord').value;
        if (keyWord) {
            try {
                this.loaderService.isLoading.next(true);
                this.contentSearchResults = [];
                this.contentSearchResults = (await this.http
                    .get('/BlobSearch?keyWord=' + keyWord)
                    .toPromise()) as IContentSearchResults[];
                this.toggleMailsView();
            } catch (err) {
                console.log(err);
                this.loaderService.isLoading.next(false);
            } finally {
                this.loaderService.isLoading.next(false);
            }
        }
    }

    // #endregion Public Methods (6)

    // #region Private Methods (4)

    private async getMails() {
        if (this.mailFolders.length) {
            const folder = this.mailFolders[this.mailFolderIndex];
            if (folder?.useMock) {
                const len = this.randomNumber(10, 55);
                for (let i = 0; i < len; i++) {
                    const date = this.randomDate(
                        new Date(2020, 0, 1),
                        new Date()
                    ).toLocaleDateString();
                    this.mails.push({
                        from: mockFromList[this.randomNumber(0, 5)],
                        subject: folder?.name + ' - ' + date,
                        date,
                        isCollapased: true,
                        attachments: [
                            { name: mockAttachmentsList[this.randomNumber(0, 8)], link: '' },
                        ],
                    });
                }
                this.mails = this.mails.sort((x, y) =>
                    new Date(x.date) > new Date(y.date) ? -1 : 1
                );
                folder.count = this.mails.length;
            } else {
                try {
                    this.loaderService.isLoading.next(true);
                    this.mails = ((await this.http
                        .get('/GetDetailsFromSubject' + '?subject=' + folder?.name)
                        .toPromise()) as [
                            {
                                MailFrom: string;
                                MailTo: string;
                                Subject: string;
                                FolderName: string;
                                AttachmentId: string;
                            }
                        ]).map((result) => {
                            const { MailFrom, Subject, FolderName, AttachmentId, } = result;
                            return {
                                from: MailFrom, subject: FolderName, isCollapased: true,
                                attachments: [{ name: AttachmentId, link: `https://silverboxblob.blob.core.windows.net/silverbox/${Subject}/${FolderName}/${AttachmentId}` }],
                            } as IMail;
                        });
                } catch (err) {
                    this.loaderService.isLoading.next(false);
                } finally {
                    this.loaderService.isLoading.next(false);
                }
            }
        }
    }

    public toggleMailsView() {
        this.displayContentSearch = this.searchForm.get('keyWord').value;
    }

    private initializePagination() {
        this.pagination = new PaginationHandler(this.mails.length);
        const currentPage = this.pagination.getCurrentPage();
        this.mailsViewable = this.pagination.getNextToDisplay(
            this.mails,
            currentPage
        );
    }

    private randomDate(start: Date, end: Date) {
        return new Date(
            start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
    }

    private randomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // #endregion Private Methods (4)
}
