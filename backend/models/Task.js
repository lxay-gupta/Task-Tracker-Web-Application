import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    status: {
          status: {
      type: String,
      enum: {
        values: ['pending', 'completed'], // Removed 'in-progress'
        message: '{VALUE} is not a valid status',
      },
      default: 'pending',
    },
    },
    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high'],
        message: '{VALUE} is not a valid priority',
      },
      default: 'medium',
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.index({ status: 1, priority: 1, dueDate: 1 });

const Task = mongoose.model('Task', taskSchema);

export default Task;