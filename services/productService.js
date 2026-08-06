import { ProductModel } from "../dbModels/productModel.js";

export const createProductService = async (data) => {
    const {
        name,
        SKU,
        description,
        price,
        category
    } = data;

    const product = await ProductModel.create({
        name,
        SKU,
        description,
        price,
        category
    });

    return product;
};


export const getProductsService = async (page, limit) => {

    page = Number(page) || 1;
    limit = Number(limit) || 10;

    const skip = (page - 1) * limit;

    const products = await ProductModel
        .find({})
        .skip(skip)
        .limit(limit);

    return products;
};


export const getSingleProductService = async (id) => {

    const product = await ProductModel.findById(id);

    if (!product) {
        throw new Error("Product does not exist");
    }

    return product;
};


export const deleteProductService = async (id) => {

    const product = await ProductModel.findByIdAndDelete(id);

    if (!product) {
        throw new Error("Product does not exist");
    }

    return product;
};