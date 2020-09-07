import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
    constructor() { }

    ngOnInit(): void {
        // TO DO API Integration
        this.mailBoxes = [
            { name: 'EDW Reports', count: 25 },
            { name: 'FIN Records', count: 5 },
            { name: 'Service Requests', count: 0 },
            { name: 'Database Change Request', count: 0 }
        ];
        this.masterFolderList = [
            [
                { name: '(GT2) Daily Funding Report', count: 1 },
                { name: '(GT2) Daily Product Selection Report', count: 12 },
                { name: '(GT2) Daily Linked Account Transaction', count: 0 },
                { name: '(GT2) Dead DDA from Tax Prep', count: 0 },
                { name: '(GT2) Digital Card Bad Address Repost', count: 1 }
            ],
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
}
