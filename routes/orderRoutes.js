const express = require('express');
const orderController = require('./../controllers/orderController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/checkout-session/:productId', orderController.getCheckoutSession);

router.get('/', orderController.getAllOrders);

router
  .route('/:id')
  .get(authController.restrictTo('admin'), orderController.getOrder)
  .delete(authController.restrictTo('admin'), orderController.deleteOrder);

module.exports = router;
