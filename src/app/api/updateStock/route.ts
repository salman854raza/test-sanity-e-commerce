import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { productId, quantity } = await request.json();

    // Validate input
    if (!productId || typeof productId !== "string") {
      return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }

    if (typeof quantity !== "number" || quantity <= 0) {
      return NextResponse.json({ message: "Invalid quantity" }, { status: 400 });
    }

    // Fetch product from Sanity
    let product = await client.fetch(`*[_type == "product" && _id == $productId][0]`, { productId });

    if (!product) {
      product = await client.fetch(`*[_type == "productList" && _id == $productId][0]`, { productId });
    }

    // If the product is still not found, return a 404 error
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // Ensure stock is a number before subtracting
    const currentStock = typeof product.stock === "number" ? product.stock : 0;

    // Calculate new stock
    const newStock = currentStock - quantity;

    // Check if stock is sufficient
    if (newStock < 0) {
      return NextResponse.json({ message: "Insufficient stock" }, { status: 400 });
    }

    // Log the stock update attempt
    console.log(`Updating stock for product ${productId}: ${currentStock} -> ${newStock}`);

    // Attempt to update stock in Sanity
    const updateResponse = await client
      .patch(productId)
      .set({ stock: newStock })
      .ifRevisionId(product._rev) // Ensure atomic update
      .commit()
      .catch((err) => {
        throw new Error(`Sanity update failed: ${err.message}`);
      });

    console.log("Stock update response:", updateResponse);

    return NextResponse.json({ success: true, newStock });
  } catch (error) {
    console.error("Error updating stock:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: `Internal server error: ${errorMessage}` }, { status: 500 });
  }
}






// import { client } from "@/sanity/lib/client";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const { productId, quantity } = await request.json();

//     // Validate input
//     if (!productId || typeof productId !== "string") {
//       return NextResponse.json(
//         { message: "Invalid product ID" },
//         { status: 400 }
//       );
//     }

//     if (typeof quantity !== "number" || quantity <= 0) {
//       return NextResponse.json(
//         { message: "Invalid quantity" },
//         { status: 400 }
//       );
//     }

//     let product = await client.fetch(
//       `*[_type == "product" && _id == $productId][0]`,
//       { productId }
//     );

//     if (!product) {
//       product = await client.fetch(
//         `*[_type == "productList" && _id == $productId][0]`,
//         { productId }
//       );
//     }

//     // If the product is still not found, return a 404 error
//     if (!product) {
//       return NextResponse.json(
//         { message: "Product not found" },
//         { status: 404 }
//       );
//     }

//     // Calculate the new stock quantity
//     const newStock = product.stock - quantity;

//     // Check if stock is sufficient
//     if (newStock < 0) {
//       return NextResponse.json(
//         { message: "Insufficient stock" },
//         { status: 400 }
//       );
//     }

//     // Log the update
//     console.log(`Updating stock for product ${productId}: ${product.stock} -> ${newStock}`);

//     // Update the stock in Sanity
//     await client
//       .patch(productId)
//       .set({ stock: newStock })
//       .ifRevisionId(product._rev) // Ensure atomic update
//       .commit();

//     return NextResponse.json({ success: true, newStock });
//   } catch (error) {
//     console.error("Error updating stock:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }