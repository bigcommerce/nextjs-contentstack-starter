import cn from 'classnames'
import { FC, ReactNode, Component } from 'react'
import s from './GridProduct.module.css'
import Image from 'next/image'
import Link from 'next/link'

export interface GridEntity {
  grid: GridData
}

export interface GridData {
  item: ItemData
}

export interface ItemData {
  title: string
  description: string
  link: LinkData
  img?: any
}

export interface LinkData {
  title: string
  url: string
}

export interface DataProps {
  title: string
  description: string
  grid: GridData[]
}

interface Props {
  className?: string
  children?: ReactNode[] | Component[] | any[]
  variant?: 'cols4' | string
  data?: DataProps
}

const GridProduct: FC<Props> = ({ className, children, variant, data = {} }) => {
  const rootClassName = cn(
    s.root,
    {
      [s.variantCols4]: variant === 'cols4',
    },
    className
  )

  // If it contains data we build the childrens.
    console.log("data", data)
  const { grid } = data
    console.log("grid", grid)
 {grid?.map((item: any , i) => (
     console.log("1:", item?.bc_products)
 ))}

    // @ts-ignore
    const bc_products = grid
    // @ts-ignore
    console.log("kjskjskj", bc_products[0]?.bc_products?.data)
    // @ts-ignore
    const test = bc_products[0]?.bc_products?.data
    console.log("sss", test[0]?.primary_image)

    if (grid) {
    const meassureProps =
      variant === 'cols4'
        ? {
            width: 263,
            height: 365,
          }
        : {
            width: 365,
            height: 365,
          }

        let bc_products;
        return (
      <div>
        <div className="text-center my-12">
          {data.title && (
            <h2 className="mb-2 text-4xl font-semibold tracking-wide uppercase">
              {data.title}
            </h2>
          )}
          {data.description && <p className="">{data.description}</p>}
        </div>
        <div className={rootClassName}>
          {test?.map(( item: any, i: any) => (
            <div
              className="flex flex-col items-center text-center mb-10"
              key={`item__${i}`}
            >
              <div className="mb-2">
                {item?.page_title && (
                  <Image
                    src={item?.primary_image?.url_standard}
                    alt={item.primary_image?.url_standard}
                    layout="fixed"
                    {...meassureProps}
                  />
                )}
              </div>
              {item?.name && (
                <h2 className="mb-2 text-lg font-medium tracking-wide uppercase">
                  {item?.name}
                </h2>
              )}
              {item?.description && (
                <div
                  className="mb-2 px-4"
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                />
              )}
              <Link href={item?.link?.url ? item?.link?.url : '/'} passHref>
                <a
                  className="mt-4 uppercase font-semibold tracking-wide
            text-xs text-slate-900 bg-white rounded-full
            px-4 py-3 border  border-slate-400 hover:border-black
            transition ease-linear duration-150"
                >
                  Shop Now
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return <div className={rootClassName}>{children}</div>
}

export default GridProduct
