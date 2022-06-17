const { Router } = require("express");
const router = Router();
const jwt_decode = require("jwt-decode");

router.get("/", (req, res) => {
  res.render("index.html");
  console.log("라우터 완성");
});

router.get("/login", (req, res) => {
  res.render("login.html");
});

router.post("/login", (req, res) => {
  const userObject = jwt_decode(req.body.token);

  console.log(userObject);

  res.send(req.body);
});

module.exports = router;
