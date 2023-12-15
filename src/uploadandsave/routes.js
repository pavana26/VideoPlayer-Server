const { Router } = require('express');
const controller = require('./controller');

const router = Router();

//router.get("/",controller.getUsers);
router.post("/",controller.storeFile);
router.get("/:videoname",controller.retrieveVideo);

module.exports = router;