export class User {
  constructor(email: string, username: string, password: string) {
    this.email = email;
    this.username = username;
    this.password = password;
  }
  email: string;
  username: string;
  password: string;
}

export class Vote {
  constructor(
    username: string,
    idSurvey: string,
    choice: string,
    comment: string
  ) {
    this.username = username;
    this.idSurvey = idSurvey;
    this.choice = choice;
    this.comment = comment;
  }
  username: string;
  choice: string;
  comment: string;
  idSurvey: string;
}

export class Survey {
  constructor(
    username: string,
    title: string,
    tags: string[],
    choices: string[]
  ) {
    this.username = username;
    this.title = title;
    this.tags = tags;
    this.choices = choices;
  }
  username: string;
  title: string;
  tags: string[];
  choices: string[];
}
