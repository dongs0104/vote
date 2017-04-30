var mongoose = require("mongoose");
Schema = mongoose.Schema;
var Solution = mongoose.model("Solution");
var CandidateSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    solutions: {
        type: [Schema.ObjectId],
        require: true,
        ref :Solution
    },
    voted: {
        type: Number,
        require: true
    }
});

mongoose.model("Candidate", CandidateSchema);
