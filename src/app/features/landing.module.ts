import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MailboxComponent } from './mailbox/mailbox.component';
import { MailfolderComponent } from './mailfolder/mailfolder.component';

@NgModule({
    declarations: [
        MailboxComponent,
        MailfolderComponent
    ],
    imports: [
        RouterModule.forChild([{
            path: '', component: MailboxComponent
        }])
    ],
    providers: []
})
export class LandingModule { }
