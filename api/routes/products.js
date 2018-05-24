const express = require('express');
const router =  express.Router();

const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');
const bodyValidation = require('../middleware/body-validation')
const redisCache = require('../middleware/redis-cache')

//Uploading files
const multer = require('multer');

//multer storage init
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/'); // null=potential errors
    },
    filename: function(req, file, cb) {
        cb(null, new Date().getTime() + file.originalname); // null=potential errors        
    }
});

//file filtering for mime type
const fileFilter = (req, file, cb) => {
    if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
        //accept a file
        cb(null, true);
    }else{
        //reject a file
        cb(new Error('File is not an acceptable Image MIME type'), false);
    }

};

// our multer constructor
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5 //5MB
    },
    fileFilter: fileFilter
}); //Be careful the absolute paths like '/uploads/'


router.get('/', redisCache.checkCachedData , ProductsController.products_get_all );

router.post('/', checkAuth, 
                 upload.single('productImage') , //single() means one file only
                 bodyValidation.validateProduct, 
                 ProductsController.products_create_product );

router.get('/:id', checkAuth, 
                   ProductsController.products_get_productid );

router.patch('/:id', checkAuth,
                     ProductsController.products_patch_product );

router.delete('/:id', checkAuth,
                      ProductsController.products_delete_product );

module.exports = router;