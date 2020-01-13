import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Vote } from "../../../classes";
import { HttpService } from "../../http.service";
import { StateService } from "../../state.service";

@Component({
  selector: "app-vote-form",
  templateUrl: "./vote-form.component.html",
  styleUrls: ["./vote-form.component.scss"]
})
export class VoteFormComponent implements OnInit {
  constructor(
    private stateService: StateService,
    private httpService: HttpService
  ) {}

  @Input("choices") choices: string[];
  @Input("idSurvey") idSurvey: string;

  @Output() voteEvent = new EventEmitter<any>();

  form: FormGroup;

  choice: string = null;
  username: string;
  ngOnInit() {
    this.stateService.userObs.subscribe(user => {
      this.username = user.username;
    });
    this.form = this.form = new FormGroup(
      {
        comment: new FormControl("", {
          validators: Validators.maxLength(600)
        })
      },
      { updateOn: "submit" }
    );
  }

  setChoice(choice: string) {
    this.choice = choice;
  }

  closeWindowContent() {
    this.stateService.closeWindowContent();
  }
  vote() {
    if (this.form.valid && this.choice) {
      const vote: Vote = new Vote(
        this.username,
        this.idSurvey,
        this.choice,
        this.form.get("comment").value
      );
      this.stateService.startLoading();
      this.httpService.addVote(vote).subscribe(
        data => {
          this.stateService.closeWindowContent();
          this.voteEvent.emit(data);
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
