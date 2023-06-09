const coupon = require("../controller/coupon.controller.js");
const router = require("express").Router();
const verfiy =require("../controller/verifyTokenapi.controller.js");


// router.post("/", verfiy.verifyTokenAndAdmin,coupon.createNewCoupon)
// router.get("/rate/:name",verfiy.verifyToken,coupon.getRateCoupon) 
// router.get("/all",verfiy.verifyTokenAndAdmin,coupon.getAllCoupon) 
// router.get("/:id",verfiy.verifyTokenAndAdmin,coupon.getCouponByAdmin) 
// router.delete("/:id",verfiy.verifyTokenAndAdmin,coupon.deleteCoupon)
// router.put("/:id",verfiy.verifyTokenAndAdmin,coupon.EditCoupon)


router.post("/",coupon.createNewCoupon)
router.get("/rate/:name",coupon.getRateCoupon) 
router.get("/all",coupon.getAllCoupon) 
router.get("/:id",coupon.getCouponByAdmin) 
router.delete("/:id",coupon.deleteCoupon)
router.put("/:id",coupon.EditCoupon)

module.exports = router;