import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User, Survey, Vote } from "../classes";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}
  serverBaseUrl: string = "http://localhost:5000";

  authorize() {
    var token = localStorage.getItem("token");
    var config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    if (token) config.headers["x-auth-token"] = token;
    return config;
  }
  addUser(user: User) {
    return this.http.post<any>(`${this.serverBaseUrl}/create/user`, user);
  }

  getUserLogin(email: string, password: string) {
    return this.http.get<any>(
      `${this.serverBaseUrl}/user/login/${email}/${password}`
    );
  }

  getUserLoad() {
    return this.http.get<any>(
      `${this.serverBaseUrl}/user/load`,
      this.authorize()
    );
  }
  addSurvey(survey: Survey) {
    return this.http.post<any>(
      `${this.serverBaseUrl}/create/survey`,
      survey,
      this.authorize()
    );
  }

  getSurveys(mode: string, input: string) {
    switch (mode) {
      case "Title":
        return this.http.get<any>(
          `${this.serverBaseUrl}/surveys/title/${input}`
        );

      case "User":
        return this.http.get<any>(
          `${this.serverBaseUrl}/surveys/user/${input}`
        );

      case "Tags":
        return this.http.get<any>(
          `${this.serverBaseUrl}/surveys/tags/${input}`
        );
    }
  }

  getWeeklySurveys() {
    return this.http.get<any>(`${this.serverBaseUrl}/surveys/weekly`);
  }

  getParticipatedSurveys(username: string) {
    return this.http.get<any>(
      `${this.serverBaseUrl}/surveys/participated/${username}`,
      this.authorize()
    );
  }
  deleteSurvey(surveyId: string) {
    return this.http.delete<any>(
      `${this.serverBaseUrl}/delete/survey/${surveyId}`,
      this.authorize()
    );
  }

  getSurvey(id: string) {
    return this.http.get<any>(`${this.serverBaseUrl}/survey/${id}`);
  }

  getSurveyVotes(id: string) {
    return this.http.get<any>(`${this.serverBaseUrl}/survey/${id}`);
  }
  addVote(vote: Vote) {
    return this.http.post<any>(
      `${this.serverBaseUrl}/create/vote`,
      vote,
      this.authorize()
    );
  }

  deleteVote(voteId: string) {
    return this.http.delete<any>(
      `${this.serverBaseUrl}/delete/vote/${voteId}`,
      this.authorize()
    );
  }

  likeVote(vote: Vote, userId: string) {
    return this.http.put<any>(
      `${this.serverBaseUrl}/like/vote`,
      { vote, userId },
      this.authorize()
    );
  }
  unlikeVote(vote: Vote, userId: string) {
    return this.http.put<any>(
      `${this.serverBaseUrl}/unlike/vote`,
      { vote, userId },
      this.authorize()
    );
  }

  changePassword(userId: string, currentPassword: string, password: string) {
    return this.http.put<any>(
      `${this.serverBaseUrl}/change/password`,
      { userId, currentPassword, password },
      this.authorize()
    );
  }
}
