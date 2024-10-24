import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { selectProduct } from "@/db/schema/products";
import { formatDateTime } from "@/lib/utils";

const ProductsTable = ({ products = [] }: { products: selectProduct[] }) => {
  return (
    <Table>
      <TableCaption>A list of all your products</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">name</TableHead>
          <TableHead>description</TableHead>
          <TableHead>price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead className="text-right">Created at</TableHead>
          <TableHead className="text-right">updated at</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>{formatDateTime(product.createdAt)}</TableCell>
            <TableCell>{formatDateTime(product.updatedAt)}</TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
