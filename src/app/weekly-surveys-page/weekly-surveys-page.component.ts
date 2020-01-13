import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { StateService } from "../state.service";
@Component({
  selector: "app-weekly-surveys-page",
  templateUrl: "./weekly-surveys-page.component.html",
  styleUrls: ["./weekly-surveys-page.component.scss"]
})
export class WeeklySurveysPageComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    private stateService: StateService
  ) {}

  surveys: any[];

  ngOnInit() {
    this.stateService.startLoading();

    this.httpService.getWeeklySurveys().subscribe(
      data => {
        this.surveys = data;
        this.stateService.endLoading();
      },
      err => {
        console.log(err);
        this.surveys = null;
        this.stateService.endLoading();
      }
    );
  }
}
