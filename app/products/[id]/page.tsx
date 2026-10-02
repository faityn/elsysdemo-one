import ProductDetails from "@/components/ProductDetails";

export default function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProductDetails productId={params.id} />;
}
