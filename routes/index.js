const { Router } = require("express");
const { showHome } = require("../controllers/indexController");

const router = Router();

router.get("/", showHome);

module.exports = router;