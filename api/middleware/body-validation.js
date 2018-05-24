const Joi = require('joi');

function validateUser (req, res, next) {
    // fetch the request data
    const data = req.body;

    // define the validation schema
    const schema = Joi.object().keys({

        // email is required
        // email must be a valid email string
        //convert to lowercase
        email: Joi.string().email().required().lowercase(),

        // password is required
        // and must be a string , of length 3-30
        // and only letters and numbers
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        
    });

    // validate the request data against the schema
    Joi.validate(data, schema, (err, value) => {


        if (err) {
            // send a 422 error response if validation fails
            res.status(422).json({
                status: 'error',
                message: 'Invalid request data',
                data: data
            });
        } else {
           next();
        }

    });


};

function validateOrder (req, res, next) {
    // fetch the request data
    const data = req.body;

    // define the validation schema
    const schema = Joi.object().keys({  

        // product is required
        // alphanumeric ,valid string and 24 length (MongoDB ObjectID)
        productId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),

        // quantity is required
        // and must be a number , of length > 1
        quantity: Joi.number().positive().greater(1).required()
        
    });

    // validate the request data against the schema
    Joi.validate(data, schema, (err, value) => {

        if (err) {
            // send a 422 error response if validation fails
            res.status(422).json({
                status: 'error',
                message: 'Invalid request data',
                data: data
            });
        } else {
           next();
        }

    });
};

function validateProduct (req, res, next) {
    // fetch the request data
    const data = req.body;

    // define the validation schema
    const schema = Joi.object().keys({
        name:  Joi.string().required(),

        // price is required
        // and must be a number , of length > 0
        price: Joi.number().positive().required(),
        
    });

    // validate the request data against the schema
    Joi.validate(data, schema, (err, value) => {

        if (err) {
            // send a 422 error response if validation fails
            res.status(422).json({
                status: 'error',
                message: 'Invalid request data',
                err: err,
                data: data
            }); 
        } else {
           next();
        }

    });
};

module.exports =  {
    validateUser,
    validateOrder,
    validateProduct
};