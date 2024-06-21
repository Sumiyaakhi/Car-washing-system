"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const slot_service_1 = require("./slot.service");
const getAvailableSlots = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, serviceId } = req.query;
    if (!date || !serviceId) {
        res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            statusCode: http_status_1.default.BAD_REQUEST,
            message: "Date and serviceId query parameters are required",
        });
        return;
    }
    const slots = yield slot_service_1.SlotServices.getAvailableSlots(serviceId, date);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Available slots retrieved successfully",
        data: slots,
    });
}));
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
exports.SlotController = {
    getAvailableSlots,
};
