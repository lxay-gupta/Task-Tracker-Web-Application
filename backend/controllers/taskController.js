import Task from '../models/Task.js';

// @desc    Get all tasks (with filtering and sorting)
// @route   GET /api/tasks
export const getTasks = async (req, res, next) => {
  try {
    const { status, priority, sortBy } = req.query;
    const query = {};

    // 1. Filter by Status (Case-Insensitive)
    if (status && status !== 'all') {
      query.status = { $regex: new RegExp('^' + status + '$', 'i') };
    }

    // 2. Filter by Priority (Case-Insensitive)
    if (priority && priority !== 'all') {
      query.priority = { $regex: new RegExp('^' + priority + '$', 'i') };
    }

    // 3. Set up Sorting
    let sortOption = { createdAt: -1 }; // Default: Newest first
    if (sortBy === 'dueDate') {
      sortOption = { dueDate: 1 }; // Earliest due date first
    }

    // 4. Fetch from Database
    const tasks = await Task.find(query).sort(sortOption);
    
    // 5. Send back to frontend
    res.json({ 
      success: true, 
      count: tasks.length, 
      data: tasks 
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.json({ success: true, data: task });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    next(error);
  }
};

// @desc    Create task
// @route   POST /api/tasks
export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
export const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Update the task with the new data
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: task });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    await task.deleteOne();
    res.json({ success: true, data: {} });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    next(error);
  }
};