import { Component, OnInit } from "@angular/core";
import { StateService } from "../state.service";

@Component({
  selector: "app-notifier",
  templateUrl: "./notifier.component.html",
  styleUrls: ["./notifier.component.scss"]
})
export class NotifierComponent implements OnInit {
  constructor(private stateService: StateService) {}

  message: string;
  type: string;
  ngOnInit() {
    this.stateService.notifierMessageObs.subscribe(
      message => (this.message = message)
    );
    this.stateService.notifierTypeObs.subscribe(type => (this.type = type));
  }
}
