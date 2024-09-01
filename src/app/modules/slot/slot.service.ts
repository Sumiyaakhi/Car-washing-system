import { TSlot } from "../service/service.interface";
import { Slot } from "../service/service.model";
import { SelectedSlot } from "./slot.model";

const getAvailableSlots = async (serviceId: string, date: string) => {
  const slots = await Slot.find({
    service: serviceId,
    date: date,
    isBooked: "available",
  }).populate("service");

  return slots;
};
const createSelectedSlot = async (selectedSlotData: TSlot) => {
  const selectedSlot = await SelectedSlot.create(selectedSlotData);
  return selectedSlot;
};

const getAllSelectedSlots = async () => {
  const selectedSlotdata = await SelectedSlot.find().populate("service");
  return selectedSlotdata;
};

export const SlotServices = {
  getAvailableSlots,
  createSelectedSlot,
  getAllSelectedSlots,
};
