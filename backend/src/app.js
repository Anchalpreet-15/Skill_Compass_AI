import express from "express";
import cors from "cors";
import careerRoutes from "./routes/careerRoutes.js";
// import skillsRoutes from "./routes/skillsRoutes.js";
// import jobRoutes from "./routes/jobRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/career", careerRoutes);
// app.use("/api/skills", skillsRoutes);
// app.use("/api/jobs", jobRoutes);

export default app;
