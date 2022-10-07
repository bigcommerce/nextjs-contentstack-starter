import type { GetStaticPathsContext, GetStaticPropsContext } from "next";
import { Layout } from "@vercel/examples-ui";
import ProductView from "@components/ui/ProductView";
import { fetchProductPaths } from "../../lib/bigcommerce/graphql/queries/fetch-product-paths";
import getProduct from "@bigcommerce/storefront-data-hooks/api/operations/get-product";
import getAllProducts from "@bigcommerce/storefront-data-hooks/api/operations/get-all-products";
import { Footer, Navbar, UIComponent, Container } from "@components/ui";
import { getAllEntries } from "@lib/cmsEntries";

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
}: GetStaticPropsContext<{ slug: string }>) {
  const product = await getProduct({ variables: { slug: params!.slug } });
  const allProductsPromise = await getAllProducts({ variables: { first: 4 } });

  const { products: relatedProducts } = await allProductsPromise;
  const header = await getAllEntries("header");
  const navBar: any = header[0];

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`);
  }

  return {
    props: {
      product,
      navBar,
      relatedProducts,
    },
    revalidate: 200,
  };
}

function Slug(props: any) {
  const { product, relatedProducts, modular_blocks = [], navBar } = props;

  return (
    <>
      <Container>
        <Navbar data={navBar} />
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
