import mongoose, { Schema } from "mongoose";
import { Checklist, ITask, TaskStatus } from "../interfaces/taskInterface";

const TaskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    checklistType: { type: String, enum: Object.values(Checklist), required: true },
    videoEmbbed: { type: String, required: false },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: Object.values(TaskStatus), required: true },
    referenceLink: { type: String, required: true },
    approvedBy: { type: String, required: true },
    approvalNote: { type: String, required: true },
    approvedAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
  });
  
  export const TaskModel = mongoose.model<ITask>('Task', TaskSchema);