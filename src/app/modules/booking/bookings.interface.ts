import { Model, ObjectId } from "mongoose";

// Vehicle Interface
export interface TBooking {
  //   customer: ObjectId;
  _id: ObjectId;
  customerId: ObjectId;
  serviceId: ObjectId;
  slotId: ObjectId;
  customer: object;
  service: object;
  slot: object;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
}

// Slot Document Interface
export interface SlotDocument extends TBooking, Document {}
