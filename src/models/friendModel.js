import mongoose from "mongoose";
const friendSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
  },
  image: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "India",
  },
  occupation: {
    type: String,
    default: "",
  },
});
const Friend =
  mongoose.models.friends || mongoose.model("friends", friendSchema);
export default Friend;
