import ProductList from "@/components/ProductList";
import LayoutShell from "@/components/LayoutShell";

export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

async function getProduct() {
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || "visiongraphics.vercel.app";

  try {
    const res = await fetch(`${protocol}://${host}/api/catalog`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`Failed to fetch catalog: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error(error);
    return { items: [] };
  }
}

export default async function ProductsPage() {
  const { items } = await getProduct();

  return (
    <LayoutShell>
      <div className="py-12 px-6 max-w-6xl mx-auto w-full">
        <ProductList items={items} />
      </div>
    </LayoutShell>
  );
}
