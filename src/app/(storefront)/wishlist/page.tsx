import { getLiveProducts } from "@/db/queries/products";
import WishlistClient from "./WishlistClient";

export default async function WishlistPage() {
  const products = await getLiveProducts();
  const items = products.map((p) => ({ id: p.id, name: p.name, slug: p.slug, price: p.price, img: p.img }));
  return <WishlistClient products={items} />;
}
