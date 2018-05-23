const express = require('express');
const router =  express.Router();

const checkAuth = require('../middleware/check-auth');

//controller
const OrdersController = require('../controllers/orders');


router.get('/', checkAuth, OrdersController.orders_get_all ); // I dont pass a function

router.post('/',checkAuth , OrdersController.orders_create_order );

router.get('/:orderid', checkAuth, OrdersController.orders_get_orderid );

router.patch('/:orderid', checkAuth, OrdersController.orders_patch_order );

router.delete('/:orderid', checkAuth, OrdersController.orders_delete_order );

module.exports = router;