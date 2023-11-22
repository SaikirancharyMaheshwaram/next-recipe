import mongoose from "mongoose";
import Recipe from "./recipeModel";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: "",
    },
    friendsList: {
      type: Array,
      default: [],
      ref:"friend"
    },
    savedRecipes: { type: Array, default: [] },
    location: {
      type: String,
      default: "India",
    },
    profileCount: {
      type: Number,
      default: 120,
    },
    occupation: {
      type: String,
      default: "other",
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);
const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
