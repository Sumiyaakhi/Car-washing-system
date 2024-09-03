import { Schema, model } from "mongoose";
import { TBooking } from "./bookings.interface";

const BookingSchema = new Schema<TBooking>(
  {
    // _id: {
    //   type: Schema.Types.ObjectId,
    // },

    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      // required: true,
    },
    slotId: {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      // required: true,
    },
    customer: {
      type: Object(),
    },
    slot: {
      type: Object(),
    },
    service: {
      type: Object(),
    },
    vehicleType: {
      type: String,
      required: true,
    },
    vehicleBrand: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    manufacturingYear: {
      type: Number,
      required: true,
    },
    registrationPlate: {
      type: String,
      required: true,
    },
    tran_id: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Booking = model<TBooking>("Booking", BookingSchema);
