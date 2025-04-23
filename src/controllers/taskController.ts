// createTask
import { Request, Response } from "express";
import { NewHireModel } from "../models/newHireModel";
import { ITask } from "../interfaces/taskInterface";
import { TaskModel } from "../models/taskModel";

export const createTasksInRegister = async (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  try {
    console.log('createTasksInRegister', req.body);

    const tasks = req.body.tasks;
    const savedTasks = await Promise.all(
      tasks.map(async (task: ITask) => {
        console.log('task', task);

        const newTask = new TaskModel({
          ...task,
          user_id: req.body.user_id,
        });
        const savedTask = await newTask.save();
        return savedTask;
      })
    );
    
    console.log('savedTasks', savedTasks);

    const savedTaskIds = savedTasks.map((task) => task._id);
    console.log('savedTaskIds', savedTaskIds);
    req.body.tasks = savedTaskIds;
    next()
  } catch (err: any) {
    console.log('123',err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};
