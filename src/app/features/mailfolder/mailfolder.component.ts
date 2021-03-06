import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PaginationHandler } from '../../helpers/pagination/pagination-handler';
import { IContentSearchResults, IMail, IMailFolder } from './mailfolder.interfaces';
import { generateRandomMails } from './mock.data';

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

    private serverUrl = '';

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
        const { server } = environment;
        this.serverUrl = server;
        try {
            this.loaderService.start();
            this.mailFolders = ((await this.http
                .get(this.serverUrl + '/GetSubjects')
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
            this.loaderService.stop();
        } finally {
            this.loaderService.stop();
        }
    }

    public toggleItemView(item: IMail) {
        item.isCollapased = !item.isCollapased;
    }

    public async doContentSearch() {
        const keyWord = this.searchForm.get('keyWord').value;
        if (keyWord) {
            try {
                this.loaderService.start();
                this.contentSearchResults = [];
                this.contentSearchResults = (await this.http
                    .get(this.serverUrl + '/BlobSearch?keyWord=' + keyWord)
                    .toPromise()) as IContentSearchResults[];
                this.toggleMailsView();
            } catch (err) {
                console.log(err);
                this.loaderService.stop();
            } finally {
                this.loaderService.stop();
            }
        }
    }

    // #endregion Public Methods (6)

    // #region Private Methods (4)

    private async getMails() {
        if (this.mailFolders.length) {
            const folder = this.mailFolders[this.mailFolderIndex];
            if (folder?.useMock) {
                this.mails = generateRandomMails(folder?.name);
                folder.count = this.mails.length;
            } else {
                try {
                    this.loaderService.start();
                    this.mails = ((await this.http
                        .get(this.serverUrl + '/GetDetailsFromSubject' + '?subject=' + folder?.name)
                        .toPromise()) as [
                            {
                                attachmentId: string;
                                attachmentPath: string;
                                folderName: string;
                                mailFrom: string;
                                subject: string;
                                mailContentName: string;
                                emlFileName: string;
                            }
                        ]).map((result) => {
                            const { mailFrom, folderName, attachmentId, attachmentPath, emlFileName, mailContentName } = result;
                            const splitArr = attachmentPath.split('/');
                            const basePath = splitArr.splice(0, (splitArr.length - 1)).join('/');
                            return {
                                from: mailFrom,
                                subject: folderName,
                                isCollapased: true,
                                attachments: [{
                                    name: attachmentId,
                                    link: attachmentPath
                                }],
                                emailLink: basePath + '/' + emlFileName,
                                htmlLink: basePath + '/' + mailContentName
                            } as IMail;
                        });
                } catch (err) {
                    this.loaderService.stop();
                } finally {
                    this.loaderService.stop();
                }
            }
        }
    }

    public toggleMailsView() {
        this.displayContentSearch = this.searchForm.get('keyWord').value;
    }

    public preview(link: string) {
        const win = window.open();
        win.document.write(`<iframe width="560" height="315" src="${link}" frameborder="0" allowfullscreen></iframe>`);
    }

    private initializePagination() {
        this.pagination = new PaginationHandler(this.mails.length);
        const currentPage = this.pagination.getCurrentPage();
        this.mailsViewable = this.pagination.getNextToDisplay(
            this.mails,
            currentPage
        );
    }

    // #endregion Private Methods (4)
}
