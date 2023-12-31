const express = require('express');

const { root_GET, all_GET, delete_POST } = require('../controllers/comments');

const router = express.Router();

router.get('/', (req, res) => {
    root_GET(req, res);
});

router.get('/all', (req, res) => {
    all_GET(req, res);
});

router.post('/delete', (req, res) => {
    delete_POST(req, res);
});

module.exports = router;