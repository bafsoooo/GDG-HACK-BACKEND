const express = require('express');
const router = express.Router();
const gameCtrl = require('../controllers/gameController');
const auth = require('../middleware/auth');

router.get('/bosses', gameCtrl.getBosses);
router.get('/worlds', gameCtrl.getWorlds);
router.get('/worlds/:worldId/stages', gameCtrl.getStagesByWorld);
router.get('/store', gameCtrl.getStoreItems);

// sessions (save/load)
router.post('/sessions', auth, gameCtrl.saveSession);
router.get('/sessions', auth, gameCtrl.getSessions);

module.exports = router;
