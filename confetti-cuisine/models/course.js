import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  maxStudents: {
    type: Number,
    default: 0,
    min: [0, "Course cannot have a negative number of students"],
  },
  cost: {
    type: Number,
    default: 0,
    min: [0, "Course cannot have a negative cost"],
  },
  timestamps: true,
  prequisities: {
    type: [String],
    default: [],
  },
});

export default mongoose.model("Course", courseSchema);
