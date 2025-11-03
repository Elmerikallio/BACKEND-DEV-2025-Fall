import mongoose from "mongoose";
import subscriber from "./subscriber";
//import subscriber from "./subscriber.js";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  last: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },
  zipCode: {
    type: Number,
    min: [10000, "Zip code too short"],
    max: [99999, "Zip code too long"],
  },
  password: {
    type: String,
    required: true,
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  subscribedAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscriber",
  },
});

userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

userSchema.pre("save", function (next) {
  let user = this;
  if (user.subscribedAccount === undefined) {
    subscriber
      .findOne({ email: user.email })
      .then((subscriber) => {
        user.subscribedAccount = subscriber;
        next();
      })
      .catch((error) => {
        console.log(`Error in connecting subsciber: ${error.message}`);
        next(error);
      });
  } else {
    next();
  }
});

export default mongoose.model("User", userSchema);
