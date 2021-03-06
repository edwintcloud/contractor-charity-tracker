const Event = require('../models/event.js');
const Donation = require('../models/donation.js')
// let date = new Date(Event.date);

module.exports = function (app) {
    // Root
    app.get('/', (req, res) => {
        Event.find()
        .then(events => {
            Donation.find()
            .then(donations => {
                res.render('index', { events: events, donations: donations });
            })
        }).catch(err => {
            console.log(err);
        })
    })
    // Events
    app.get('/events', (req, res) => {
        Event.find()
        .then(events => {
            Donation.find()
            .then(donations => {
                res.render('events-index', { events: events });
            })
        }).catch(err => {
            console.log(err);
        })
    })

    // New
    app.get('/events/new', (req, res) => {
        res.render('events-new', {

            })
        })
    // Create
    app.post('/events', (req, res) => {
        Event.create(req.body).then((event) => {
            // res.render('events-show', { event: event })
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })


    // Show
    app.get('/events/:id', (req, res) => {
        // res.send('events here!')
        Event.findById(req.params.id)
        .then((event) => {
            Donation.find({ charity: event.charity }).then((donations) => {
                console.log(event.charity);
                res.render('events-show', { event: event, donations: donations });
            })
        }).catch(err => {
            console.log(err.message);
        })

    })
    // Edit
    app.get('/events/:id/edit', (req, res) => {
        Event.findById(req.params.id, function(err, event) {
            res.render('events-edit', { event: event })
        }).catch(err => {
            console.log(err.message);
        })
    })
    // Update
    app.put('/events/:id', (req, res) => {
        Event.findByIdAndUpdate(req.params.id, req.body)
        .then(event => {
            res.redirect(`/events/${event._id}`)
        }).catch(err => {
            console.log(err.message);
        })
    })
    // Delete
    app.delete('/events/:id', function (req, res) {
        console.log('Deleted event!')
        Event.findByIdAndRemove(req.params.id)
        .then((event) => {
            res.redirect('/');
        }).catch(err => {
            console.log(err.message);
        })
    })

}
