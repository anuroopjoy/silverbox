import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMailFolder } from '../mailfolder/mailfolder.interfaces';
import { IMailboxItem } from './mailbox.interfaces';

@Component({
    selector: 'app-mailbox',
    templateUrl: './mailbox.component.html',
    styleUrls: ['./mailbox.component.css'],
})
export class MailboxComponent implements OnInit {
    @Output() toggleClicked = new EventEmitter();

    public mailBoxes: IMailboxItem[];
    public selectedMailbox: IMailboxItem;
    public currentIndex = 0;
    public mailFolders: IMailFolder[];
    public masterFolderList: IMailFolder[][];
    public searchFolder = '';
    public showPopup = false;

    public mailForm: FormGroup;
    public get servername() {
        return this.mailForm.get('servername');
    }
    public get username() {
        return this.mailForm.get('username');
    }
    public get password() {
        return this.mailForm.get('password');
    }
    constructor(private fbr: FormBuilder, private http: HttpClient) { }

    async ngOnInit() {
        this.mailForm = this.fbr.group({
            servername: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        // TO DO API Integration
        this.mailBoxes = [
            { name: 'EDW Reports', count: 25 },
            { name: 'FIN Records', count: 5 },
            { name: 'Service Requests', count: 0 },
            { name: 'Database Change Request', count: 0 }
        ];
        const edwReports = (await this.http.get('/GetSubjects')
            .toPromise() as [{ name: string, subjectCount: number }])
            .map(({ name, subjectCount }) => ({ name, count: subjectCount }));
        this.masterFolderList = [
            [...edwReports],
            [
                { name: '(GT2) Daily Funding Report', count: 2 },
                { name: '(GT2) Daily Product Selection Report', count: 15 },
                { name: '(GT2) Daily Linked Account Transaction', count: 5 },
                { name: '(GT2) Dead DDA from Tax Prep', count: 0 },
                { name: '(GT2) Digital Card Bad Address Repost', count: 0 }
            ]];
        this.showDetails(0, this.mailBoxes[0]);
    }

    trackByFn(id: number, index: number) {
        return index;
    }

    showDetails(idx: number, box: IMailboxItem) {
        this.currentIndex = idx;
        this.selectedMailbox = box;
        this.mailFolders = [...this.masterFolderList[idx]];
        this.searchFolder = '';
    }

    searchFolderNames() {
        if (!this.searchFolder) {
            this.mailFolders = [...this.masterFolderList[this.currentIndex]];
        } else {
            this.mailFolders = this.masterFolderList[this.currentIndex].filter((folder) =>
                folder.name.toLowerCase().includes(this.searchFolder.toLowerCase()));
        }
    }

    togglePopup(val: boolean) {
        this.showPopup = val;
    }

    addServer() {
        if (this.mailForm.valid) {
            // TO DO API integration
            console.log(this.mailForm.getRawValue());
            this.showPopup = false;
            this.mailBoxes.push({ name: this.mailForm.getRawValue().servername, count: 0 });
        } else {
            this.mailForm.controls.servername.markAsDirty();
            this.mailForm.controls.username.markAsDirty();
            this.mailForm.controls.password.markAsDirty();
        }
    }

    goToFolderDetails(idx: number) {
        this.toggleClicked.emit(idx);
    }
}
