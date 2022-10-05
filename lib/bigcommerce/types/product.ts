export type BrandInfo = {
  id?: string;
  name: string;
  slug: string;
  path?: string;
};

export type CategoryInfo = {
  id: string;
  name: string;
  slug: string;
  path: string;
};

export type ProductImage = {
  url: string;
  urlOriginal?: string;
  url_thumbnail?: string;
  alt?: string;
  url_so?: string;
  isDefault?: boolean;
};

export type ProductPrice = {
  value: number;
  currencyCode?: "USD" | "CAD" | "EUR" | "ARS" | string;
  retailPrice?: number;
  salePrice?: number;
  listPrice?: number;
  extendedSalePrice?: number;
  extendedListPrice?: number;
};

export type ProductSpec = {
  name: string;
  value: string;
  displayOrder: number;
};

// A JSON object, pushed to Algolia for a simple k/v object for faceting
export type ProductSpecFacets = {
  [key: string]: string | number;
};

// TODO - Can we merge this back into ProductSpec?
export type ProductSpecForAlgoliaFaceting = {
  [key: string]: string | number;
  value: string;
  displayOrder: number;
};

export type ProductOption = {
  __typename?: "MultipleChoiceOption";
  id: string;
  displayName: string;
  values: ProductOptionValues[];
};

export type ProductOptionValues = {
  label: string;
  hexColors?: string[];
  isDefault?: boolean;
};

export type SKU = string;

export type ProductVariant = {
  id: string | number;
  sku: SKU;
  options: ProductOption[];
  availableForSale?: boolean;
  price?: ProductPrice;
  defaultImage?: ProductImage;
};

export type BulletPoints = Array<string>;

export type Product = {
  id: string;
  objectID: string;
  name: string;
  intro: string; // Sidebar
  details?: string; // TODO populate from specialCustomFields
  detailsPoints: BulletPoints;
  summary: string;
  summaryPoints: BulletPoints;
  description: string; // Fallback for **Summary**
  descriptionHtml?: string;
  warranty?: string; // STOREFRONT_AVAILABILITY_TEXT
  shipping?: string; // STOREFRONT_WARRANTY_INFO
  sku?: SKU; // TODO - Make required.
  slug?: string;
  path?: string;
  brand?: BrandInfo;
  categories?: CategoryInfo[];
  images: ProductImage[];
  variants: ProductVariant[];
  price: ProductPrice;
  options: ProductOption[];
  meta?: ProductMeta;
  custom_url?: { url: string; is_customized: boolean };
};

// This type is the minimal information needed to render a ProductCard,
// and allows for smaller queries, or sending less data to the FE
export const ProductForCardFields = [
  "id",
  "meta",
  "price",
  "path",
  "slug",
  "images",
  "name",
  "brand",
] as const;
export type ProductForCard = Pick<Product, typeof ProductForCardFields[number]>;

export type CustomFields = Record<string, string>; // { [key: string]: string }

export type ProductRating = number;

export type ProductMeta = {
  rating: ProductRating;
  flag: any | null;
  // flag: ProductFlagProps | null
};

export const EmptyProductMeta: ProductMeta = { rating: 0, flag: null };

export type SearchProductsBody = {
  search?: string;
  categoryId?: string | number;
  brandId?: string | number;
  sort?: string;
  locale?: string;
};

export type ProductTypes = {
  product: Product;
  searchBody: SearchProductsBody;
};
