import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { StateService } from "../state.service";
@Component({
  selector: "app-user-surveys-page",
  templateUrl: "./user-surveys-page.component.html",
  styleUrls: ["./user-surveys-page.component.scss"]
})
export class UserSurveysPageComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    private stateService: StateService
  ) {}

  user: any;
  createdSurveys: any[];
  participatedSurveys: any[];

  ngOnInit() {
    this.stateService.startLoading();

    this.stateService.userObs.subscribe(user => {
      if (user) {
        this.user = user;
        this.httpService.getSurveys("User", user.username).subscribe(
          surveys => (this.createdSurveys = surveys),
          err => console.log(err)
        );
        this.httpService.getParticipatedSurveys(user.username).subscribe(
          surveys => {
            this.participatedSurveys = surveys;
            this.stateService.endLoading();
          },
          err => {
            console.log(err);
            this.stateService.endLoading();
          }
        );
      }
    });
  }
}
