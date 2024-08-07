// backend/controllers/problemController.js
const Problem = require('../models/Problem');

const createProblem = async (req, res) => {
  const { title, description, tags } = req.body;

  const problem = await Problem.create({
    title,
    description,
    tags,
    user: req.user._id,
  });

  res.status(201).json(problem);
};

const getProblems = async (req, res) => {
  const problems = await Problem.find().populate('user', 'name');

  res.json(problems);
};

const getProblemById = async (req, res) => {
  const problem = await Problem.findById(req.params.id).populate('user', 'name');

  if (problem) {
    res.json(problem);
  } else {
    res.status(404).json({ message: 'Problem not found' });
  }
};

const updateProblem = async (req, res) => {
  const { title, description, tags } = req.body;

  const problem = await Problem.findById(req.params.id);

  if (problem) {
    problem.title = title || problem.title;
    problem.description = description || problem.description;
    problem.tags = tags || problem.tags;

    const updatedProblem = await problem.save();
    res.json(updatedProblem);
  } else {
    res.status(404).json({ message: 'Problem not found' });
  }
};

const deleteProblem = async (req, res) => {
  const problem = await Problem.findById(req.params.id);

  if (problem) {
    await problem.remove();
    res.json({ message: 'Problem removed' });
  } else {
    res.status(404).json({ message: 'Problem not found' });
  }
};

module.exports = {
  createProblem,
  getProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
};
