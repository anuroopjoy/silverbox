import { NgModule } from '@angular/core';
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
    ],
    providers: [],
})
export class LandingModule {}
