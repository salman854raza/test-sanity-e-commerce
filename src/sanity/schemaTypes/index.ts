import { type SchemaTypeDefinition } from 'sanity'
// import { product } fro./productsuct'
import { productListType } from './productListType'
import { productTypes } from './productType'
import { blockContentType } from './blockContentType'
import { productApi } from './products'
import order from './order'
import { category } from './category'
// import product from './product'
// import product from './product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productApi, productListType, productTypes, blockContentType, order, category],
}
