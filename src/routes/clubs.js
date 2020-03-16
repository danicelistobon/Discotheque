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
    res.render('clubs/club_profile', {club: club[0]});
});

module.exports = router;