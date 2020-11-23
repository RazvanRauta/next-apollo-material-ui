import { IncomingMessage, ServerResponse } from 'http'
import { useMemo } from 'react'
import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

export type ResolverContext = {
    req?: IncomingMessage
    res?: ServerResponse
}

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        uri: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`,
        cache: new InMemoryCache(),
    })
}

export function initializeApollo(initialState: any = null) {
    const _apolloClient = apolloClient ?? createApolloClient()

    if (initialState) {
        _apolloClient.cache.restore(initialState)
    }
    if (typeof window === 'undefined') return _apolloClient
    if (!apolloClient) apolloClient = _apolloClient

    return _apolloClient
}

export function useApollo(initialState: any) {
    const store = useMemo(() => initializeApollo(initialState), [initialState])
    return store
}
