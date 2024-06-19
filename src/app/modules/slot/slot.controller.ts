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
      message: "Date and serviceId query parameters are required",
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

// const getSlotByIdHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.params;
//     const slot = await Slot.findById(id).populate("service");
//     if (!slot) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Slot not found" });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Slot retrieved successfully",
//       data: slot,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const updateSlotHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;
//     const updatedSlot = await Slot.findByIdAndUpdate(id, updates, {
//       new: true,
//     });
//     if (!updatedSlot) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Slot not found" });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Slot updated successfully",
//       data: updatedSlot,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const SlotController = {
  getAvailableSlots,
};
