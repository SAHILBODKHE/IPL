const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Vs_Stats_2023=new Schema({
    "batter": {
        "type": "string"
      },
      "bowler": {
        "type": "string"
      },
      "runs_scored": {
        "type": "number"
      },
      "dot_count": {
        "type": "number"
      },
      "four_count": {
        "type": "number"
      },
      "six_count": {
        "type": "number"
      },
      "out_count": {
        "type": "number"
      },
      "balls_faced": {
        "type": "number"
      },
      "running_runs": {
        "type": "number"
      },
      "success_ratio_factor": {
        "type": "number"
      }
    },
)

module.exports = mongoose.model("batters_vs_bowlers_ipl2023", Vs_Stats_2023);
