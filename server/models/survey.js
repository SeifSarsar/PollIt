var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SurveySchema = new Schema({
  username: {
    //index
    type: String,
    required: [true, "Survey creator's username required"]
  },
  title: {
    type: String,
    required: [true, "Survey title required"],
    maxlength: 100,
    minlength: 12
  },
  choices: {
    type: [String],
    required: [true, "Survey choices required"],
    validate: {
      validator: function(choices) {
        return choices.length <= 8;
      },
      message: "Survey can not have more than 8 choices"
    }
  },
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  },
  popularity: {
    type: Number,
    default: 0
  }
});

SurveySchema.index({ username: 1 });

module.exports = mongoose.model("Survey", SurveySchema);
