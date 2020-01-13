import { Component } from "@angular/core";
import { StateService } from "./state.service";
import { HttpService } from "./http.service";
import { Router } from "@angular/router";
import { User } from "../classes";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(
    private stateService: StateService,
    private httpService: HttpService,
    private router: Router
  ) {
    this.searchMode = "Title";
    this.isSidebarActive = true;
    if (localStorage.getItem("token")) {
      this.stateService.startLoading();
      this.httpService.getUserLoad().subscribe(user => {
        this.stateService.loadUser(user);
        this.stateService.endLoading();
      }),
        err => {
          console.log(err);
          this.stateService.endLoading();
          localStorage.removeItem("token");
        };
    }

    this.stateService.isLoggedInObs.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.stateService.userObs.subscribe(user => {
      this.user = user;
    });

    this.stateService.windowContentObs.subscribe(
      content => (this.content = content)
    );

    this.stateService.isLoadingObs.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  toggleSidebar() {
    document.querySelector(".app").classList.toggle("padding");
    document.querySelector(".sidebar").classList.toggle("active");
  }

  logout() {
    this.stateService.logOut();
    this.router.navigate([`/`]);
  }
  openWindowContent(content: string) {
    this.stateService.openWindowContent(content);
  }
  search(input: string) {
    if (this.searchMode == "Tags") {
      input = input.replace(/,/g, "+");
      input = input.toLowerCase();
    }
    if (input != "")
      this.router.navigate([`/surveys/${this.searchMode}/${input}`]);
  }

  toggleMenu() {
    document
      .getElementsByClassName("search-menu")[0]
      .classList.toggle("active");
  }

  setMode(mode: string) {
    this.searchMode = mode;
    this.toggleMenu();
  }
  user: User;
  isLoggedIn: boolean;

  searchMode: string;
  content: string;
  isLoading: boolean;
  isSidebarActive: boolean;
}
