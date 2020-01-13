import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { StateService } from "./state.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private stateService: StateService) {
    this.stateService.isLoggedInObs.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      },
      err => {
        this.isLoggedIn = false;
      }
    );
  }

  isLoggedIn: boolean;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isLoggedIn;
  }
}
