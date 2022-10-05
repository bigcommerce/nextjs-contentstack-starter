import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";
import { Layout } from "@vercel/examples-ui";
import ProductView from "@components/ui/ProductView";
import { fetchProductPaths } from "../../lib/bigcommerce/graphql/queries/fetch-product-paths";
import { getConfig } from "@bigcommerce/storefront-data-hooks/api";
import getProduct from "@bigcommerce/storefront-data-hooks/api/operations/get-product";
import getAllProducts from "@bigcommerce/storefront-data-hooks/api/operations/get-all-products";
import { Footer, Navbar, UIComponent, Container } from "@components/ui";

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const productPaths = await fetchProductPaths();
  const paths = productPaths.map((path: string) => `/product${path}`);

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const product = await getProduct({ variables: { slug: params!.slug } });
  const allProductsPromise = await getAllProducts({ variables: { first: 4 } });

  const { products: relatedProducts } = await allProductsPromise;

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`);
  }

  return {
    props: {
      product,
      relatedProducts,
    },
    revalidate: 200,
  };
}

function Slug(props: any) {
  const router = useRouter();

  //TODO switch over to new header entitiy
  const {
    product,
    relatedProducts,
    modular_blocks = [],
    header = { links: [] },
  } = props;

  return (
    <>
      <Container>
        <Navbar data={header} />
        {modular_blocks.map((component: any, i: any) => {
          const { component_type, component_variant, ...rest } = component;
          return (
            <UIComponent
              key={`${component_type}_${i}`}
              componentType={component_type}
              componentVariant={component_variant}
              data={rest}
              priority={i < 3}
            />
          );
        })}

        <ProductView product={product} relatedProducts={relatedProducts} />
      </Container>
      <Footer pages={[]} />
    </>
  );
}

Slug.Layout = Layout;

export default Slug;
