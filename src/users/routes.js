const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get("/",controller.getUsers);
router.post("/loginuser",controller.authenticateUser);
router.post("/",controller.addUser);

module.exports = router;