import { Model, ObjectId } from "mongoose";

// Vehicle Interface
export type TBooking = {
  //   customer: ObjectId;
  id: ObjectId;
  serviceId: ObjectId;
  slotId: ObjectId;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
};

// Slot Document Interface
export interface SlotDocument extends TBooking, Document {}
