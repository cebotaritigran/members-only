function showHome(req, res) {
  res.render("index", { title: "Members Only" });
}

module.exports = { showHome };