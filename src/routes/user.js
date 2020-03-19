const express = require('express');
const router = express.Router();

const db = require('../database');
const { isNotSignedIn } = require('../lib/auth');

router.get('/', isNotSignedIn, async (req, res) => {
    const clubs = await db.query('SELECT * FROM clubs WHERE user_id = ?', [req.user.id]);
    const events = await db.query('SELECT * FROM events WHERE user_id = ?', [req.user.id]);
    res.render('user/user', {clubs: clubs, events: events});
});

router.get('/edit/:id', isNotSignedIn, async (req, res) => {
    const {id} = req.params;
    const club = await db.query('SELECT * FROM clubs WHERE id = ?', [id]);
    res.render('clubs/edit', {club: club[0]});
});

router.post('/edit/:id', isNotSignedIn, async (req, res) => {
    const {id} = req.params;
    const { name, address, neighborhood_city, club_type, open_doors, rooms, musical_genres, keywords, description } = req.body;
    const editClub = {
        name,
        address,
        neighborhood_city,
        club_type,
        open_doors,
        rooms,
        musical_genres,
        keywords,
        description
    };
    await db.query('UPDATE clubs set ? WHERE id = ?', [editClub, id]);
    res.redirect('/user');
});

router.get('/delete/:id', isNotSignedIn, async (req, res) => {
    const {id} = req.params;
    await db.query('DELETE FROM clubs WHERE id = ?', [id]);
    res.redirect('/user');
});

router.get('/edit/event/:id', isNotSignedIn, async (req, res) => {
    const {id} = req.params;
    const event = await db.query('SELECT * FROM events WHERE id = ?', [id]);
    res.render('clubs/edit_event', {event: event[0]});
});

router.post('/edit/event/:id', isNotSignedIn, async (req, res) => {
    const {id} = req.params;
    const { name, place, date_event, cover, description } = req.body;
    const editEvent = {
        name,
        place,
        date_event,
        cover,
        description,
        user_id: req.user.id
    };
    await db.query('UPDATE events set ? WHERE id = ?', [editEvent, id]);
    res.redirect('/user');
});

router.get('/delete/event/:id', isNotSignedIn, async (req, res) => {
    const {id} = req.params;
    await db.query('DELETE FROM events WHERE id = ?', [id]);
    res.redirect('/user');
});

module.exports = router;