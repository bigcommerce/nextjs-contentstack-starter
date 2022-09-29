import React, { ReactElement } from 'react'
import Image, { ImageProps } from 'next/image'
import s from './ProductCard.module.css'
import Link from 'next/link'


type Props = {
  className?: string
  product: any
}
export const ProductCard = (props: Props): ReactElement => {

  console.log("product", props)

  const { product } = props

  const image = product?.node?.defaultImage?.url640wide || ""

  let path = product?.node?.path || ""


  return (
    <>
    <Link  href={`/product/${path}`}>

    <div className={s.productCard}>
          <div className={s.productImageContainer}>
            {image && (
              <Image className={s.productImage} src={image} layout={'fill'} alt={"test"} />
            )}
          </div>
          <div className={s.name}>{product?.node?.name}</div>
        <div className={s.price}>{product?.node?.prices?.price?.value}</div>
      </div>
    </Link>
    </>
  )
}

export default ProductCard
