import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [AppComponent, LoginComponent, LoaderComponent],
    imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule,
        MsalModule.forRoot({
            auth: {
                clientId: '7810eed1-849b-414e-949d-ef3807acc75b',
                authority: 'https://login.microsoftonline.com/10e59830-467b-4c63-8749-35eecb39379b',
                redirectUri: environment.appRedirect,
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
