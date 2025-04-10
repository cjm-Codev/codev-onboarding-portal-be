import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import connectDB from "./config/dbConfig";

dotenv.config();
const app = express();

app.use(express.json());
dotenv.config();

// Connect to MongoDB
connectDB();

app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
