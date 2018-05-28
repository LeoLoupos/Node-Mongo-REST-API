const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

//'GET' /orders controller
exports.orders_get_all =  async (req, res, next) => {

    try {
        var docs = await Order.find()
                .select('product quantity _id')
                .populate('product', 'name price') //keys are passed as white space separation , or array
                .exec();

    } catch (error) {

        res.status(500).json({
                error: error
        });    
    }

    res.status(200).json({
        count: docs.length,
        orders: await docs.map(doc => { 
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

}


//'POST' /orders controller
exports.orders_create_order = async (req, res, next) => {

    //first we check if the product exists , then we add the new order
    try {
        var product = await Product.findById(req.body.productId);
    } catch (error) {
        res.json(500).json({
            message: 'Product not found',
            error: error
        });
    }

    if(!product){
        res.status(404).json({
            message: 'Product Not Found'
        });
    }

    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    

    try {
        var result = await order.save();
    } catch (error) {
        res.json(500).json({
            message: 'Product not found',
            error: error
        });
    }

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


}
    
//'GET' /orders/id controller
exports.orders_get_orderid = async (req, res, next) => {
    
    try {
        var order = await Order.findById(req.params.orderid).exec();
    } catch (error) {   
        res.status(500).json({
            error: error
        });
    }

    if(!order){
        res.status(404).json({
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
   
}


//'PATCH' /orders/id controller
exports.orders_patch_order = async (req, res) => {
    const id = req.params.orderid;
    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }

    try {
        var result = await Order.update({ _id: id }, { $set: updateOps }).exec()//mongoose $set
    } catch (error) {
        res.status(500).json({
            error: err
        });
    }

    res.status(200).json({
        message: `Order with ID: ${id} has been updated`,
        request: {
            type: 'GET',
            url: `http://localhost:3000/order/${id}`
        }
    });

}


//'DELETE' /orders/id controller
exports.orders_delete_order = async (req, res, next) => {
    const id = req.params.orderid;
    
    try {
        var result = await Order.remove({ _id: id}).exec();
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }

    if(!result){
        res.status(404).json({
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

}