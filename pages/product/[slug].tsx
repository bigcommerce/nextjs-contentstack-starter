import type { GetStaticPathsContext, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { Layout } from '@vercel/examples-ui'
import ProductView from '@components/ui/ProductView'
import { fetchProductPaths } from '../../src/bigcommerce/graphql/queries/fetch-product-paths'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getProduct from '@bigcommerce/storefront-data-hooks/api/operations/get-product'
import getAllProducts from "@bigcommerce/storefront-data-hooks/api/operations/get-all-products";

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
    const productPaths = await fetchProductPaths()
    const paths = productPaths.map((path: string) => `/product${path}`)

    return {
        paths: paths,
        fallback: 'blocking',
    }
}

export async function getStaticProps({
                                         params,
                                         locale,
                                         locales,
                                         preview,
                                     }: GetStaticPropsContext<{ slug: string }>) {
    const config = { locale, locales }
    const product  = await getProduct({variables: {slug: params!.slug}})

    console.log("pdp", product)

    const allProductsPromise = await getAllProducts({variables: {first: 4}})

    const { products: relatedProducts } = await allProductsPromise

    if (!product) {
        throw new Error(`Product with slug '${params!.slug}' not found`)
    }

    return {
        props: {
            product,
            relatedProducts
        },
        revalidate: 200,
    }
}

function Slug({
                                 product,
                                 relatedProducts,
                             }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()

    return router.isFallback ? (
        <h1>Loading...</h1>
    ) : (
        <ProductView product={product} relatedProducts={relatedProducts} />
    )
}

Slug.Layout = Layout

export default Slug
