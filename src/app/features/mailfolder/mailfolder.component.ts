import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-mailfolder',
    templateUrl: './mailfolder.component.html',
    styleUrls: ['./mailfolder.component.css'],
})
export class MailfolderComponent implements OnInit {
    @Output() toggleClicked = new EventEmitter();
    constructor() { }

    ngOnInit(): void { }
}
