const Todo = require("../models/Todo");

// GET todos (pagination + filter)
exports.getTodos = async (req, res) => {
  try {
    const { status, page = 1, limit = 5 } = req.query;

    const query = status ? { status } : {};
    const todos = await Todo.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Todo.countDocuments(query);

    res.json({
      todos,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE todo
exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE status
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE todo
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
