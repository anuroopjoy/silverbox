import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserDetails } from './login.interfaces';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    public userDetails: Partial<IUserDetails> = {};
    public passwordType = 'password';
    public userForm: FormGroup;
    public get email() {
        return this.userForm.get('email');
    }
    public get password() {
        return this.userForm.get('password');
    }

    constructor(private fb: FormBuilder, private router: Router) { }

    ngOnInit(): void {
        this.userForm = this.fb.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', Validators.required],
        });
    }

    login() {
        if (this.userForm.valid) {
            // TO DO API Integration
            console.log(this.userForm.getRawValue());
            this.router.navigateByUrl('/landing');
        } else {
            this.userForm.controls.email.markAsDirty();
            this.userForm.controls.password.markAsDirty();
        }
    }

    togglePasswordView() {
        if (this.passwordType === 'password') {
            this.passwordType = 'text';
        } else {
            this.passwordType = 'password';
        }
    }
}
