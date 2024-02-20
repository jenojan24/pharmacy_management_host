import express from "express";
import distributorController from "../controllers/distributor.js";
const router=express.Router();

//All routes are here


router.get("/distributors",distributorController.getAllDistributors);
router.post("/distributors",distributorController.createDistributor);
router.get("/distributors/single/:id",distributorController.getSingleDistributor);
router.put("/distributors/:id",distributorController.updateDistributor);
router.delete("/distributors/:id",distributorController.deleteDistributor);
router.get("/distributors/search?",distributorController.getsearchSDistributor);

export default router;
