import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'SilverBox';

    constructor(private authService: MsalService) { }

    ngOnInit(): void {
        this.authService.handleRedirectCallback((authError, response) => {
            if (authError) {
                console.error('Redirect Error: ', authError.errorMessage);
                return;
            }

            console.log('Redirect Success: ', response.accessToken);
        });

        this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
            console.log('MSAL Logging: ', message);
        }, {
            correlationId: CryptoUtils.createNewGuid(),
            piiLoggingEnabled: false
        }));

    }


}
