import { sanityFetch } from "@/sanity/lib/fetch"; // Assuming fetch is in your lib

export const allproducts = `*[_type == "product"][7..21] {
  _id,
  title,
  slug,
  description,
  "productImageUrl": productImage.asset->url,
  price,
  tags,
  discountPercentage,
  isNew
}`;

// Example usage:
export async function fetchProducts() {
  const products = await sanityFetch({ query: allproducts });
  return products;
}



// export const fourProducts = defineQuery(`
//   *[_type == "product"][0..3]{
//     _id,
//     name,
//     description,
//     price,
//     discountPercentage,
//     priceWithoutDiscount,
//     rating,
//     tags,
//     sizes,
//     "imageUrl": productImage.asset->url
//   }
// `);
