import mongoose from "mongoose";

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: {type: String,
      enum: ['American', 'Southwest', 'United']
    },
  airport: {type: String, 
    default: "DEN",
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
  },
  flightNo: {type: Number,
    minlength: 10,
    maxlength: 9999,
  },
  departs: {type: Date, 
    default: function() {
    // need to make this say next year. 
    return new Date().getDate
    }
  }
})