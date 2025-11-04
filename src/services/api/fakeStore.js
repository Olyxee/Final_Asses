const BASE = "https://fakestoreapi.com";

export async function getRecommended(limit = 6) {
  const url = `${BASE}/products?limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`FakeStore API error: ${res.status}`);
  }
  const data = await res.json();
  // Map products to a lightweight "recommended" shape
  return data.map((p) => ({
    id: `fs-${p.id}`,
    name: p.title,
    image: p.image,
    price: p.price,
    rating: p.rating?.rate || 4.0,
    description: p.description,
  }));
}

export default { getRecommended };
