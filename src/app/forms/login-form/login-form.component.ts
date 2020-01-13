import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { HttpService } from "../../http.service";
import { StateService } from "../../state.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    private stateService: StateService
  ) {}

  form: FormGroup;
  ngOnInit() {
    this.form = new FormGroup(
      {
        email: new FormControl("", {
          validators: [Validators.required, Validators.email]
        }),
        password: new FormControl("", {
          validators: [Validators.required]
        })
      },
      { updateOn: "submit" }
    );
  }
  closeWindowContent() {
    this.stateService.closeWindowContent();
  }

  login() {
    if (this.form.valid) {
      const email = this.form.get("email").value;
      const password = this.form.get("password").value;
      this.stateService.startLoading();
      this.httpService.getUserLogin(email, password).subscribe(
        data => {
          this.stateService.logIn(data.token, data.user);
          this.stateService.closeWindowContent();
          this.stateService.endLoading();
        },
        err => {
          this.stateService.endLoading();

          this.stateService.notify(err.error, "error");
        }
      );
    }
  }
}
