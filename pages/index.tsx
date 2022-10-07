import type { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Head from "next/head";
import { Layout } from "@vercel/examples-ui";
import { Navbar, Footer, UIComponent, Container } from "@components/ui";
import { getAllEntries, getEntriesByKey } from "@lib/cmsEntries";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  try {
    const entry = await getAllEntries("home_page");
    const header = await getAllEntries("header");
    const navBar: any = header[0];

    if (entry) {
      return {
        props: {
          ...entry[0],
          navBar,
        },
        revalidate: 1,
      };
    }

    throw new Error("Entry is not valid");
  } catch (err) {
    console.log(err);
  }
}

function Index(props: any) {
  const { title, seo, modular_blocks = [], navBar } = props;

  console.log("header", props);
  console.log("navLinks", navBar);

  return (
    <>
      <Head>
        <title>
          {seo?.title ? seo?.title : title} - {seo?.description}
        </title>
        <meta name="description" content={seo?.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Navbar data={navBar} />
        {modular_blocks.map((component: any, i: number) => {
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
      </Container>
      <Footer pages={[]} />
    </>
  );
}

Index.Layout = Layout;

export default Index;
