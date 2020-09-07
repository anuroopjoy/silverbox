import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { MailfolderComponent } from './mailfolder/mailfolder.component';

@NgModule({
    declarations: [LandingComponent, MailboxComponent, MailfolderComponent],
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: LandingComponent,
            },
        ]),
        CommonModule,
        FormsModule
    ],
    providers: [],
})
export class LandingModule { }
