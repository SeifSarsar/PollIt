import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpService } from "../../http.service";
import { StateService } from "../../state.service";

@Component({
  selector: "app-change-password-form",
  templateUrl: "./change-password-form.component.html",
  styleUrls: ["./change-password-form.component.scss"]
})
export class ChangePasswordFormComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    private stateService: StateService
  ) {}

  form: FormGroup;
  ngOnInit() {
    this.form = new FormGroup(
      {
        currentPassword: new FormControl("", {
          validators: [Validators.required]
        }),
        password: new FormControl("", {
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30)
          ]
        }),
        confirmPassword: new FormControl("")
      },
      {
        validators: [
          this.checkForm("currentPassword", "password", "confirmPassword")
        ],
        updateOn: "submit"
      }
    );
  }

  closeWindowContent() {
    this.stateService.closeWindowContent();
  }

  checkForm(
    currentPassword: string,
    password: string,
    confirmPassword: string
  ) {
    return function(form: FormGroup) {
      const currentPasswordValue = form.get(currentPassword).value;
      const passwordValue = form.get(password).value;
      const confirmPasswordValue = form.get(confirmPassword).value;

      if (currentPasswordValue == passwordValue && form.get(password).valid) {
        return { identicalPassword: "New password must be different" };
      }

      if (passwordValue != confirmPasswordValue) {
        return { notMatch: "Passwords do not match" };
      }
      return null;
    };
  }

  changePassword() {
    if (this.form.valid) {
      const currentPassword = this.form.get("currentPassword").value;
      const password = this.form.get("password").value;
      this.stateService.startLoading();
      this.stateService.userObs.subscribe(user => {
        if (user) {
          this.httpService
            .changePassword(user.id, currentPassword, password)
            .subscribe(
              data => {
                this.stateService.closeWindowContent();
                this.stateService.endLoading();
              },
              err => {
                this.stateService.notify(err.error, "error");
                this.stateService.endLoading();
              }
            );
        }
      });
    }
  }
}
