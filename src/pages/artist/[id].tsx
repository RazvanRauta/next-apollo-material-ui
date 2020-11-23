/**
 *  @author: Razvan Rauta
 *  Date: Nov 23 2020
 *  Time: 15:25
 */

import { ArtistDocument } from '__generated__/src/graphQL/Artist.graphql'
import { ArtistsDocument } from '__generated__/src/graphQL/Artists.graphql'
import { ApolloError, ServerError } from '@apollo/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

import ArtistComponent from '@/components/Artist'
import { initializeApollo } from '@/lib/apollo'
import Artist from '@/models/Artist'

const ArtistPage: React.FC = () => {
  return <ArtistComponent />
}

export default ArtistPage

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()
  // @ts-ignore
  const { id } = params

  try {
    await apolloClient.query({
      query: ArtistDocument,
      variables: {
        artistId: parseInt(id),
      },
    })
  } catch (err: unknown | ApolloError) {
    if (err instanceof ApolloError) {
      const { networkError } = err
      if ((networkError as ServerError)?.result) {
        const {
          //@ts-ignore
          result: { errors },
        } = networkError
        console.log({ errors })
      }
    }
    console.log({ err })
  }
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const {
    data: { artists },
    error,
  } = await apolloClient.query({
    query: ArtistsDocument,
    variables: { limit: 23, offset: 0 },
  })

  if (error) {
    console.log('Error while getStaticPaths, ', error)
  }

  return {
    paths: artists.map(({ id }: Artist) => ({
      params: { id: `${id}` },
    })),
    fallback: true,
  }
}
