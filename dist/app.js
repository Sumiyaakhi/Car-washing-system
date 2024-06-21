"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/modules/routes"));
const globalErrorhandler_1 = __importDefault(require("./app/modules/middlewares/globalErrorhandler"));
const notFound_1 = __importDefault(require("./app/modules/middlewares/notFound"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use("/api", routes_1.default);
// const test = (req: Request, res: Response) => {
//   const a = 10;
//   res.send(a);
// };
// app.get("/", test);
app.use(globalErrorhandler_1.default);
//Not Found
app.use(notFound_1.default);
exports.default = app;
