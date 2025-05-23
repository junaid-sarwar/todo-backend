const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["normal", "medium", "extreme"],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
