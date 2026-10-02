import AdminProductForm from "./AdminProductForm";

export default function AdminProductEdit({ productId }: { productId: string }) {
  return <AdminProductForm productId={productId} />;
}
