const express = require('express');
const { body, validationResult, check } = require('express-validator');

const controller = require('../../Controllers/product.controller');

const router = express.Router();

router.get('/',
    (req, res) =>
        controller.getProducts(res)
);

router.post('/',
    body('name').notEmpty().withMessage('Name is required!'),
    body('manufacturingDate').notEmpty().withMessage('manufacturingDate is required!'),
    body('provider').isString().notEmpty().withMessage('provider is required!'),
    body('price').notEmpty().isInt().withMessage('price is required!'),
    body('stock').notEmpty().isInt().withMessage('stock is required!'),
    body('status').notEmpty().withMessage('status is required!').isString(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        controller.createProduct(req, res)
    }
);

router.patch('/',
    body('id').notEmpty().withMessage('Id is required!'),
    body('name').notEmpty().withMessage('Name is required!'),
    body('manufacturingDate').notEmpty().withMessage('manufacturingDate is required!'),
    body('provider').isString().notEmpty().withMessage('provider is required!'),
    body('price').notEmpty().isInt().withMessage('price is required!'),
    body('stock').notEmpty().isInt().withMessage('stock is required!'),
    body('status').notEmpty().withMessage('status is required!').isString(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        controller.updateProduct(req, res)
    }
);

router.patch('/export',
    body('id').notEmpty().withMessage('Id is required!'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        controller.exportProduct(req, res)
    }
);

router.delete('/',
    body('id').notEmpty().withMessage('Id is required!'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        controller.deleteProduct(req, res)
    }
);

module.exports = router;
