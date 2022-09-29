import s from './ProductSidebar.module.css'
// import { useAddItem } from '@bigcommerce/hooks/cart'
import React, { FC, useEffect, useState } from 'react'


import Image from 'next/image'


interface ProductSidebarProps {
  product: any
  className?: string
}



export const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  // const addItem = useAddItem()
  // const [loading, setLoading] = useState(false)
  // const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})


  // const addToCart = async () => {
  //   setLoading(true)
  //   try {
  //     await addItem({
  //       productId: String(product.id),
  //       variantId: String(variant ? variant.id : product.variants[0].id),
  //     })
  //     openSidebar()
  //     setLoading(false)
  //   } catch (err) {
  //     setLoading(false)
  //   }
  // }

  return (
    <ProductSidebarUI
      className=""
      product={product}
    />
  )
}

// Just the rendering of selection options, no reliance on hooks.
export type ProductSidebarUIProps = {
  addToCart?: () => void
} & ProductSidebarProps

export const ProductSidebarUI: FC<ProductSidebarUIProps> = ({
  product,
  className,
  addToCart,
}) => {

console.log("pdp", product?.product?.name)

  return (
    <div className={className}>
      <div className={s.brandName}>{product.brand?.name}</div>

        {product?.product?.name}
 {product?.product?.prices?.price?.value}




      <div>
        <button
          aria-label="Add to Bag"
          type="button"
          className={s.button}
          onClick={addToCart}
        >
            add to bag
        </button>
      </div>
      <div className="mt-6">
        <h2>
            Details
        </h2>

          <p>{product.details}</p>
          <br />
          <p className={'text-xs mt-1'}>Item #: {product.sku}</p>


          <h2>
              Shipping & Returns
          </h2>
          <p>{product.shipping}</p>
          <p>{product.warranty}</p>
      </div>
    </div>
  )
}

export default ProductSidebar
