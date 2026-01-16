const express = require("express");
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.route("/")
  .get(getTodos)
  .post(createTodo);

router.route("/:id")
  .put(updateTodo)
  .delete(deleteTodo);

module.exports = router;
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
