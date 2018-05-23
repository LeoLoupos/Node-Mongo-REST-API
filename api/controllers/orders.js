const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');


//'GET' /orders controller
exports.orders_get_all =  function(req, res, next){
    Order.find()
    .select('product quantity _id')
    .populate('product', 'name price') //keys are passed as white space separation , or array
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: `http:localhost:3000/orders/${doc._id}`
                    }
                }
            })
        });
    })
    .catch(error =>{
        res.status(500).json({
            error: error
        });
        
    });
}

//'POST' /orders controller
exports.orders_create_order = function(req, res, next){
    //first we check if the product exists , then we add the new order
    Product.findById(req.body.productId)
    .then(product =>{
        console.log(product);
        if(!product){
            return res.status(404).json({
                message: 'Product Not Found'
            });
        }

        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });
        
        //Nested promises run only with retrn promise
        return order.save();
    })
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'Order stored',
            createdOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                type: 'GET',
                url: `http:localhost:3000/orders/${result._id}`
            }
        });

    })
    .catch(error =>{
        res.json(500).json({
            message: 'Product not found',
            error: error
        })
    });
}
    
//'GET' /orders/id controller
exports.orders_get_orderid = function(req, res, next){
    Order.findById(req.params.orderid)
    .exec()
    .then(order => {
        if(!order){
            return res.status(404).json({
                message: 'Order not Found'
             });
        }
        
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: `http//:localhost:3000/orders`
            }
             
        });
    })
    .catch(error => {
        res.status(500).json({
           error: error
        });
    })
    
}


//'PATCH' /orders/id controller
exports.orders_patch_order = function(req, res, next){
    const id = req.params.orderid;
    res.status(200).json({
        message: 'Updated order',
        orderId: id
         
    });
}


//'DELETE' /orders/id controller
exports.orders_delete_order = function(req, res, next){
    const id = req.params.orderid;
    
    Order.remove({ _id: id})
    .exec()
    .then(result => {
        if(!result){
            return res.status(404).json({
                message: 'Order not Found'
             });
        }

        res.status(200).json({
            message: `Order with ID: ${id} deleted`,
            request: {
                type: 'POST',
                url: `http//:localhost:3000/orders`,
                body: {
                    productId: 'ID',
                    quantity: 'Number'
                }
            }
             
        });
    })
    .catch(error => {
        res.status(500).json({
            error: error
         });
    })
}