import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SearchPageComponent } from "./search-page/search-page.component";
import { SurveyPageComponent } from "./survey-page/survey-page.component";
import { UserSurveysPageComponent } from "./user-surveys-page/user-surveys-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { WeeklySurveysPageComponent } from "./weekly-surveys-page/weekly-surveys-page.component";

const routes: Routes = [
  //{ path: 'survey/:id', component: SurveyPageComponent },
  /*{ path: "", component: AboutPageComponent },*/
  { path: "", component: HomePageComponent },
  { path: "surveys/:mode/:value", component: SearchPageComponent },
  { path: "survey/:id", component: SurveyPageComponent },
  { path: "mysurveys", component: UserSurveysPageComponent },
  {
    path: "weeklysurveys",
    component: WeeklySurveysPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
