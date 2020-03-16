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
        description
    };
    await db.query('INSERT INTO clubs set ?', [newClub]);
    res.redirect('/user');
});

module.exports = router;