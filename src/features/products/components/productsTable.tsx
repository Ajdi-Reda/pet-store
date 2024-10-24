import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectCategory } from "@/db/schema/categories";
import { selectProduct } from "@/db/schema/products";
import { formatDateTime } from "@/lib/utils";

type ProductWithCategoryNameType = selectProduct & {
  category: {
    name: SelectCategory["name"];
  };
};
const ProductsTable = ({
  products = [],
}: {
  products: ProductWithCategoryNameType[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Category</TableHead>
          <TableHead className="">Name</TableHead>
          <TableHead className="">Description</TableHead>
          <TableHead className="">Price</TableHead>
          <TableHead className="">Stock</TableHead>
          <TableHead className="text-right">Created At</TableHead>
          <TableHead className="text-right">Updated At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium ">
              {product.category.name}
            </TableCell>
            <TableCell className="font-medium ">{product.name}</TableCell>
            <TableCell className="">{product.description}</TableCell>
            <TableCell className="">{product.price}</TableCell>
            <TableCell className="">{product.stock}</TableCell>
            <TableCell className="text-right">
              {formatDateTime(product.createdAt)}
            </TableCell>
            <TableCell className="text-right">
              {formatDateTime(product.updatedAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
