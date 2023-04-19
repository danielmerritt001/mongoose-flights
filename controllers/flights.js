import { Flight } from "../models/flight.js"
import { Meal } from "../models/meal.js"

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
  const newFlight = new Flight()
  console.log(newFlight)
  res.render('flights/new', {
    title: "Add Flight",
    departsValue: newFlight.departs.toISOString().slice(0,-8)
  })
}

function create(req, res){
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
}
  Flight.create(req.body)
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('flights/new')
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

function show(req, res) {
  Flight.findById(req.params.flightId)
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      res.render('flights/show', {
        title: 'Flight Details',
        flight: flight,
        meals: meals,
    })
  })
  })
}

function edit(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/edit', {
      flight,
      title: "Edit Flight"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res){
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function createTicket(req, res){
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteTicket(req, res) {
  Flight.findById(req.params.ticketId)
}

function deleteTick(req, res) {
  Flight.findById(req.params.flightId)
  .then( flight => {
    flight.tickets[0].remove()
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addMeal(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.meals.push(req.body.mealId)
    flight.save()
		.then(() => {
		  res.redirect(`/flights/${flight._id}`)
		})
    .catch(err => {
      console.log(err);
      res.redirect("/flights")
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/flights")
  })
}

export {
  index,
  newFlight as new,
  create,
  flightDelete as delete,
  show,
  edit,
  update,
  createTicket,
  deleteTicket,
  addMeal,
}