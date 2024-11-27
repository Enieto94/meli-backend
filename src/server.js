import express from "express"
import cors from "cors"
import morgan from "morgan";
import itemsRouter from "./routes/items.router.js";

const app = express();

// Middelwares
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(morgan("dev"))

// Routes
app.use("/api", itemsRouter)


export default app