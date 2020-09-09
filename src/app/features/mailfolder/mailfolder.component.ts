import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-mailfolder',
    templateUrl: './mailfolder.component.html',
    styleUrls: ['./mailfolder.component.css'],
})
export class MailfolderComponent implements OnInit {

    private attachmentsArr = [
        'Sample.txt',
        'Final.rar',
        'Reports.7z',
        'Files.zip',
        'Main.exe',
        'Temp.txt',
        'Phone.txt',
        'Finance.doc',
        'Test.7z',
    ];
    private fromArr = [
        'anuroop.joy@hrblock.com',
        'kiran.cherian@hrblock.com',
        'ajith.kumar@hrblock.com',
        'abhilash.pillai@hrblock.com',
        'arun.jose@hrblock.com',
    ];

    public items: any = [];
    public itemsToDisplay: any = [];
    public pagination = {
        selected: null,
        total: null,
        countToDisplay: null,
    };
    public paginationArr = [];
    public paginationStartIndex = 0;
    @Input() public selectedFolder: number;
    @Output() public toggleClicked = new EventEmitter();

    constructor() { }

    public changePage(pageNo: number) {
        const end = 5 * pageNo;
        this.itemsToDisplay = this.items.slice(end - 5, end);
        this.pagination = {
            selected: pageNo,
            total: this.items.length,
            countToDisplay: this.items.length < 5 ? this.items.length : 5,
        };
    }

    public ngOnInit(): void {
        this.createMails();
        this.itemsToDisplay = this.items.slice(0, 5);
        this.pagination = {
            selected: 1,
            total: this.items.length,
            countToDisplay: this.items.length < 5 ? this.items.length : 5,
        };
        this.setPaginationStart();
    }

    public setPaginationStart(start: number = 0) {
        if (start >= 0) {
            this.paginationStartIndex = start;
            this.paginationArr = Array(this.pagination.countToDisplay)
                .fill(null)
                .map((x, i) => i + start);
        }
    }

    private createMails() {
        for (let i = 0; i < 50; i++) {
            const date = this.randomDate(
                new Date(2020, 0, 1),
                new Date()
            ).toLocaleDateString();
            this.items.push({
                from: this.fromArr[this.randomNumber(0, 5)],
                subject: '(GT2) Daily Funding Report - ' + date,
                date,
                collapse: true,
                attachments: [
                    this.attachmentsArr[this.randomNumber(0, 8)],
                    this.attachmentsArr[this.randomNumber(0, 8)],
                ],
            });
        }
    }

    private randomDate(start: Date, end: Date) {
        return new Date(
            start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
    }

    private randomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

}
