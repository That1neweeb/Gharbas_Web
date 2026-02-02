import express from "express";
import path from 'path';

 //for __dirname in ES module
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.use("/uploads",express.static(path.join(__dirname, 'uploads')));

app.use("/api/users", router);
app.use("/api/listings", listingRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);   
});


// 