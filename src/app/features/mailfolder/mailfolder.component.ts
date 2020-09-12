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
        last: null
    };
    public paginationArr = [];
    public paginationStartIndex = 0;
    @Input() public selectedFolder: number;
    @Output() public toggleClicked = new EventEmitter();

    constructor() { }

    public changePage(pageNo: number) {
        const end = 5 * pageNo;
        this.itemsToDisplay = this.items.slice(end - 5, end);
        this.pagination = { ...this.pagination, selected: pageNo };
    }

    public ngOnInit(): void {
        this.createMails();
        this.itemsToDisplay = this.items.slice(0, 5);
        const total = this.items.length;
        const countToDisplay = total < 5 ? 1 : 5;
        this.pagination = {
            ...this.pagination,
            selected: 1,
            total,
            countToDisplay,
            last: Math.ceil(total / countToDisplay)
        };
        this.setPaginationStart();
    }


    public next(dir: string = 'front') {
        const index = dir === 'front' ?
            this.pagination.selected + 1 : this.pagination.selected - 1;
        const isPageAvailable = () => this.paginationArr.includes(index);
        if (!isPageAvailable()) {
            this.setPaginationStart(index);
        }
        if (isPageAvailable()) {
            this.changePage(index);
        }
    }

    public setPaginationStart(start: number = 1) {
        const { last } = this.pagination;
        if (start >= 1 && start <= last) {
            this.paginationStartIndex = start;
            this.paginationArr = Array(this.pagination.countToDisplay)
                .fill(null)
                .map((x, i) => i + start);
        }
    }

    private createMails() {
        for (let i = 0; i < 54; i++) {
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
