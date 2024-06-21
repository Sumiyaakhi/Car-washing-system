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
exports.ServiceController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const service_service_1 = require("./service.service");
const http_status_1 = __importDefault(require("http-status"));
const createService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceData = req.body;
    const service = yield service_service_1.ServiceServices.createService(serviceData);
    res.status(200).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Service created successfully",
        data: service,
    });
}));
const getServiceById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceId = req.params.id;
    const service = yield service_service_1.ServiceServices.getServiceById(serviceId);
    res.status(200).json({
        status: http_status_1.default.OK,
        message: "Service retrieved successfully",
        success: true,
        data: service,
    });
}));
const getAllServices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const services = yield service_service_1.ServiceServices.getAllServices();
    res.status(200).json({
        success: true,
        status: http_status_1.default.OK,
        message: "Services retrieved successfully",
        data: services,
    });
}));
const updateService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceId = req.params.id;
    const updatedData = req.body;
    const service = yield service_service_1.ServiceServices.updateService(serviceId, updatedData);
    res.status(200).json({
        success: true,
        status: http_status_1.default.OK,
        message: "Service updated successfully",
        data: service,
    });
}));
const deleteService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceId = req.params.id;
    const { isDeleted } = req.body;
    const service = yield service_service_1.ServiceServices.deleteServiceFromDB(serviceId, isDeleted);
    res.status(200).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Service deleted successfully",
        data: service,
    });
}));
const createSlot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slotData = req.body;
    const slots = yield service_service_1.ServiceServices.createSlots(slotData);
    res.status(200).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Slots created successfully",
        data: slots,
    });
}));
exports.ServiceController = {
    createService,
    getServiceById,
    getAllServices,
    updateService,
    deleteService,
    createSlot,
};
