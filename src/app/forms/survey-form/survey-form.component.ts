import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

import { Validators } from "@angular/forms";
import { HttpService } from "../../http.service";
import { StateService } from "../../state.service";
import { Survey } from "../../../classes";
@Component({
  selector: "app-survey-form",
  templateUrl: "./survey-form.component.html",
  styleUrls: ["./survey-form.component.scss"]
})
export class SurveyFormComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    private stateService: StateService,
    private router: Router
  ) {}

  form: FormGroup;

  choices: string[] = [];
  tags: string[];
  username: string;
  ngOnInit() {
    this.stateService.userObs.subscribe(user => {
      this.username = user.username;
    });

    this.form = new FormGroup({
      title: new FormControl("", {
        validators: [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(100)
        ],
        updateOn: "blur"
      })
    });
  }

  closeWindowContent() {
    this.stateService.closeWindowContent();
  }
  getChoices($event) {
    this.choices = $event;
  }

  getTags($event) {
    this.tags = $event;
  }
  createSurvey() {
    if (this.form.valid && this.choices.length >= 2) {
      let survey: Survey = new Survey(
        this.username,
        this.form.get("title").value,
        this.tags,
        this.choices
      );
      this.stateService.startLoading();
      this.httpService.addSurvey(survey).subscribe(
        data => {
          this.router.navigate([`/survey/${data._id}`]);
          this.stateService.closeWindowContent();
          this.stateService.endLoading();
        },
        err => {
          console.log(err);
          this.stateService.endLoading();
          this.stateService.notify(err.error, "error");
        }
      );
    }
  }
}
