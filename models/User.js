import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String },
  token: { type: String },
  id: { type: String },
});
export default mongoose.model("Employee", employeeSchema);
