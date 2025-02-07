import { defineType, defineField } from "sanity";

export default defineType({
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Shipping Address",
      type: "string",
    }),
    defineField({
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
    }),
    defineField({
      name: "cartItems",
      title: "Cart Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Product Name", type: "string" },
            { name: "price", title: "Price", type: "number" },
            { name: "quantity", title: "Quantity", type: "number" },
            { name: "imageUrl", title: "Image URL", type: "string" },
          ],
        },
      ],
    }),
  ],
});
