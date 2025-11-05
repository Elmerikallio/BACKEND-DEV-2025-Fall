export function notFoundHandler(req, res) {
  res.status(404).render("404", { url: req.originalUrl });
}
