import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-mailfolder',
    templateUrl: './mailfolder.component.html',
    styleUrls: ['./mailfolder.component.css'],
})
export class MailfolderComponent implements OnInit {
    @Input() selectedFolder: number;
    @Output() toggleClicked = new EventEmitter();
    constructor() { }

    ngOnInit(): void { }
}
