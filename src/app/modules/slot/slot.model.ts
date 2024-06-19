import { Schema, model } from "mongoose";

const SlotSchema = new Schema(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: String,
      default: "available",
    },
  },
  { timestamps: true }
);

const Slot = model("Slot", SlotSchema);

module.exports = Slot;
