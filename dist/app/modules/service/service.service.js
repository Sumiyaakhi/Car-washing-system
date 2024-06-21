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
exports.ServiceServices = void 0;
const service_model_1 = require("./service.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createService = (serviceData) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.create(serviceData);
    return service;
});
const getServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findById(id);
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service not found");
    }
    return service;
});
const getAllServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const services = yield service_model_1.Service.find({ isDeleted: false });
    return services;
});
const updateService = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findByIdAndUpdate(id, updatedData, {
        new: true,
    });
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service not found");
    }
    return service;
});
const deleteServiceFromDB = (id, isDeleted) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service not found");
    }
    return service;
});
const createSlots = (slotData) => __awaiter(void 0, void 0, void 0, function* () {
    const { service, date, startTime, endTime } = slotData;
    const serviceDetails = yield service_model_1.Service.findById(service);
    if (!serviceDetails) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service not found");
    }
    const serviceDuration = serviceDetails.duration;
    const startMinutes = parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1]);
    const endMinutes = parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);
    const totalDuration = endMinutes - startMinutes;
    const slots = [];
    for (let i = 0; i < totalDuration; i += serviceDuration) {
        const slotStartMinutes = startMinutes + i;
        const slotEndMinutes = slotStartMinutes + serviceDuration;
        const slotStartTime = `${String(Math.floor(slotStartMinutes / 60)).padStart(2, "0")}:${String(slotStartMinutes % 60).padStart(2, "0")}`;
        const slotEndTime = `${String(Math.floor(slotEndMinutes / 60)).padStart(2, "0")}:${String(slotEndMinutes % 60).padStart(2, "0")}`;
        const slot = yield service_model_1.Slot.create({
            service,
            date,
            isBooked: "available",
            startTime: slotStartTime,
            endTime: slotEndTime,
        });
        slots.push(slot);
    }
    return slots;
});
exports.ServiceServices = {
    createService,
    getServiceById,
    getAllServices,
    updateService,
    deleteServiceFromDB,
    createSlots,
};
