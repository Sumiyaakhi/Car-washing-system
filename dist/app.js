"use strict";
// const app: Application = express();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// //parsers
// app.use(express.json());
// app.use(cors());
// // application routes
// app.use("/api/v1", router);
// const test = (req: Request, res: Response) => {
//   const a = 10;
//   res.send(a);
// };
// app.get("/", test);
// app.use(globalErrorHandler);
// //Not Found
// app.use(notFound);
// export default app;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.default = app;
