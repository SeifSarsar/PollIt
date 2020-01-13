import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { Chart } from "chart.js";
@Component({
  selector: "app-survey-chart",
  templateUrl: "./survey-chart.component.html",
  styleUrls: ["./survey-chart.component.scss"]
})
export class SurveyChartComponent implements OnInit {
  constructor() {}

  @ViewChild("chart", { static: true }) chartReference: ElementRef;

  @Input("survey") survey: any;
  @Input("votes") votes: any[];
  chart: Chart;

  getVotesPerChoice() {
    var map: Map<string, number> = new Map();
    for (var i: number = 0; i < this.survey.choices.length; i++) {
      map.set(this.survey.choices[i], 0);
    }
    for (var i: number = 0; i < this.votes.length; i++) {
      map.set(this.votes[i].choice, map.get(this.votes[i].choice) + 1);
    }
    return Array.from(map.values());
  }

  ngOnInit() {
    this.chart = new Chart(this.chartReference.nativeElement, {
      type: "horizontalBar",
      data: {
        labels: this.survey.choices,
        datasets: [
          {
            label: "# of Votes",
            data: this.getVotesPerChoice(),
            backgroundColor: [
              "rgba(255, 50, 100, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 220, 80, 1)",
              "rgba(75,195, 10, 1)",
              "rgba(160, 0, 150, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(0, 0, 0, 1)",
              "rgba(150, 90, 5, 1)"
            ]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: this.survey.title,
          fontSize: 20
        },
        scales: {
          yAxes: [{}],
          xAxes: [
            {
              ticks: {
                max: this.votes.length > 10 ? this.votes.length : 10,
                min: 0,
                stepSize: 1
              }
            }
          ]
        },
        legend: {
          display: false
        },
        responsive: true
      }
    });
  }
}
