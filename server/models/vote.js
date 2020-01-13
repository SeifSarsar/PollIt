var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var VoteSchema = new Schema({
  idsurvey: {
    type: mongoose.Types.ObjectId,
    required: [true, "Survey reference required"]
  },
  username: {
    type: String,
    required: [true, "Vote creator's username required"]
  },
  choice: {
    type: String,
    required: [true, "Vote choice required"]
  },
  comment: {
    type: String,
    maxlength: 600
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
});

VoteSchema.index(
  { idsurvey: 1, username: -1 },
  { unique: [true, "User can only vote once in a survey"] }
);

module.exports = mongoose.model("Vote", VoteSchema);
