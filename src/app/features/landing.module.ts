import { NgModule } from '@angular/core';

import { MailboxComponent } from './mailbox/mailbox.component';
import { MailfolderComponent } from './mailfolder/mailfolder.component';

@NgModule({
    declarations: [
        MailboxComponent,
        MailfolderComponent
    ],
    imports: [
    ],
    providers: []
})
export class LandingModule { }
