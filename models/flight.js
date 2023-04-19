import mongoose from "mongoose";

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/},
  price: {
    type: Number,
    minlength: 0,
  }
})

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
  departs: {
    type: Date, 
    default: function() {
      const defaultDate = new Date()
      return defaultDate.setFullYear(defaultDate.getFullYear() + 1)
    }
  },
  tickets: [ticketSchema],
  meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}],
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}