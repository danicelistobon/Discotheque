const express = require('express');
const router = express.Router();

const db = require('../database');
const { isNotSignedIn } = require('../lib/auth');

router.get('/', async (req, res) => {
    const clubs = await db.query('SELECT * FROM clubs');
    res.render('clubs/home', {clubs: clubs});
});

router.get('/add', isNotSignedIn, (req, res) => {
    res.render('clubs/add');
});

router.post('/add', isNotSignedIn, async (req, res) => {
    const { name, address, neighborhood_city, club_type, open_doors, rooms, musical_genres, keywords, description } = req.body;
    const newClub = {
        name,
        address,
        neighborhood_city,
        club_type,
        open_doors,
        rooms,
        musical_genres,
        keywords,
        description,
        user_id: req.user.id
    };
    await db.query('INSERT INTO clubs set ?', [newClub]);
    res.redirect('/user');
});

router.get('/club/:id', async (req, res) => {
    const {id} = req.params;
    const club = await db.query('SELECT * FROM clubs WHERE id = ?', [id]);
    const club_name = club[0].name;
    const club_user_id = club[0].user_id;
    const events = await db.query('SELECT * FROM events WHERE place = ? AND user_id = ?', [club_name, club_user_id]);
    res.render('clubs/club_profile', {club: club[0], events: events});
});

router.get('/add/event', isNotSignedIn, (req, res) => {
    res.render('clubs/add_event');
});

router.post('/add/event', isNotSignedIn, async (req, res) => {
    const { name, place, date_event, cover, description } = req.body;
    const newEvent = {
        name,
        place,
        date_event,
        cover,
        description,
        user_id: req.user.id
    };
    await db.query('INSERT INTO events set ?', [newEvent]);
    res.redirect('/user');
});

router.get('/event/:id', async (req, res) => {
    const {id} = req.params;
    const event = await db.query('SELECT * FROM events WHERE id = ?', [id]);
    res.render('clubs/event', {event: event[0]});
});

router.post('/event/:id', isNotSignedIn, async (req, res) => {
    const {id} = req.params;
    const event = await db.query('SELECT * FROM events WHERE id = ?', [id]);
    const event_place = event[0].place;
    const event_name = event[0].name;
    const event_date = event[0].date_event;
    const name = req.user.name + ' ' + req.user.last_name;
    const { id_card } = req.body;
    const newTicket = {
        place_event: event_place,
        name_event: event_name,
        date_event: event_date,
        full_name: name,
        id_card,
        user_id: req.user.id
    };
    await db.query('INSERT INTO tickets set ?', [newTicket]);
    res.redirect('/clubs/ticket');
});

router.get('/ticket', isNotSignedIn, async (req, res) => {
    const ticket = await db.query('SELECT * FROM tickets WHERE user_id = ?', [req.user.id]);
    res.render('clubs/ticket', {ticket: ticket});
});

module.exports = router;