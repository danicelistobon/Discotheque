const express = require('express');
const router = express.Router();

const db = require('../database');
const { isNotSignedIn } = require('../lib/auth');

router.get('/', isNotSignedIn, async (req, res) => {
    const clubs = await db.query('SELECT * FROM clubs WHERE user_id = ?', [req.user.id]);
    res.render('user/user', {clubs: clubs});
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

module.exports = router;