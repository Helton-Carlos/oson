import { Router } from "express"; 

const router = Router();

router.get("/", (_req, res) => {
  res.send({
    message: "API is running",
    status: "OK",
  });
});

export { router as routes };