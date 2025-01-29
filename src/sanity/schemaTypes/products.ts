import { defineField, defineType } from "sanity";
import { TrolleyIcon } from "@sanity/icons";

export const productApi = defineType({
  name: "productss",
  title: "Product",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "productImage",
      title: "Product Image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "isNew",
      title: "New Badge",
      type: "boolean",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "colors",
      title: "Colors",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "discountPrice",
      title: "Discount Price",
      type: "number",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "productImage",
      subtitle: "price",
      inStock: "inStock",
      stock: "stock",
    },
    prepare({ title, subtitle, media, inStock, stock }) {
      return {
        title,
        subtitle: `${subtitle} | ${inStock ? `In Stock (${stock})` : "Out of Stock"}`,
        media,
      };
    },
  },
});
