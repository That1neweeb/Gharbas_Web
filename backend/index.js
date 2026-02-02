import express from "express";
import cors from 'cors'
import { connection } from "./db/db.js";
import { router } from "./Routes/userRoutes.js";
import { listingRouter } from "./Routes/listingsRoutes.js";
import { authRouter } from "./Routes/authRoutes.js";

const app = express();
const port = 3000
connection();

app.use(express.json());
app.use(cors());

app.use("/api/users", router);
app.use("/api/listings", listingRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);   
});


// 