import Contentstack, { Config, Query, Region } from 'contentstack'


const contentStackKey = process.env.CONTENTSTACK_API_KEY || ''
const contentStackToken = process.env.CONTENTSTACK_ACCESS_TOKEN || ''
const contentStackEnv =  process.env.CONTENTSTACK_ENV ?? process.env.NODE_ENV

const config: Config = {
    api_key: contentStackKey,
    delivery_token: contentStackToken,
    environment: contentStackEnv,
    region: Region.US,
}

const Stack = Contentstack.Stack(config)
type CmsContentTypes = 'story' | 'category' | 'home_page' | 'header'

/**
 * Fetch result of ContentStack query.
 * @param csQuery Query
 */
const resultOf = async (csQuery: Query): Promise<any> => {
    return csQuery
        .toJSON()
        .find()
        .then(
            function success(result) {
                return result[0]
            },
            function error(err) {
                return err
            }
        )
}

export const getAllEntries = (contentType: CmsContentTypes) => {
    const Query = Stack.ContentType(contentType).Query()

    return resultOf(Query)
}

export const getEntriesByKey = (contentType: CmsContentTypes, key: string, id: string | number) => {
    const Query = Stack.ContentType(contentType).Query().equalTo(key, id)

    return resultOf(Query)
}

export const getEntries = (contentType: CmsContentTypes, id: string | number) => {
    const Query = Stack.ContentType(contentType).Query().equalTo('uid', id)

    return resultOf(Query)
}
