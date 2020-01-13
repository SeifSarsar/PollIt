import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-survey-thumbnail",
  templateUrl: "./survey-thumbnail.component.html",
  styleUrls: ["./survey-thumbnail.component.scss"]
})
export class SurveyThumbnailComponent implements OnInit {
  constructor(private router: Router) {}

  @Input("survey") survey: any;

  openSurvey(id: string) {
    this.router.navigate([`/survey/${id}`]);
  }
  ngOnInit() {}
}
