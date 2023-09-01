import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
// Login Auth
import { AuthService } from "../../shared/services/auth.service";
import { IUser } from "src/app/shared/models/iuser";
import { Subscription } from "rxjs";
import { MessagesService } from "src/app/shared/services/messages.service";
import { localStorageKeys } from "src/app/shared/models/localStorageKeys";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  // Login Form
  loginForm!: FormGroup<IUser>;
  fieldTextType!: boolean;
  err: string = ''
  subsribes: Subscription[] = [];
  // set the current year
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public message: MessagesService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = new FormGroup<IUser>({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    })
  }

  onSubmit(loginForm: FormGroup) {
    this.spinner.show();
    const formData = loginForm.getRawValue();
    let data: IUser = {
      username: formData.username,
      password: formData.password
    }

    if (!this.loginForm.valid) {
      return;
    }

    let sub = this.auth.login(data).subscribe(
      {
        next: (res) => {
          if (res) {
            localStorage.setItem(localStorageKeys.JWT, res.token);
            this.spinner.hide();
            this.message.toast("Logged In Successfully", "success");
            this.router.navigate(["/products"]);
          } else {
            this.message.toast("Please try again", "error");
          }
        },
        error: (err) => {
          this.spinner.hide();
          this.message.toast("Please return to Admin", "error");
        }
      }
    )
    this.subsribes.push(sub);
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  ngOnDestroy(): void {
    this.subsribes && this.subsribes.forEach((s) => s.unsubscribe());
  }
}
