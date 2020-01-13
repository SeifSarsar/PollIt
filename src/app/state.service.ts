import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../classes";
@Injectable({
  providedIn: "root"
})
export class StateService {
  constructor() {
    //this.isLoggedIn.next(true); //
  }

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedInObs = this.isLoggedIn.asObservable();

  private user = new BehaviorSubject<any>(null);
  userObs = this.user.asObservable();

  private notifierMessage = new BehaviorSubject<string>(null);
  notifierMessageObs = this.notifierMessage.asObservable();

  private notifierType = new BehaviorSubject<string>(null);
  notifierTypeObs = this.notifierType.asObservable();

  private windowContent = new BehaviorSubject<string>(null);
  windowContentObs = this.windowContent.asObservable();

  private isLoading = new BehaviorSubject<boolean>(null);
  isLoadingObs = this.isLoading.asObservable();

  private surveys = new BehaviorSubject<any>(null);
  surveysObs = this.surveys.asObservable();

  logIn(token: string, user: User) {
    this.isLoggedIn.next(true);
    this.user.next(user);
    localStorage.setItem("token", token);
  }

  loadUser(user: User) {
    this.isLoggedIn.next(true);
    this.user.next(user);
  }
  logOut() {
    this.isLoggedIn.next(false);
    this.user.next(null);
    localStorage.removeItem("token");
  }

  startLoading() {
    this.isLoading.next(true);
  }

  endLoading() {
    this.isLoading.next(false);
  }

  notify(message: string, type: string) {
    this.notifierMessage.next(message);
    this.notifierType.next(type);
    setTimeout(() => {
      this.notifierMessage.next("");
      this.notifierType.next("");
    }, 3000);
  }

  openWindowContent(content: string) {
    this.windowContent.next(content);
  }

  closeWindowContent() {
    this.windowContent.next(null);
  }

  saveSurveys(surveys: any) {
    this.surveys.next(surveys);
  }
}
