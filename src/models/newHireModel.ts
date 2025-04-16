import mongoose, { Schema, model } from "mongoose";
import { INewHire } from "../interfaces/newHireInterface";
import { TaskModel } from "./taskModel";

const NewHireSchema = new Schema<INewHire>({
    user_id: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    tasks: { type: [TaskModel], default: [] }, // embeds full task objects
    e201Link: { type: String, required: true }
  }, {
    timestamps: true // adds createdAt, updatedAt
  });
  
  export const NewHireModel = mongoose.model<INewHire>('NewHire', NewHireSchema);