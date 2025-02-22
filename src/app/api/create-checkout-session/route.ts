import { NextResponse } from "next/server";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const { cartItems }: { cartItems: CartItem[] } = await request.json();

    // Simulate a checkout response (You can integrate with a local payment gateway if needed)
    const orderId = Math.random().toString(36).substring(2, 15); // Generate a random order ID

    return NextResponse.json({
      success: true,
      message: "Order placed successfully!",
      orderId,
      cartItems,
    });
  } catch (error) {
    console.error("Error processing checkout:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

























// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-12-18.acacia",
// });

// interface CartItem {
//   name: string;
//   price: number;
//   quantity: number;
// }

// export async function POST(request: Request) {
//   try {
//     const { cartItems }: { cartItems: CartItem[] } = await request.json();

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: cartItems.map((item: CartItem) => ({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: item.name,
//           },
//           unit_amount: Math.round(item.price * 100),
//         },
//         quantity: item.quantity,
//       })),
//       mode: "payment",
//       success_url: "http://final-hackathon-ubaid.vercel.app/success",
//       cancel_url: "https://final-hackathon-ubaid.vercel.app/cart",
//     });

//     return NextResponse.json({ sessionId: session.id });
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
