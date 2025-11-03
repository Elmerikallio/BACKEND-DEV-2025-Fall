import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  zipCode: {
    type: Number,
    required: true,
    min: [10000, "Zip code too short"],
    min: 99999,
  },
  streetAddress: { type: String, required: true },
  vip: Boolean,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

subscriberSchema.methods.getInfo = function () {
  return `Name: ${this.name}
  Email: ${this.email} 
  Zip Code: ${this.zipCode} 
  Street Address: ${this.streetAddress}`;
};

export default mongoose.model("Subscriber", subscriberSchema);
