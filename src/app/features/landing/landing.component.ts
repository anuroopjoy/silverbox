import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LandingComponent implements OnInit {

  public appState: any = {};
  private defaultAppState = {
    mailbox: false,
    mailfolder: false
  };
  constructor() { }

  ngOnInit(): void {
    this.showMailboxView();
  }

  showFolderView() {
    this.appState = { ...this.defaultAppState, mailfolder: true };
  }

  showMailboxView() {
    this.appState = { ...this.defaultAppState, mailbox: true };
  }
}
