import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT;

const CONNECTION_URL = `mongodb+srv://sheshank_memories:123123123@cluster0.gjzmo.mongodb.net/?retryWrites=true&w=majority`;
app.use("/user", userRoutes);
app.get("/", (req, res) => res.send("HEllo"));
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`localhost${PORT}`)))
  .catch((err) => console.log(err));
