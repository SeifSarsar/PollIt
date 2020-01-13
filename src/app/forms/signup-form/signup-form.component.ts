import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpService } from "../../http.service";
import { StateService } from "../../state.service";
import { User } from "../../../classes";

@Component({
  selector: "app-signup-form",
  templateUrl: "./signup-form.component.html",
  styleUrls: ["./signup-form.component.scss"]
})
export class SignupFormComponent implements OnInit {
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
        username: new FormControl("", {
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30)
          ]
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
        validators: this.checkMatch("password", "confirmPassword"),
        updateOn: "submit"
      }
    );
  }

  closeWindowContent() {
    this.stateService.closeWindowContent();
  }
  checkMatch(first: string, second: string) {
    return function(form: FormGroup) {
      const firstValue = form.get(first).value;
      const secondValue = form.get(second).value;

      if (firstValue != secondValue) {
        return { notMatch: "Passwords do not match" };
      }
      return null;
    };
  }

  signUp() {
    if (this.form.valid) {
      //create user

      const user: User = new User(
        this.form.get("email").value,
        this.form.get("username").value,
        this.form.get("password").value
      );
      this.stateService.startLoading();

      this.httpService.addUser(user).subscribe(
        data => {
          this.stateService.closeWindowContent();
          this.stateService.logIn(data.token, data.user);
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
