const verfiy =require("../controller/verifyTokenapi.controller.js");
const router = require("express").Router();
const order = require("../controller/order.controller.js");


// router.post("/createOrder", verfiy.verifyToken, order.createOrder);
// router.get("/", verfiy.verifyTokenAndAdmin, order.getAllOrder);
// router.get("/details/:id", verfiy.verifyToken, order.getOrderById);
// router.get("/user/:id", verfiy.verifyTokenAndAdmin, order.orderUserInfo);
// router.get("/userOrders", verfiy.verifyToken, order.getUserOrders);
// router.get("/user/get/orderCancelled", verfiy.verifyTokenAndAuthorization, order.getUserCancelledOrders);
// router.get("/user/get/ArchivedOrders", verfiy.verifyTokenAndAuthorization, order.getUserArchivedOrders);
// router.get("/top/tenClients", verfiy.verifyTokenAndAuthorization, order.getTop10Clients);
// router.get("/chart/dailyOrders", verfiy.verifyTokenAndAdmin, order.forChart);
// router.get("/chart/incomWeekly", verfiy.verifyTokenAndAdmin, order.incomWeekly);
// router.put("/cancel/:orderId", verfiy.verifyTokenAndAuthorization, order.cancleOrder);
// router.put("/:orderId", verfiy.verifyTokenAndAdmin, order.deliverOrderByAdmin);
// router.post("/pagination", verfiy.verifyToken, order.getAllOrderpagination);


router.post("/createOrder", order.createOrder);
router.get("/", order.getAllOrder);
router.get("/details/:id", order.getOrderById);
router.get("/user/:id", order.orderUserInfo);
router.get("/userOrders", order.getUserOrders);
router.get("/user/get/orderCancelled", order.getUserCancelledOrders);
router.get("/user/get/ArchivedOrders", order.getUserArchivedOrders);
router.get("/top/tenClients", order.getTop10Clients);
router.get("/chart/dailyOrders", order.forChart);
router.get("/chart/incomWeekly", order.incomWeekly);
router.put("/cancel/:orderId", order.cancleOrder);
router.put("/:orderId", order.deliverOrderByAdmin);
router.post("/pagination", order.getAllOrderpagination);

module.exports = router;