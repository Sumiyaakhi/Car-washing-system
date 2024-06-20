import { Schema, model } from "mongoose";
import { TBooking } from "./bookings.interface";

const BookingSchema = new Schema<TBooking>(
  {
    // customer: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      //   required: true,
    },
    slotId: {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      //   required: true,
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
  },
  { timestamps: true }
);

export const Booking = model<TBooking>("Booking", BookingSchema);
