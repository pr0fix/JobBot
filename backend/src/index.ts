import express from "express";
import cors from "cors";
import analysisRouter from "../routes/analysisRouter";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", analysisRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
