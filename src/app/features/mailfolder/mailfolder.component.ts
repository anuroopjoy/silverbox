import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-mailfolder',
    templateUrl: './mailfolder.component.html',
    styleUrls: ['./mailfolder.component.css'],
})
export class MailfolderComponent implements OnInit {

    public items: any = [];

    public itemsToDisplay: any = [];

    private fromArr = [
        'anuroop.joy@hrblock.com',
        'kiran.cherian@hrblock.com',
        'ajith.kumar@hrblock.com',
        'abhilash.pillai@hrblock.com',
        'arun.jose@hrblock.com',
    ];

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

    @Output() toggleClicked = new EventEmitter();
    constructor() { }

    private randomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    private randomDate(start: Date, end: Date) {
        return new Date(
            start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
    }

    private createMails() {
        for (let i = 0; i < 50; i++) {
            const date = this.randomDate(new Date(2012, 0, 1), new Date()).toLocaleDateString();
            this.items.push({
                from: this.fromArr[this.randomNumber(0, 5)],
                subject: '(GT2) Daily Funding Report - ' + date,
                date,
                collapse: true,
                attachments: [
                    this.attachmentsArr[this.randomNumber(0, 8)],
                    this.attachmentsArr[this.randomNumber(0, 8)]
                ],
            });
        }
    }

    ngOnInit(): void {
        this.createMails();
        this.itemsToDisplay = this.items.slice(0, 5);
    }
}
