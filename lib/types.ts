// ContentStack Base Object type

export interface CmsEntity {
  uid: string
}

// ContentStack Image type
export interface CmsImage extends CmsEntity {
  url: string
  title?: string
}

export interface CmsLink extends CmsEntity {
  url: string
  title?: string
}

// ContentStack `story` Content Model
export interface CmsStory extends CmsEntity {
  read_time: string
  url: string
  related_stories: { uid: number }
  rich_text_editor: string
  sub_title: string
  tags: []
  title: string
  updated_at: string
  author_name: string
  image: CmsImage | null
  preview_image: CmsImage | null
  author_image: CmsImage | null
  author_bio: string
  type: string
}

// ContentStack `brand_profile` Content Model
export interface BrandProfile extends CmsEntity {
  title: string
  header_background_image: CmsImage | null
  header_logo: CmsImage | null
  main_banner_background: CmsImage | null
  main_banner_title: string
  main_banner_desc: string
  main_banner_link: CmsLink | null
  featured_products: any[]
  stories: CmsStory[]
}
// ContentStack `featured_product_card` Content Model
export interface FeaturedProductCardType extends CmsEntity {
  title: string
  brand_logo: CmsImage | null
  description: string
  product_image: CmsImage | null
  link: []
}
// ContentStack `mainstory` Content Model
// Stories Main Page
export interface MainStory extends CmsEntity {
  title: string
  header_story_title: string
  header_story_desc: string
  header_story_url: string
  header_story_image: CmsImage
  second_story: CmsEntity[] // Unsure **why** contentstack  puts these in an array!
  third_story: CmsEntity[]
  fourth_story: CmsEntity[]
}

