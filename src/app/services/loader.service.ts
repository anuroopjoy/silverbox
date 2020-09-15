import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoaderService {

    public isLoading = new BehaviorSubject(false);

    private loaders: boolean[] = [];

    constructor() { }

    public start() {
        this.loaders.push(true);
        this.isLoading.next(true);
    }

    public stop() {
        this.loaders.pop();
        if (this.loaders.includes(true)) {
            return;
        }
        this.isLoading.next(false);
    }

}
