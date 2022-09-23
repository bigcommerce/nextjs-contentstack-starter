/**
 *  Get a list of all product paths on the site.
 *    ['cool-product-1', ... ]
 *
 *  Adapted from
 *  framework/bigcommerce/api/operations/get-all-product-paths' Due to crazy import errors.
 */
import { fetchGraphQL } from '../../fetchers/fetch-graphql'
import { fetchAllProductPathsQuery } from './fetch-all-product-paths-query.graphql'

export type ProductPath = string

export const fetchProductPaths = async (
  after: string = '',
  depth: number = 0
): Promise<ProductPath[]> => {
  type PathsNode = { node: { path: string } }
  try {
    //<FetchAllProductPathsQuery>
    const res = await fetchGraphQL(fetchAllProductPathsQuery, { after })

    const paths = res.data.site.products.edges.map((x: PathsNode) => {
      return x.node.path
    })

    if (res.data.site.products.pageInfo.hasNextPage) {
      const nextAfter = res.data.site.products.pageInfo.endCursor
      const morePaths = await fetchProductPaths(nextAfter, depth + 1)
      return paths.concat(morePaths)
    } else {
      return paths
    }
  } catch (e) {
    throw e
    // return []
  }
}
