import { Component, OnInit, Input } from "@angular/core";
import { HttpService } from "../http.service";

@Component({
  selector: "app-vote",
  templateUrl: "./vote.component.html",
  styleUrls: ["./vote.component.scss"]
})
export class VoteComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  @Input("vote") vote: any;
  @Input("userId") userId: string;

  liked: boolean;

  ngOnInit() {
    this.liked = this.vote.likes.includes(this.userId);
  }

  toggleLike() {
    if (!this.liked) {
      this.httpService.likeVote(this.vote, this.userId).subscribe(data => {
        this.liked = true;
        this.vote = data;
      });
    } else {
      this.httpService.unlikeVote(this.vote, this.userId).subscribe(data => {
        this.liked = false;
        this.vote = data;
      });
    }
  }
}
