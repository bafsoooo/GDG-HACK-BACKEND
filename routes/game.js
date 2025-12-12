const express = require('express');
const router = express.Router();
const gameCtrl = require('../controllers/gameController');
const auth = require('../middleware/auth');

router.get('/bosses', gameCtrl.getBosses);
router.get('/worlds', gameCtrl.getWorlds);
router.get('/worlds/:worldId/stages', gameCtrl.getStagesByWorld);
router.get('/store', gameCtrl.getStoreItems);

// Create / Update / Delete for worlds
router.post('/worlds', auth, gameCtrl.createWorld);
router.put('/worlds/:id', auth, gameCtrl.updateWorld);
router.delete('/worlds/:id', auth, gameCtrl.deleteWorld);

// stages
router.post('/stages', auth, gameCtrl.createStage);
router.put('/stages/:id', auth, gameCtrl.updateStage);
router.delete('/stages/:id', auth, gameCtrl.deleteStage);

// bosses
router.post('/bosses', auth, gameCtrl.createBoss);
router.put('/bosses/:id', auth, gameCtrl.updateBoss);
router.delete('/bosses/:id', auth, gameCtrl.deleteBoss);

// store items
router.post('/store', auth, gameCtrl.createStoreItem);
router.put('/store/:id', auth, gameCtrl.updateStoreItem);
router.delete('/store/:id', auth, gameCtrl.deleteStoreItem);

// sessions (save/load)
router.post('/sessions', auth, gameCtrl.saveSession);
router.get('/sessions', auth, gameCtrl.getSessions);
router.put('/sessions/:id', auth, gameCtrl.updateSession);
router.delete('/sessions/:id', auth, gameCtrl.deleteSession);

module.exports = router;
