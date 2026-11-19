function showHome(req, res) {
  res.render("index", { title: "Members Only", user: req.user, messages: [] });
}

module.exports = { showHome };