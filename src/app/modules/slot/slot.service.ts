import { Slot } from "../service/service.model";

const getAvailableSlots = async (serviceId: string, date: string) => {
  const slots = await Slot.find({
    service: serviceId,
    date: date,
    isBooked: "available",
  }).populate("service");

  return slots;
};

export const SlotServices = {
  getAvailableSlots,
};
