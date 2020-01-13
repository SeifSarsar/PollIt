const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
/////////////////////
const getUserLogin = require("./routes/getUserLogin");
const getUserLoad = require("./routes/getUserLoad");

const getSurvey = require("./routes/getSurvey");
const getSurveysByUser = require("./routes/getSurveysByUser");
const getSurveysByTitle = require("./routes/getSurveysByTitle");
const getSurveysByTags = require("./routes/getSurveysByTags");
const getParticipatedSurveys = require("./routes/getParticipatedSurveys");
const getWeeklySurveys = require("./routes/getWeeklySurveys");

const createUser = require("./routes/createUser");
const createSurvey = require("./routes/createSurvey");
const createVote = require("./routes/createVote");

const deleteSurvey = require("./routes/deleteSurvey");
const deleteVote = require("./routes/deleteVote");

const likeVote = require("./routes/likeVote");
const unlikeVote = require("./routes/unlikeVote");
const changePassword = require("./routes/changePassword");
/////////////////////
const app = express();

const errorHandler = require("./middleware/errorHandler");

app.use(express.json());
app.use(cors({ origin: "http://localhost:4200" }));

app.listen(5000, () => {
  console.log("Server started!");
});

var mongoURI =
  "mongodb+srv://sefoune619:sefoune619@cluster0-lcbbi.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to database!"))
  .catch(error => console.log(error));

app.use("/user/login", getUserLogin); //get user profile*/
app.use("/user/load", getUserLoad); //get user profile*/

app.use("/survey", getSurvey); //get user profile*/
app.use("/surveys/user", getSurveysByUser);
app.use("/surveys/title", getSurveysByTitle);
app.use("/surveys/tags", getSurveysByTags);
app.use("/surveys/participated", getParticipatedSurveys);
app.use("/surveys/weekly", getWeeklySurveys);

//post
app.use("/create/user", createUser);
app.use("/create/survey", createSurvey);
app.use("/create/vote", createVote);

//delete
app.use("/delete/survey", deleteSurvey);
app.use("/delete/vote", deleteVote);

//put
app.use("/like/vote", likeVote);
app.use("/unlike/vote", unlikeVote);

app.use("/change/password", changePassword);

app.use(errorHandler);

/*si je veux trouver les votes d'un survey :
  Find dans votes les votes qui ont le meme idsurvey que celui choisit 

  si je veux trouver les surveys ou le user participe:
  Trouver les votes ayant le meme username que user et populer idsurvey

  si je veux trouver les surveys que le user a creer:
  Trouver surveys avec le meme username que celui connecter ou de recherche

  si je veux trouver les surveys par titre:
  Trouver surveys qui contiennent le string  

*/
