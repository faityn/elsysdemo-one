import AdminProductEdit from "@/components/admin/AdminProductEdit";

export default function ProductEditPage({
  params,
}: {
  params: { id: string };
}) {
  return <AdminProductEdit productId={params.id} />;
}
