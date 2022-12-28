const { Router } = require("express");

const router = new Router();

router.get("/hello", (request, response) => {
  response.json({ msg: "Salutation", method: "get" });
});
router.post("/hello", (request, response) => {
  response.json({
    msg: "salutation",
    method: "post",
  });
});

router.put("/hello/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.json({
    msg: "salutation " + id,
    method: "put",
    dest: id,
  });
});
router.delete("/hello/:toto", (req, res) => {
  const id = req.params.toto;
  res.json({
    msg: "coucou " + id,
    method: "delete",
    dest: id,
  });
});

module.exports = router;