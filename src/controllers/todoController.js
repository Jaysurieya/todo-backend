const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'text is required' });
    const todo = new Todo({ text });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const todo = await Todo.findByIdAndUpdate(id, updates, { new: true });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};
