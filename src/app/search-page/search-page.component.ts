import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { ActivatedRoute } from "@angular/router";
import { StateService } from "../state.service";

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.scss"]
})
export class SearchPageComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    private stateService: StateService,
    private router: ActivatedRoute
  ) {}

  surveys: any[];
  ngOnInit() {
    this.stateService.startLoading();

    this.router.params.subscribe(params =>
      this.httpService.getSurveys(params.mode, params.value).subscribe(
        data => {
          this.surveys = data;
          this.stateService.endLoading();
        },
        err => {
          console.log(err);
          this.surveys = null;
          this.stateService.endLoading();
        }
      )
    );
  }
}
