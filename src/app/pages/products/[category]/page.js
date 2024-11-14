import ProductsCategorized from "./ProductsCategorized";

const ProductsCategorizedPage = async ({ params }) => {
    const { category } = await params;

    return <ProductsCategorized category={category} />
};

export default ProductsCategorizedPage;