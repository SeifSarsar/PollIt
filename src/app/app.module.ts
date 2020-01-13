import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { LoginFormComponent } from "./forms/login-form/login-form.component";
import { SignupFormComponent } from "./forms/signup-form/signup-form.component";
import { SurveyFormComponent } from "./forms/survey-form/survey-form.component";
import { SearchPageComponent } from "./search-page/search-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NodesFormComponent } from "./forms/nodes-form/nodes-form.component";
import { SurveyThumbnailComponent } from "./survey-thumbnail/survey-thumbnail.component";
import { SurveyPageComponent } from "./survey-page/survey-page.component";
import { SurveyChartComponent } from "./survey-chart/survey-chart.component";
import { VoteFormComponent } from "./forms/vote-form/vote-form.component";
import { VoteComponent } from "./vote/vote.component";
import { NotifierComponent } from "./notifier/notifier.component";
import { UserSurveysPageComponent } from "./user-surveys-page/user-surveys-page.component";
import { ChangePasswordFormComponent } from "./forms/change-password-form/change-password-form.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { WeeklySurveysPageComponent } from './weekly-surveys-page/weekly-surveys-page.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    SurveyFormComponent,
    SearchPageComponent,
    NodesFormComponent,
    SurveyThumbnailComponent,
    SurveyPageComponent,
    SurveyChartComponent,
    VoteFormComponent,
    VoteComponent,
    NotifierComponent,
    UserSurveysPageComponent,
    ChangePasswordFormComponent,
    HomePageComponent,
    WeeklySurveysPageComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
