import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { SlotServices } from "./slot.service";

const getAvailableSlots = catchAsync(async (req: Request, res: Response) => {
  const { date, serviceId } = req.query;

  if (!date || !serviceId) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: "Date and serviceId query parameters are  required",
    });
    return;
  }

  const slots = await SlotServices.getAvailableSlots(
    serviceId as string,
    date as string
  );

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Available slots retrieved successfully",
    data: slots,
  });
});

const createSelectedSlot = catchAsync(async (req: Request, res: Response) => {
  const selectedSlotData = req.body;
  const selectedSlot = await SlotServices.createSelectedSlot(selectedSlotData);
  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Selected Slot created successfully",
    data: selectedSlot,
  });
});

const getAllSelectedSlots = catchAsync(async (req: Request, res: Response) => {
  const selectedSlots = await SlotServices.getAllSelectedSlots();
  res.status(200).json({
    success: true,
    status: httpStatus.OK,
    message: "Selected  Slots retrieved successfully",
    data: selectedSlots,
  });
});
export const SlotController = {
  getAvailableSlots,
  createSelectedSlot,
  getAllSelectedSlots,
};
