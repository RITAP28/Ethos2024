import express from "express";
import ErrorMiddleware from "./middleware/error.js";
import cors from "cors";

import user from "./routes/user.route.js";

const app = express();

const corsOptions = {
    origin: "*",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    // credentials: true,
};

app.set('trust proxy', true);
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));

app.use("/api/v1/user", user);

app.use(ErrorMiddleware);

export default app;