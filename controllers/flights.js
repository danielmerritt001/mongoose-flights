import { Flight } from "../models/flight.js"

function index(req, res) {
  Flight.find({})
  .then( flights => {
    res.render('flights/index', { 
      title: 'All Flights',
      flights: flights
    })
  })
}
function newFlight(req, res) {
  res.render('flights/new', {
    title: "Add Flight",
  })
}

function create(req, res){
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
}

function flightDelete(req, res) {
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}
export {
  index,
  newFlight as new,
  create,
  flightDelete as delete,
}