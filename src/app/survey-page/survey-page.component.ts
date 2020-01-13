import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../http.service";
import { StateService } from "../state.service";

@Component({
  selector: "app-survey-page",
  templateUrl: "./survey-page.component.html",
  styleUrls: ["./survey-page.component.scss"]
})
export class SurveyPageComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    private stateService: StateService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}

  survey: any;
  votes: any[];
  user: any;
  userVote: any;
  content: string;
  ngOnInit() {
    this.stateService.startLoading();
    this.activatedRouter.params.subscribe(params =>
      this.httpService.getSurvey(params.id).subscribe(
        data => {
          this.survey = data.survey;
          this.votes = data.votes;
          this.findUserVote();
          this.stateService.endLoading();
        },
        err => {
          console.log(err);
          this.stateService.endLoading();
        }
      )
    );

    this.stateService.windowContentObs.subscribe(
      content => (this.content = content)
    );
  }

  findUserVote() {
    this.stateService.userObs.subscribe(user => {
      this.user = user;
      if (user) {
        for (var i: number = 0; i < this.votes.length; i++) {
          if (this.votes[i].username == this.user.username) {
            this.userVote = this.votes[i];
            return;
          }
        }
      }
    });
  }
  openWindowContent() {
    this.stateService.isLoggedInObs.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.stateService.openWindowContent("vote");
      }
    });
  }

  voteCreated($event) {
    this.userVote = $event;
    this.votes.push($event);
  }
  deleteVote() {
    this.stateService.startLoading();

    this.httpService.deleteVote(this.userVote._id).subscribe(
      data => {
        var i: number = this.votes.findIndex(vote => vote._id == data._id);
        if (i != -1) {
          if (this.votes.length > 1) {
            var temp = this.votes[this.votes.length - 1];
            this.votes[i] = temp;
          }
          this.votes.pop();
        }

        this.userVote = null;
        this.router.navigate([`/mysurveys`]);
        this.stateService.endLoading();
      },
      err => {
        this.stateService.endLoading();
        this.stateService.notify(err.error, "error");
      }
    );
  }

  deleteSurvey() {
    this.stateService.startLoading();

    this.httpService.deleteSurvey(this.survey._id).subscribe(
      survey => {
        this.stateService.endLoading();
      },
      err => {
        this.stateService.endLoading();
        this.stateService.notify(err.error, "error");
      }
    );
  }
}
