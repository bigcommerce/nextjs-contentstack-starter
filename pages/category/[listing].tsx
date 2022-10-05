import type {GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult} from 'next'
import { Layout } from '@vercel/examples-ui'
import { Navbar, Footer, UIComponent, Container } from '@components/ui'
import {getAllEntries} from "@lib/cmsEntries";
import {fetchGraphQL} from "../../lib/bigcommerce/fetchers/fetch-graphql";
import {fetchCategoryProductQuery} from "../../lib/bigcommerce/graphql/queries/fetch-category-products-query.graphql";
import getSlugName from "@lib/get-slug-name";
import ProductCard from "@components/ui/ProductCard";

export async function getStaticProps({
  locale,params
}: GetStaticPropsContext): Promise<
  GetStaticPropsResult<any | null> | undefined
> {
    //TODO   GetStaticPropsResult<Products

  const listing = typeof params?.listing === 'string' ? getSlugName(params.listing) : ''
  const entry = await getAllEntries("header")

    let products

const categories = entry[0]?.bc_cat?.data
  try {
    const activeCatogories =
        categories.filter((cat: any) => {
          return getSlugName(cat.name) === listing
        }) || null
     const activeCategory = activeCatogories[0]
      if (activeCategory) {
           products = await fetchGraphQL(fetchCategoryProductQuery, {categoryEntityId: activeCategory.id})

      } else {
          //TODO Brands
        //Return not found
        console.log("not cat match")
      }
  } catch (err) {}

  console.log("sdfsdfsdfsd", products?.data?.site?.search?.searchProducts?.products?.edges)
    //TODO
  const normalizeProducts = products?.data?.site?.search?.searchProducts?.products?.edges || []

    if (normalizeProducts) {
      return {
          props: {
              normalizeProducts,
          },
          revalidate: 1
      }
    }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

function Listing(props: any) {

    //TODO switch over to new header entitiy
  const { normalizeProducts, modular_blocks = [], header = { links: [] } } = props


  return (
    <>
      <Container>
        <Navbar data={header} />
        {modular_blocks.map(( component: any , i: any) => {
          const { component_type, component_variant, ...rest } = component
          return (
            <UIComponent
              key={`${component_type}_${i}`}
              componentType={component_type}
              componentVariant={component_variant}
              data={rest}
              priority={i < 3}
            />
          )
        })}

          <div className="grid grid-cols-2 gap-2 lg:m-3 w-full lg:grid-cols-3 lg:pr-2 lg:pl-2">
          {normalizeProducts.map(( product: any , i: any) => {
              return (
                  <div key={product?.node?.name}>
                      <ProductCard product={product}/>
                  </div>
              )
          })}
          </div>


      </Container>
      <Footer pages={[]} />
    </>
  )
}


Listing.Layout = Layout

export default Listing
