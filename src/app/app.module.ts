import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MsalModule, MsalInterceptor } from '@azure/msal-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
    declarations: [AppComponent, LoginComponent],
    imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule,
        MsalModule.forRoot({
            auth: {
                clientId: '1689ed8a-7378-492c-bb40-4c4829c54a80',
                authority: 'https://login.microsoftonline.com/ecd90453-34b6-4954-926d-56ed3fdb0ca6',
                redirectUri: 'http://localhost:4200/',
            },
            cache: {
                cacheLocation: 'localStorage',
                storeAuthStateInCookie: false, // set to true for IE 11
            },
        },
            {
                popUp: true,
                consentScopes: [
                    'user.read',
                    'openid',
                    'profile',
                ],
                unprotectedResources: [],
                protectedResourceMap: [
                    ['https://graph.microsoft.com/v1.0/me', ['user.read']]
                ],
                extraQueryParameters: {}
            })],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: MsalInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent],
})
export class AppModule { }
