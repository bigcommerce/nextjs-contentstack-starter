import type {GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult} from 'next'

import Head from 'next/head'
import cs from '@lib/contentstack'
import { Layout } from '@vercel/examples-ui'
import { Navbar, Footer, UIComponent, Container } from '@components/ui'
import {getAllEntries} from "@lib/cmsEntries";
import useSearch from '@bigcommerce/storefront-data-hooks/products/use-search'

import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllProducts from '@bigcommerce/storefront-data-hooks/api/operations/get-all-products'

export async function getStaticProps({
  locale,params
}: GetStaticPropsContext): Promise<
  GetStaticPropsResult<Entry | null> | undefined
> {


  console.log("params", params)

    // const { data } = await useSearch( {
    //   categoryId: 2,
    // })
    //
    // const {products, pagination} = data


  const { products } = await getAllProducts({
  })
  console.log("products", products)
    if (products) {
      return {
        // @ts-ignore
        props: {
          ...products,
        },
        revalidate: 1,
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
  console.log("catss", props)

  const { title, modular_blocks = [], header = { links: [] } } = props

    const {data}  =  useSearch ( {
      categoryId: 25,
    } )

    console.log ( "jj", data )


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
      </Container>
      <Footer pages={[]} />
    </>
  )
}


Listing.Layout = Layout

export default Listing
