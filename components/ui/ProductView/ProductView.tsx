import s from './ProductView.module.css'
import React, { FC } from 'react'
import ProductCard  from '../ProductCard'
import {  Container } from '@components/ui'
import ProductSidebar from '../ProductSidebar'
import ProductImagesGrid from '../ProductImagesGrid'

interface ProductViewProps {
  product: any
  relatedProducts: any[] | any[]
}



const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
  // const rawHtml = String(product.descriptionHtml)
  //   .toString()
  //   .replace(/<div>&nbsp;<\/div>/g, '')
  // const goodHtmlDescription = { __html: rawHtml }

  return (

      <Container className={s.pageContainer} clean>
        <div className={s.root}>
          <div className={s.main}>
            <div className={s.productImagesContainer}>
              <ProductImagesGrid product={product} />
            </div>

            <div className={s.sidebar}>
              <ProductSidebar product={product} />
            </div>
          </div>

          <div className={s.sectionsContainer}>
            <section className={s.section}>
              <h2 className={s.sectionHeading}>
                Summary
              </h2>
              <div
                className={'grid grid-cols-auto md:grid-cols-2 gap-8'}
                // dangerouslySetInnerHTML={goodHtmlDescription}
              >
                <div>{product.summary}</div>
                <div>
                </div>
              </div>
            </section>

            <section className={s.section}>
              <h2  className={s.sectionHeading}>
                Features
              </h2>
            </section>

            <section className={s.sectionGrey}>
              <h2  className={s.sectionHeading}>
                Tech Specs
              </h2>
            </section>
          </div>

          <section className="py-12 px-6 mb-10">
            <h2  className={s.sectionHeading}>
              You may be interested in
            </h2>
            <div className={s.relatedProductsGrid}>
              {relatedProducts.map((p) => (
                <ProductCard product={p} key={p.path} />
              ))}
            </div>
          </section>
        </div>
      </Container>
  )

}

export default ProductView
