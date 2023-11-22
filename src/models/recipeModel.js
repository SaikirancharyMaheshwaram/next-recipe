import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      default: [],
      of: {
        type: { id: String, text: String },
      },
    },

    instructions: {
      type: String,
    },

    imageUrl: {
      type: String,
      // required: true,
    },
    cookingTime: {
      type: Number,
      // required: true,
    },
    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: Map,
      of: Boolean,
      default: new Map(),
    },
    isTweet: {
      type: Boolean,
      required: true,
      default: false,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
const Recipe =
  mongoose.models.recipes || mongoose.model("recipes", recipeSchema);
export default Recipe;
