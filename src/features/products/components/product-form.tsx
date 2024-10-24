import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertProductSchema, productSchema } from "@/db/schema/products";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addProduct } from "../server/actions";
import { useCategoryContext } from "@/hooks/use-category-context";
import { toast } from "sonner";

type ProductFormProps = {
  onFormSubmission: () => void;
  action: "add" | "edit";
};

const ProductForm = ({ onFormSubmission, action }: ProductFormProps) => {
  const { categories } = useCategoryContext();
  const form = useForm<InsertProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      categoryId: categories.length ? categories[0].id : undefined,
      name: "",
      price: 0,
      description: "",
      stock: 0,
    },
  });

  const onSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    const newProduct = {
      ...form.getValues(),
      categoryId: Number(form.getValues().categoryId),
    };
    console.log(newProduct);
    if (action === "add") {
      const error = await addProduct(newProduct);
      if (error) {
        toast.error(error.message);
      } else {
        console.log("Product added successfully");
        onFormSubmission();
      }
    }
  };

  return (
    <Form {...form}>
      <form action={onSubmit} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Product name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the product's description"
                  {...field}
                  value={field.value ?? 0}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input
                  placeholder="Stock"
                  type="number"
                  {...field}
                  value={field.value ?? 0}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {action === "add" ? "Add Product" : "Edit Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
