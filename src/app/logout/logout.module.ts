import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LogoutComponent } from './logout.component';

@NgModule({
    declarations: [LogoutComponent],
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: LogoutComponent,
            },
        ]),
    ],
    providers: [],
})
export class LogoutModule {}
