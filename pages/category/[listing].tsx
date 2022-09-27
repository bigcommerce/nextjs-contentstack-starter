import type {GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult} from 'next'

import Head from 'next/head'
import cs from '@lib/contentstack'
import { Layout } from '@vercel/examples-ui'
import { Navbar, Footer, UIComponent, Container } from '@components/ui'
import {getAllEntries} from "@lib/cmsEntries";

export async function getStaticProps({
  locale,
}: GetStaticPropsContext): Promise<
  GetStaticPropsResult<Entry | null> | undefined
> {
  const entry = await getAllEntries("category")

  console.log("category", entry[0]?. bc_cat?.data)
    if (entry) {
      return {
        props: {
          ...entry,
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

function Listing(props: Entry) {
  console.log("catss", props)

  const { title, modular_blocks = [], header = { links: [] } } = props

  return (
    <>
      <Container>
        <Navbar data={header} />
        {modular_blocks.map(({ component }, i) => {
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
