import {
    createProductService,
    getProductsService,
    getSingleProductService,
    deleteProductService
} from "../services/productService.js";


export const createProduct = async (req, res) => {
    try {

        const product = await createProductService(req.body);

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message
        });
    }
};


export const getProducts = async (req, res) => {
    try {

        const { page, limit } = req.query;

        const products = await getProductsService(
            page,
            limit
        );

        res.status(200).json(products);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message
        });
    }
};


export const getSingleProduct = async (req, res) => {
    try {

        const { id } = req.params;

        const product = await getSingleProductService(id);

        res.status(200).json({
            product
        });

    } catch (err) {

        console.log(err);

        res.status(404).json({
            error: err.message
        });
    }
};


export const deleteProduct = async (req, res) => {
    try {

        const { id } = req.params;

        await deleteProductService(id);

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(404).json({
            error: err.message
        });
    }
};