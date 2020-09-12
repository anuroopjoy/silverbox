import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BroadcastService, MsalService } from '@azure/msal-angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    private loggedIn = false;
    constructor(private broadcastService: BroadcastService, private authService: MsalService, private router: Router) { }

    ngOnInit(): void {
        this.checkAccount();

        this.broadcastService.subscribe('msal:loginSuccess', () => {
            this.checkAccount();
            if (this.loggedIn) {
                this.router.navigateByUrl('/landing');
            }
        });
    }

    checkAccount() {
        this.loggedIn = !!this.authService.getAccount();
    }

    login() {
        this.authService.loginPopup();
    }

}
