const router = require("express").Router();
const { homeGetController, dashboardGetController } = require("../controllers/home.controller");
const { checkLogin } = require("../middlewares/checkLogin.middleware");

router.get("/", homeGetController);
router.get("/dashboard", checkLogin, dashboardGetController);

module.exports = router;
