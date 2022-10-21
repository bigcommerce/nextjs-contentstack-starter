import { fetchGraphQL } from "../../fetchers/fetch-graphql";
import { fetchAllProductPathsQuery } from "./fetch-all-product-paths-query.graphql";
import { normalizeProductCard } from "../../../normalize/productCard";

export type ProductPath = string;

export const fetchCategoryProduct = async (
  after: string = "",
  depth: number = 0
): Promise<ProductPath[]> => {
  type PathsNode = { node: { path: string } };
  try {
    //<FetchAllProductPathsQuery>
    const res = await fetchGraphQL(fetchAllProductPathsQuery, { after });
    // @ts-ignore
    const product = normalizeProductCard(res);
    const paths = res.data.site.products.edges.map((x: PathsNode) => {
      return x.node.path;
    });

    if (res.data.site.products.pageInfo.hasNextPage) {
      const nextAfter = res.data.site.products.pageInfo.endCursor;
      const morePaths = await fetchCategoryProduct(nextAfter, depth + 1);
      return paths.concat(morePaths);
    } else {
      return paths;
    }
  } catch (e) {
    throw e;
    // return []
  }
};
