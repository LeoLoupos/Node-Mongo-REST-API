const mongoose = require('mongoose');
const Product = require('../models/product');


//'GET' /products controller
exports.products_get_all = function(req, res, next){
    Product.find()
    .select('name price _id productImage')
    .exec()//where or limit or select 
    .then(docs => {

        const response = {
            count: docs.length,
            products: docs.map(doc => {  //map each doc and return (can use spread operator)
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc.id,
                    productImage: doc.productImage,                
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/products/${doc._id}`
                    }
                }
            })
        };

        res.status(200).json(response);
       
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
        
    });
    
}

//'POST' /products controller
exports.products_create_product = function(req, res, next){ //single() means one file
    
        console.log(req.file) // because middleware is executed first , we can acces req.file
        //single() wrote the binary image
    
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            productImage: req.file.path
        });
    
        product.save()
        .then(result =>{
            console.log(result);        
            res.status(201).json({
                message: "Created product successfully",
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/products/${result._id}`
                        
                    }
                }
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            })
        });

}

//'GET' /products/id controller
exports.products_get_productid = function(req, res, next){
    const id = req.params.id;
    
    Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc =>{
        console.log('From Database: ' + doc);

        if(doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    description: 'GET_ALL_PRODS',
                    url: 'http://localhost:3000/products'
                }
            });
            
        }else{
            res.status(404).json({
                message: 'No valid entry found for provided ID'
            });
            
        }
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({
            error: error
        })
    });
    
}

//'PATCH' /products/id controller
exports.products_patch_product = function(req, res, next){
    const id = req.params.id;
    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    //we build the { name: req.body.newName , price: req.body.newPrice}
    // but because req.body is not iteratable => [ { "propName": "name", "value": "Harry Poter" } ]

    Product.update({ _id: id }, { $set: updateOps })
    .exec()//mongoose $set
    .then(result =>{
        res.status(200).json({
            message: `Product with ID: ${id} has been updated`,
            request: {
                type: 'GET',
                url: `http://localhost:3000/products/${id}`
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

}

//'DELETE' /products/id controller
exports.product_delete_product =  function(req, res, next){
    const id = req.params.id;
    Product.remove({ _id: id }).exec()
    .then(result =>{
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/products',
                body: { name: 'String', price: 'Number' }
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

}