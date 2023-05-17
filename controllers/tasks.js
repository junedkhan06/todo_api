import { Task } from "../models/task.js";
import ErrorHandler from "../middlewares/error.js";
import { login } from "./user.js";

export const addTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added.",
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const id = req.user._id;

    const tasks = await Task.find({ user: id });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task Not Found", 404));

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "User Updated Successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task Not Found", 404));

    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully!",
    });
  } catch (error) {
    next(error);
  }
};
