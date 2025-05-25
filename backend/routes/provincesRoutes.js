const express = require("express");
const router = express.Router();
const provincesController = require("../controllers/provincesController");
const { auth } = require("../middlewares/authMiddleware");

router.get("/provinces", auth, provincesController.getProvinces);
router.get("/provinces/:code", auth, provincesController.getProvincesByCode);
router.get(
  "/provinces/:code/districts",
  auth,
  provincesController.getDistricts
);
router.get("/districts/:code", auth, provincesController.getDistrictsByCode);
router.get("/districts/:code/wards", auth, provincesController.getWards);
router.get("/wards/:code", auth, provincesController.getWardsByCode);
router.get("/search/provinces", auth, provincesController.searchProvinces);
router.get("/search/districts", auth, provincesController.searchDistricts);
router.get("/search/wards", auth, provincesController.searchWards);

module.exports = router;
