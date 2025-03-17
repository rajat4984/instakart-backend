import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await connect(
      "mongodb+srv://rajat4984:rajat4984@nodeexpressproject.zv05z.mongodb.net/instakart?retryWrites=true&w=majority&appName=NodeExpressProject"
    );
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
