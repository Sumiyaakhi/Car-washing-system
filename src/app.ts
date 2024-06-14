import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/modules/routes";
import globalErrorHandler from "./app/modules/middlewares/globalErrorhandler";
import notFound from "./app/modules/middlewares/notFound";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", router);
const test = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get("/", test);

// app.use(globalErrorHandler);

// //Not Found
// app.use(notFound);

export default app;
