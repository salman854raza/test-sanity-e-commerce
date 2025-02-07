"use client";

import React, { useState } from "react";
import { useCart } from "@/components/cart-components/CartContext";
import Image from "next/image";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/productList-components/header";
import Footer from "@/components/team-components/footer";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const checkoutSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Shipping address is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { cartItems } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const handleCheckout: SubmitHandler<CheckoutFormData> = async (data) => {
    setIsLoading(true);
    try {
      alert(`Your shipping has been successfully placed!\n\nName: ${data.name}\nEmail: ${data.email}\nAddress: ${data.address}\n\nThank you!`);
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#F9FAFB] to-[#EFF6FF] min-h-screen">
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <Header />
      </ClerkProvider>
      <div className="wrapper">
        <div className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-[#1F2937] mb-6 text-center">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Summary */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold text-[#1F2937] mb-4">Order Summary</h2>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 relative">
                        <Image src={item.imageUrl} alt={item.name} layout="fill" objectFit="cover" className="rounded-lg" />
                      </div>
                      <span className="text-base font-medium text-[#1F2937]">{item.name}</span>
                    </div>
                    <span className="text-base font-medium text-[#1F2937]">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between mt-6">
                  <span className="text-lg font-bold text-[#1F2937]">Total</span>
                  <span className="text-lg font-bold text-[#1F2937]">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold text-[#1F2937] mb-4">Shipping Details</h2>
                <form onSubmit={handleSubmit(handleCheckout)}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-base font-medium text-[#1F2937] mb-1">Full Name</label>
                      <input type="text" id="name" {...register("name")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base" />
                      {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-base font-medium text-[#1F2937] mb-1">Email Address</label>
                      <input type="email" id="email" {...register("email")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base" />
                      {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-base font-medium text-[#1F2937] mb-1">Shipping Address</label>
                      <input type="text" id="address" {...register("address")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base" />
                      {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-base font-medium text-[#1F2937] mb-1">Phone Number</label>
                      <input type="tel" id="phone" {...register("phone")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base" />
                      {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading} className="w-full mt-6 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#3B82F6] text-white font-bold py-3 px-6 rounded-lg transition-all ease-in-out transform hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed">
                    {isLoading ? "Loading..." : "Place Order"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}





// "use client";

// import React, { useState } from "react";
// import { useCart } from "@/components/cart-components/CartContext";
// import Image from "next/image";
// import { ClerkProvider } from "@clerk/nextjs";
// import Header from "@/components/productList-components/header";
// import Footer from "@/components/team-components/footer";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const checkoutSchema = z.object({
//   name: z.string().min(1, "Full name is required"),
//   email: z.string().email("Invalid email address"),
//   address: z.string().min(1, "Shipping address is required"),
//   phone: z.string().min(10, "Phone number must be at least 10 digits"),
// });

// type CheckoutFormData = z.infer<typeof checkoutSchema>;

// // Define a type for the ordered product items
// type OrderItem = {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   imageUrl: string;
// };

// type OrderInfo = {
//   name: string;
//   email: string;
//   address: string;
//   items: OrderItem[];
// };

// export default function Checkout() {
//   const { cartItems, clearCart } = useCart();
//   const [isLoading, setIsLoading] = useState(false);
//   const [orderSuccess, setOrderSuccess] = useState(false);
//   const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<CheckoutFormData>({
//     resolver: zodResolver(checkoutSchema),
//   });

//   const handleCheckout: SubmitHandler<CheckoutFormData> = async (data) => {
//     setIsLoading(true);

//     try {
//       // Prepare order data for Sanity
//       const orderData = {
//         _type: "order",
//         customerName: data.name,
//         customerEmail: data.email,
//         shippingAddress: data.address,
//         phone: data.phone,
//         orderItems: cartItems.map((item) => ({
//           _type: "orderItem",
//           product: {
//             _type: "reference",
//             _ref: item.id,
//           },
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//         })),
//         totalPrice: totalPrice,
//         orderStatus: "pending",
//         createdAt: new Date().toISOString(),
//       };

//       // Save order to Sanity
//       const response = await fetch("/api/createOrder", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create order");
//       }

//       // Save the ordered items before clearing the cart
//       const orderedItems = [...cartItems];
//       clearCart();

//       // Save order details to state and show the success screen
//       setOrderInfo({
//         name: data.name,
//         email: data.email,
//         address: data.address,
//         items: orderedItems,
//       });
//       setOrderSuccess(true);
//     } catch (error) {
//       console.error("Checkout error:", error);
//       alert("There was an error placing your order. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Success screen UI when the order has been placed
//   if (orderSuccess && orderInfo) {
//     return (
//       <div className="bg-gradient-to-br from-[#F9FAFB] to-[#EFF6FF] min-h-screen">
//         <ClerkProvider
//           publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
//         >
//           <Header />
//         </ClerkProvider>
//         <div className="wrapper">
//           <div className="py-8">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
//                 <div className="flex flex-col items-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-20 w-20 text-green-500 mb-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M5 13l4 4L19 7"
//                     />
//                   </svg>
//                   <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                     Order Shipped!
//                   </h1>
//                   <p className="text-gray-600 mb-6 text-center">
//                     Hi {orderInfo.name}, your products have been shipped to:
//                   </p>
//                 </div>

//                 <div className="bg-gray-50 rounded-lg p-6 mb-6">
//                   <p className="text-gray-700 mb-2">
//                     <span className="font-semibold">Name:</span>{" "}
//                     {orderInfo.name}
//                   </p>
//                   <p className="text-gray-700 mb-2">
//                     <span className="font-semibold">Email:</span>{" "}
//                     {orderInfo.email}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Shipping Address:</span>{" "}
//                     {orderInfo.address}
//                   </p>
//                 </div>

//                 <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//                   Ordered Products
//                 </h2>
//                 <div className="space-y-4">
//                   {orderInfo.items.map((item) => (
//                     <div
//                       key={item.id}
//                       className="flex items-center justify-between border p-4 rounded-lg shadow-sm bg-white"
//                     >
//                       <div className="flex items-center space-x-4">
//                         <div className="w-16 h-16 relative">
//                           <Image
//                             src={item.imageUrl}
//                             alt={item.name}
//                             layout="fill"
//                             objectFit="cover"
//                             className="rounded-lg"
//                           />
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-medium text-gray-800">
//                             {item.name}
//                           </h3>
//                           <p className="text-sm text-gray-600">
//                             Quantity: {item.quantity}
//                           </p>
//                         </div>
//                       </div>
//                       <p className="text-lg font-bold text-gray-800">
//                         ${(item.price * item.quantity).toFixed(2)}
//                       </p>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-8 text-center">
//                   <button
//                     onClick={() => window.location.reload()}
//                     className="px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#3B82F6] text-white font-bold rounded-lg transition-all ease-in-out transform hover:scale-105"
//                   >
//                     Continue Shopping
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   // Checkout form UI
//   return (
//     <div className="bg-gradient-to-br from-[#F9FAFB] to-[#EFF6FF] min-h-screen">
//       <ClerkProvider
//         publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
//       >
//         <Header />
//       </ClerkProvider>
//       <div className="wrapper">
//         <div className="py-8">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <h1 className="text-2xl font-bold text-[#1F2937] mb-6 text-center">
//               Checkout
//             </h1>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Order Summary */}
//               <div className="bg-white shadow-lg rounded-lg p-6">
//                 <h2 className="text-xl font-bold text-[#1F2937] mb-4">
//                   Order Summary
//                 </h2>
//                 {cartItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center justify-between border-b border-gray-200 py-4"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <div className="w-16 h-16 relative">
//                         <Image
//                           src={item.imageUrl}
//                           alt={item.name}
//                           layout="fill"
//                           objectFit="cover"
//                           className="rounded-lg"
//                         />
//                       </div>
//                       <span className="text-base font-medium text-[#1F2937]">
//                         {item.name}
//                       </span>
//                     </div>
//                     <span className="text-base font-medium text-[#1F2937]">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </span>
//                   </div>
//                 ))}
//                 <div className="flex justify-between mt-6">
//                   <span className="text-lg font-bold text-[#1F2937]">
//                     Total
//                   </span>
//                   <span className="text-lg font-bold text-[#1F2937]">
//                     ${totalPrice.toFixed(2)}
//                   </span>
//                 </div>
//               </div>

//               {/* Checkout Form */}
//               <div className="bg-white shadow-lg rounded-lg p-6">
//                 <h2 className="text-xl font-bold text-[#1F2937] mb-4">
//                   Shipping Details
//                 </h2>
//                 <form onSubmit={handleSubmit(handleCheckout)}>
//                   <div className="space-y-4">
//                     <div>
//                       <label
//                         htmlFor="name"
//                         className="block text-base font-medium text-[#1F2937] mb-1"
//                       >
//                         Full Name
//                       </label>
//                       <input
//                         type="text"
//                         id="name"
//                         {...register("name")}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base"
//                       />
//                       {errors.name && (
//                         <p className="text-sm text-red-600 mt-1">
//                           {errors.name.message}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="email"
//                         className="block text-base font-medium text-[#1F2937] mb-1"
//                       >
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         id="email"
//                         {...register("email")}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base"
//                       />
//                       {errors.email && (
//                         <p className="text-sm text-red-600 mt-1">
//                           {errors.email.message}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="address"
//                         className="block text-base font-medium text-[#1F2937] mb-1"
//                       >
//                         Shipping Address
//                       </label>
//                       <input
//                         type="text"
//                         id="address"
//                         {...register("address")}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base"
//                       />
//                       {errors.address && (
//                         <p className="text-sm text-red-600 mt-1">
//                           {errors.address.message}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="phone"
//                         className="block text-base font-medium text-[#1F2937] mb-1"
//                       >
//                         Phone Number
//                       </label>
//                       <input
//                         type="tel"
//                         id="phone"
//                         {...register("phone")}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base"
//                       />
//                       {errors.phone && (
//                         <p className="text-sm text-red-600 mt-1">
//                           {errors.phone.message}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full mt-6 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#3B82F6] text-white font-bold py-3 px-6 rounded-lg transition-all ease-in-out transform hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed"
//                   >
//                     {isLoading ? "Loading..." : "Place Order"}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }




// "use client";

// import React, { useState } from "react";
// import { useCart } from "@/components/cart-components/CartContext";
// import Image from "next/image";
// import { ClerkProvider } from "@clerk/nextjs";
// import Header from "@/components/productList-components/header";
// import Footer from "@/components/team-components/footer";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const checkoutSchema = z.object({
//   name: z.string().min(1, "Full name is required"),
//   email: z.string().email("Invalid email address"),
//   address: z.string().min(1, "Shipping address is required"),
//   phone: z.string().min(10, "Phone number must be at least 10 digits"),
// });

// type CheckoutFormData = z.infer<typeof checkoutSchema>;

// export default function Checkout() {
//   const { cartItems, clearCart } = useCart();
//   const [isLoading, setIsLoading] = useState(false);
//   const [orderSuccess, setOrderSuccess] = useState(false);
//   const [customerDetails, setCustomerDetails] = useState<{
//     name: string;
//     email: string;
//     address: string;
//   } | null>(null);

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<CheckoutFormData>({
//     resolver: zodResolver(checkoutSchema),
//   });

//   const handleCheckout: SubmitHandler<CheckoutFormData> = async (data) => {
//     setIsLoading(true);
//     try {
//       // Prepare order data for Sanity
//       const orderData = {
//         _type: "order",
//         customerName: data.name,
//         customerEmail: data.email,
//         shippingAddress: data.address,
//         phone: data.phone,
//         orderItems: cartItems.map(item => ({
//           _type: "orderItem",
//           product: {
//             _type: "reference",
//             _ref: item.id
//           },
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity
//         })),
//         totalPrice: totalPrice,
//         orderStatus: "pending",
//         createdAt: new Date().toISOString()
//       };

//       // Save order to Sanity
//       const response = await fetch('/api/createOrder', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(orderData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create order');
//       }

//       // Clear cart and show success
//       clearCart();
//       setCustomerDetails({
//         name: data.name,
//         email: data.email,
//         address: data.address
//       });
//       setOrderSuccess(true);

//     } catch (error) {
//       console.error("Checkout error:", error);
//       alert("There was an error placing your order. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (orderSuccess && customerDetails) {
//     return (
//       <div className="bg-gradient-to-br from-[#F9FAFB] to-[#EFF6FF] min-h-screen">
//         <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
//           <Header />
//         </ClerkProvider>
//         <div className="wrapper">
//           <div className="py-8">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
//                 <div className="mb-6">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-16 w-16 text-green-500 mx-auto"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M5 13l4 4L19 7"
//                     />
//                   </svg>
//                 </div>
//                 <h1 className="text-3xl font-bold text-gray-800 mb-4">
//                   Order Successful! 🎉
//                 </h1>
//                 <div className="bg-gray-50 rounded-lg p-6 text-left mb-6">
//                   <p className="text-gray-700 mb-2">
//                     <span className="font-semibold">Name:</span> {customerDetails.name}
//                   </p>
//                   <p className="text-gray-700 mb-2">
//                     <span className="font-semibold">Email:</span> {customerDetails.email}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Shipping Address:</span> {customerDetails.address}
//                   </p>
//                 </div>
//                 <p className="text-gray-600">
//                   Your order details have been saved and will be processed shortly.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     // ... (keep the existing checkout form UI exactly as you provided)
//     // The form structure remains the same, only handleCheckout was modified
//     <div className="bg-gradient-to-br from-[#F9FAFB] to-[#EFF6FF] min-h-screen">
//      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
//          <Header />
//        </ClerkProvider>
//       <div className="wrapper">
//         <div className="py-8">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <h1 className="text-2xl font-bold text-[#1F2937] mb-6 text-center">Checkout</h1>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">               {/* Order Summary */}
//                <div className="bg-white shadow-lg rounded-lg p-6"> 
//                  <h2 className="text-xl font-bold text-[#1F2937] mb-4">Order Summary</h2> 
//                {cartItems.map((item) => (
//                   <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-4">
//                     <div className="flex items-center space-x-4">
//                       <div className="w-16 h-16 relative">
//                         <Image src={item.imageUrl} alt={item.name} layout="fill" objectFit="cover" className="rounded-lg" />
//                       </div>
//                       <span className="text-base font-medium text-[#1F2937]">{item.name}</span>
//                     </div>
//                     <span className="text-base font-medium text-[#1F2937]">${(item.price * item.quantity).toFixed(2)}</span>
//                   </div>
//                 ))}
//                 <div className="flex justify-between mt-6">
//                   <span className="text-lg font-bold text-[#1F2937]">Total</span>
//                   <span className="text-lg font-bold text-[#1F2937]">${totalPrice.toFixed(2)}</span>
//                 </div>
//               </div>

//               {/* Checkout Form */}
//               <div className="bg-white shadow-lg rounded-lg p-6">
//                 <h2 className="text-xl font-bold text-[#1F2937] mb-4">Shipping Details</h2>
//                 <form onSubmit={handleSubmit(handleCheckout)}>
//                   <div className="space-y-4">
//                     <div>
//                       <label htmlFor="name" className="block text-base font-medium text-[#1F2937] mb-1">Full Name</label>
//                       <input type="text" id="name" {...register("name")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base" />
//                       {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
//                     </div>
//                     <div>
//                       <label htmlFor="email" className="block text-base font-medium text-[#1F2937] mb-1">Email Address</label>
//                       <input type="email" id="email" {...register("email")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base" />
//                       {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
//                     </div>
//                     <div>
//                       <label htmlFor="address" className="block text-base font-medium text-[#1F2937] mb-1">Shipping Address</label>
//                       <input type="text" id="address" {...register("address")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base" />
//                       {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>}
//                     </div>
//                     <div>
//                       <label htmlFor="phone" className="block text-base font-medium text-[#1F2937] mb-1">Phone Number</label>
//                       <input type="tel" id="phone" {...register("phone")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base" />
//                       {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
//                     </div>
//                   </div>
//                   <button type="submit" disabled={isLoading} className="w-full mt-6 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#3B82F6] text-white font-bold py-3 px-6 rounded-lg transition-all ease-in-out transform hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed">
//                     {isLoading ? "Loading..." : "Place Order"}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }


// "use client";

// import React, { useState } from "react";
// import { useCart } from "@/components/cart-components/CartContext";
// import Image from "next/image";
// import { ClerkProvider } from "@clerk/nextjs";
// import Header from "@/components/productList-components/header";
// import Footer from "@/components/team-components/footer";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const checkoutSchema = z.object({
//   name: z.string().min(1, "Full name is required"),
//   email: z.string().email("Invalid email address"),
//   address: z.string().min(1, "Shipping address is required"),
//   phone: z.string().min(10, "Phone number must be at least 10 digits"),
// });

// type CheckoutFormData = z.infer<typeof checkoutSchema>;

// export default function Checkout() {
//   const { cartItems } = useCart();
//   const [isLoading, setIsLoading] = useState(false);

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<CheckoutFormData>({
//     resolver: zodResolver(checkoutSchema),
//   });

//   const handleCheckout: SubmitHandler<CheckoutFormData> = async (data) => {
//     setIsLoading(true);
//     try {
//       alert(`Your shipping has been successfully placed!\n\nName: ${data.name}\nEmail: ${data.email}\nAddress: ${data.address}\n\nThank you!`);
//     } catch (error) {
//       console.error("Checkout error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-[#F9FAFB] to-[#EFF6FF] min-h-screen">
//       <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
//         <Header />
//       </ClerkProvider>
//       <div className="wrapper">
//         <div className="py-8">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <h1 className="text-2xl font-bold text-[#1F2937] mb-6 text-center">Checkout</h1>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Order Summary */}
//               <div className="bg-white shadow-lg rounded-lg p-6">
//                 <h2 className="text-xl font-bold text-[#1F2937] mb-4">Order Summary</h2>
//                 {cartItems.map((item) => (
//                   <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-4">
//                     <div className="flex items-center space-x-4">
//                       <div className="w-16 h-16 relative">
//                         <Image src={item.imageUrl} alt={item.name} layout="fill" objectFit="cover" className="rounded-lg" />
//                       </div>
//                       <span className="text-base font-medium text-[#1F2937]">{item.name}</span>
//                     </div>
//                     <span className="text-base font-medium text-[#1F2937]">${(item.price * item.quantity).toFixed(2)}</span>
//                   </div>
//                 ))}
//                 <div className="flex justify-between mt-6">
//                   <span className="text-lg font-bold text-[#1F2937]">Total</span>
//                   <span className="text-lg font-bold text-[#1F2937]">${totalPrice.toFixed(2)}</span>
//                 </div>
//               </div>

//               {/* Checkout Form */}
//               <div className="bg-white shadow-lg rounded-lg p-6">
//                 <h2 className="text-xl font-bold text-[#1F2937] mb-4">Shipping Details</h2>
//                 <form onSubmit={handleSubmit(handleCheckout)}>
//                   <div className="space-y-4">
//                     <div>
//                       <label htmlFor="name" className="block text-base font-medium text-[#1F2937] mb-1">Full Name</label>
//                       <input type="text" id="name" {...register("name")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base" />
//                       {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
//                     </div>
//                     <div>
//                       <label htmlFor="email" className="block text-base font-medium text-[#1F2937] mb-1">Email Address</label>
//                       <input type="email" id="email" {...register("email")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base" />
//                       {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
//                     </div>
//                     <div>
//                       <label htmlFor="address" className="block text-base font-medium text-[#1F2937] mb-1">Shipping Address</label>
//                       <input type="text" id="address" {...register("address")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base" />
//                       {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>}
//                     </div>
//                     <div>
//                       <label htmlFor="phone" className="block text-base font-medium text-[#1F2937] mb-1">Phone Number</label>
//                       <input type="tel" id="phone" {...register("phone")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base" />
//                       {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
//                     </div>
//                   </div>
//                   <button type="submit" disabled={isLoading} className="w-full mt-6 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#3B82F6] text-white font-bold py-3 px-6 rounded-lg transition-all ease-in-out transform hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed">
//                     {isLoading ? "Loading..." : "Place Order"}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }







// "use client";

// import React, { useState } from "react";
// import { useCart } from "@/components/cart-components/CartContext";
// import Image from "next/image";
// import { ClerkProvider } from "@clerk/nextjs";
// import Header from "@/components/productList-components/header";
// import Footer from "@/components/team-components/footer";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const checkoutSchema = z.object({
//   name: z.string().min(1, "Full name is required"),
//   email: z.string().email("Invalid email address"),
//   address: z.string().min(1, "Shipping address is required"),
//   phone: z.string().min(10, "Phone number must be at least 10 digits"),
// });

// type CheckoutFormData = z.infer<typeof checkoutSchema>;

// export default function Checkout() {
//   const { cartItems, clearCart } = useCart();
//   const [isLoading, setIsLoading] = useState(false);
//   const [orderSuccess, setOrderSuccess] = useState(false);
//   const [savedCustomerDetails, setSavedCustomerDetails] = useState<{
//     email: string;
//     address: string;
//   } | null>(null);

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<CheckoutFormData>({
//     resolver: zodResolver(checkoutSchema),
//   });

//   const handleCheckout: SubmitHandler<CheckoutFormData> = async (data) => {
//     setIsLoading(true);

//     try {
//       // Create the order document in Sanity
//       const orderPayload = {
//         customerName: data.name,
//         customerEmail: data.email,
//         shippingAddress: data.address,
//         phone: data.phone,
//         orderItems: cartItems.map((item) => ({
//           product: { _type: "reference", _ref: item.id },
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//         })),
//         totalPrice,
//         orderStatus: "pending",
//         createdAt: new Date().toISOString(),
//       };

//       const orderResponse = await fetch("/api/createOrder", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderPayload),
//       });

//       if (!orderResponse.ok) {
//         const errorData = await orderResponse.json();
//         throw new Error(errorData.message || "Failed to create order");
//       }

//       // Save customer details for success message
//       setSavedCustomerDetails({
//         email: data.email,
//         address: data.address,
//       });
//       setOrderSuccess(true);
//       clearCart();
//     } catch (error) {
//       console.error("Checkout error:", error);
//       alert("There was an error placing your order. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (orderSuccess && savedCustomerDetails) {
//     return (
//       <div className="bg-gradient-to-br from-[#F9FAFB] to-[#EFF6FF] min-h-screen">
//         <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
//           <Header />
//         </ClerkProvider>
//         <div className="wrapper">
//           <div className="py-8">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
//                 <div className="mb-6">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-16 w-16 text-green-500 mx-auto"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M5 13l4 4L19 7"
//                     />
//                   </svg>
//                 </div>
//                 <h1 className="text-3xl font-bold text-gray-800 mb-4">
//                   Order Successful! 🎉
//                 </h1>
//                 <p className="text-lg text-gray-600 mb-6">
//                   Your order has been successfully shipped to:
//                 </p>
//                 <div className="bg-gray-50 rounded-lg p-6 text-left">
//                   <p className="text-gray-700 mb-2">
//                     <span className="font-semibold">Address:</span>{" "}
//                     {savedCustomerDetails.address}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Email:</span>{" "}
//                     {savedCustomerDetails.email}
//                   </p>
//                 </div>
//                 <p className="mt-6 text-gray-600">
//                   A confirmation email has been sent to your inbox.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-br from-[#F9FAFB] to-[#EFF6FF] min-h-screen">
//       <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
//         <Header />
//       </ClerkProvider>
//       <div className="wrapper">
//         <div className="py-8">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <h1 className="text-2xl font-bold text-[#1F2937] mb-6 text-center">
//               Checkout
//             </h1>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Order Summary */}
//               <div className="bg-white shadow-lg rounded-lg p-6">
//                 <h2 className="text-xl font-bold text-[#1F2937] mb-4">
//                   Order Summary
//                 </h2>
//                 {cartItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center justify-between border-b border-gray-200 py-4"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <div className="w-16 h-16 relative">
//                         <Image
//                           src={item.imageUrl}
//                           alt={item.name}
//                           fill
//                           style={{ objectFit: "cover" }}
//                           className="rounded-lg"
//                         />
//                       </div>
//                       <span className="text-base font-medium text-[#1F2937]">
//                         {item.name}
//                       </span>
//                     </div>
//                     <span className="text-base font-medium text-[#1F2937]">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </span>
//                   </div>
//                 ))}
//                 <div className="flex justify-between mt-6">
//                   <span className="text-lg font-bold text-[#1F2937]">
//                     Total
//                   </span>
//                   <span className="text-lg font-bold text-[#1F2937]">
//                     ${totalPrice.toFixed(2)}
//                   </span>
//                 </div>
//               </div>

//               {/* Checkout Form */}
//               <div className="bg-white shadow-lg rounded-lg p-6">
//                 <h2 className="text-xl font-bold text-[#1F2937] mb-4">
//                   Shipping Details
//                 </h2>
//                 <form onSubmit={handleSubmit(handleCheckout)} className="space-y-4">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       {...register("name")}
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                     />
//                     {errors.name && (
//                       <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       {...register("email")}
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                     />
//                     {errors.email && (
//                       <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                       Shipping Address
//                     </label>
//                     <input
//                       type="text"
//                       id="address"
//                       {...register("address")}
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                     />
//                     {errors.address && (
//                       <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       {...register("phone")}
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                     />
//                     {errors.phone && (
//                       <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
//                     )}
//                   </div>
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full bg-[#23A6F0] hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition-all ease-in-out"
//                   >
//                     {isLoading ? "Processing..." : "Place Order"}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }








// "use client";

// import React, { useState } from "react";
// import { useCart } from "@/components/cart-components/CartContext";
// import Image from "next/image";
// import { ClerkProvider } from "@clerk/nextjs";
// import Header from "@/components/productList-components/header";
// import Footer from "@/components/team-components/footer";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const checkoutSchema = z.object({
//   name: z.string().min(1, "Full name is required"),
//   email: z.string().email("Invalid email address"),
//   address: z.string().min(1, "Shipping address is required"),
//   phone: z.string().min(10, "Phone number must be at least 10 digits"),
// });

// type CheckoutFormData = z.infer<typeof checkoutSchema>;

// export default function Checkout() {
//   const { cartItems } = useCart();
//   const [isLoading, setIsLoading] = useState(false);

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<CheckoutFormData>({
//     resolver: zodResolver(checkoutSchema),
//   });

//   const handleCheckout: SubmitHandler<CheckoutFormData> = async (data) => {
//     setIsLoading(true);

//     try {
//       // 1. Update stock for each item in the cart
//       for (const item of cartItems) {
//         const stockUpdateResponse = await fetch("/api/updateStock", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ productId: item.id, quantity: item.quantity }),
//         });

//         if (!stockUpdateResponse.ok) {
//           const { message } = await stockUpdateResponse.json();
//           alert(`Failed to update stock for ${item.name}: ${message}`);
//           setIsLoading(false);
//           return;
//         }
//       }

//       // 2. Send email confirmation
//       const emailResponse = await fetch("/api/send-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: data.email,
//           name: data.name,
//           cartItems,
//           totalPrice,
//         }),
//       });

//       if (!emailResponse.ok) {
//         throw new Error("Failed to send email");
//       }

//       // 3. Create the order document in Sanity
//       const orderPayload = {
//         customerName: data.name,
//         customerEmail: data.email,
//         shippingAddress: data.address,
//         phone: data.phone,
//         orderItems: cartItems.map((item) => ({
//           product: { _type: "reference", _ref: item.id }, // Assumes item.id matches your Sanity product id
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//         })),
//         totalPrice,
//         orderStatus: "pending",
//         createdAt: new Date().toISOString(),
//       };

//       const orderResponse = await fetch("/api/createOrder", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderPayload),
//       });

//       if (!orderResponse.ok) {
//         const errorData = await orderResponse.json();
//         throw new Error(errorData.message || "Failed to create order in Sanity");
//       }

//       alert("Order placed successfully!");
//     } catch (error) {
//       console.error("Checkout error:", error);
//       alert("There was an error placing your order. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-[#F9FAFB] to-[#EFF6FF] min-h-screen">
//       <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
//         <Header />
//       </ClerkProvider>
//       <div className="wrapper">
//         <div className="py-8">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <h1 className="text-2xl font-bold text-[#1F2937] mb-6 text-center">
//               Checkout
//             </h1>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Order Summary */}
//               <div className="bg-white shadow-lg rounded-lg p-6">
//                 <h2 className="text-xl font-bold text-[#1F2937] mb-4">
//                   Order Summary
//                 </h2>
//                 {cartItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center justify-between border-b border-gray-200 py-4"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <div className="w-16 h-16 relative">
//                         <Image
//                           src={item.imageUrl}
//                           alt={item.name}
//                           fill
//                           style={{ objectFit: "cover" }}
//                           className="rounded-lg"
//                         />
//                       </div>
//                       <span className="text-base font-medium text-[#1F2937]">
//                         {item.name}
//                       </span>
//                     </div>
//                     <span className="text-base font-medium text-[#1F2937]">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </span>
//                   </div>
//                 ))}
//                 <div className="flex justify-between mt-6">
//                   <span className="text-lg font-bold text-[#1F2937]">
//                     Total
//                   </span>
//                   <span className="text-lg font-bold text-[#1F2937]">
//                     ${totalPrice.toFixed(2)}
//                   </span>
//                 </div>
//               </div>

//               {/* Checkout Form */}
//               <div className="bg-white shadow-lg rounded-lg p-6">
//                 <h2 className="text-xl font-bold text-[#1F2937] mb-4">
//                   Shipping Details
//                 </h2>
//                 <form onSubmit={handleSubmit(handleCheckout)} className="space-y-4">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       {...register("name")}
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                     />
//                     {errors.name && (
//                       <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       {...register("email")}
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                     />
//                     {errors.email && (
//                       <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                       Shipping Address
//                     </label>
//                     <input
//                       type="text"
//                       id="address"
//                       {...register("address")}
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                     />
//                     {errors.address && (
//                       <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       {...register("phone")}
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                     />
//                     {errors.phone && (
//                       <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
//                     )}
//                   </div>
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full bg-[#23A6F0] hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition-all ease-in-out"
//                   >
//                     {isLoading ? "Loading..." : "Place Order"}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }




// "use client";

// import React, { useState } from "react"; // Import useState
// import { useCart } from "@/components/cart-components/CartContext";
// import Image from "next/image";
// import { ClerkProvider } from "@clerk/nextjs";
// import Header from "@/components/productList-components/header";
// import Footer from "@/components/team-components/footer";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const checkoutSchema = z.object({
//   name: z.string().min(1, "Full name is required"),
//   email: z.string().email("Invalid email address"),
//   address: z.string().min(1, "Shipping address is required"),
//   phone: z.string().min(10, "Phone number must be at least 10 digits"),
// });

// type CheckoutFormData = z.infer<typeof checkoutSchema>;

// export default function Checkout() {
//   const { cartItems } = useCart();
//   const [isLoading, setIsLoading] = useState(false); // Loading state

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<CheckoutFormData>({
//     resolver: zodResolver(checkoutSchema),
//   });

//   const handleCheckout: SubmitHandler<CheckoutFormData> = async (data) => {
//     setIsLoading(true); // Start loading

//     try {
//       // Update stock for each item in the cart
//       for (const item of cartItems) {
//         const stockUpdateResponse = await fetch("/api/updateStock", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ productId: item.id, quantity: item.quantity }),
//         });

//         if (!stockUpdateResponse.ok) {
//           const { message } = await stockUpdateResponse.json();
//           alert(`Failed to update stock for ${item.name}: ${message}`);
//           setIsLoading(false);
//           return;
//         }
//       }

//       // Send email confirmation
//       const emailResponse = await fetch("/api/send-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: data.email,
//           name: data.name,
//           cartItems,
//           totalPrice,
//         }),
//       });

//       if (!emailResponse.ok) {
//         throw new Error("Failed to send email");
//       }

//       alert("Order placed successfully!");
//     } catch (error) {
//       console.error("Checkout error:", error);
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-[#F9FAFB] to-[#EFF6FF] min-h-screen">
//       <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
//         <Header />
//       </ClerkProvider>
//       <div className="wrapper">
//         <div className="py-8">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <h1 className="text-2xl font-bold text-[#1F2937] mb-6 text-center">
//               Checkout
//             </h1>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Order Summary */}
//               <div className="bg-white shadow-lg rounded-lg p-6">
//                 <h2 className="text-xl font-bold text-[#1F2937] mb-4">
//                   Order Summary
//                 </h2>
//                 {cartItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center justify-between border-b border-gray-200 py-4"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <div className="w-16 h-16 relative">
//                         <Image
//                           src={item.imageUrl}
//                           alt={item.name}
//                           layout="fill"
//                           objectFit="cover"
//                           className="rounded-lg"
//                         />
//                       </div>
//                       <span className="text-base font-medium text-[#1F2937]">
//                         {item.name}
//                       </span>
//                     </div>
//                     <span className="text-base font-medium text-[#1F2937]">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </span>
//                   </div>
//                 ))}
//                 <div className="flex justify-between mt-6">
//                   <span className="text-lg font-bold text-[#1F2937]">
//                     Total
//                   </span>
//                   <span className="text-lg font-bold text-[#1F2937]">
//                     ${totalPrice.toFixed(2)}
//                   </span>
//                 </div>
//               </div>

//               {/* Checkout Form */}
//               <div className="bg-white shadow-lg rounded-lg p-6">
//                 <h2 className="text-xl font-bold text-[#1F2937] mb-4">
//                   Shipping Details
//                 </h2>
//                 <form onSubmit={handleSubmit(handleCheckout)}>
//                   <div className="space-y-4">
//                     <input type="text" id="name" {...register("name")} />
//                     <input type="email" id="email" {...register("email")} />
//                     <input type="text" id="address" {...register("address")} />
//                     <input type="tel" id="phone" {...register("phone")} />
//                   </div>
//                   <button type="submit" disabled={isLoading}>
//                     {isLoading ? "Loading..." : "Place Order"}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
