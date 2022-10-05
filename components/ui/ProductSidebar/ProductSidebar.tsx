import s from './ProductSidebar.module.css'
import React, { FC } from 'react'
import useAddItem from '@bigcommerce/storefront-data-hooks/cart/use-add-item'


interface ProductSidebarProps {
  product: any
  className?: string
}



export const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  // const [loading, setLoading] = useState(false)
  // const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

    const addToCart = async () => {
        try {
        fetch(`/api/cart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product?.product),
        }).finally(() => {

        })}
    catch (error) {
        //display error
        console.error("Error updating the product: ", error);
    }
    }

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
