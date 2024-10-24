import { selectProduct } from "@/db/schema/products";
import ProductsTable from "./productsTable";
import H1 from "@/components/h1";
import ProductButtons from "./product-buttons";

const ProductsPage = ({ products }: { products: selectProduct[] }) => {
  return (
    <>
      <H1>Products</H1>
      <div className="flex flex-col justify-center items-center mb-4 md:flex-row md:justify-between md:mb-8">
        <p className="mb-2">Here's a list of all your created products</p>
        <ProductButtons actionType="add">Add product</ProductButtons>
      </div>
      <ProductsTable products={products} />
    </>
  );
};

export default ProductsPage;
