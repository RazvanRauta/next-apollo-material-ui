/**
 *  @author: Razvan Rauta
 *  Date: Nov 23 2020
 *  Time: 18:36
 */

import { SuggestionsDocument } from '__generated__/src/graphQL/Suggestions.graphql'
import { request } from 'graphql-request'
import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'

import Artist from '@/models/Artist'

import Suggestion from '../Suggestion'
import useStyles from './styles'

interface SuggestionData {
  name: string | null
  id: number | null
}

interface SearchProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const renderSuggestion = (
  suggestion: SuggestionData,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return <Suggestion {...suggestion} setOpen={setOpen} />
}

const getSuggestionValue = (suggestion: SuggestionData) => suggestion.name || ''

const Search: React.FC<SearchProps> = ({ setOpen }) => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<SuggestionData[] | null>([])
  const classes = useStyles()

  const getSuggestions = async (value: string) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    let suggestionData: SuggestionData[] | undefined = []

    if (inputLength === 0) return []
    try {
      const data = await request(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        SuggestionsDocument,
        { offset: 0, limit: 23, query: inputValue },
      )
      const { artists } = data

      suggestionData = artists?.map((artist: Artist) =>
        artist
          ? {
              name: artist?.name ?? null,
              id: artist?.id ?? null,
            }
          : { name: null, id: null },
      )

      return suggestionData
        ? suggestionData.filter(
            (artist) =>
              artist?.name?.toLowerCase().slice(0, inputLength) === inputValue,
          )
        : []
    } catch (error) {
      console.log({ error })
    }
    return []
  }

  //@ts-ignore
  const onChange = (_, { newValue }) => {
    setValue(newValue)
  }

  //@ts-ignore
  const onSuggestionsFetchRequested = async ({ value }) => {
    setSuggestions(await getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const inputProps = {
    placeholder: 'Type the name of an artist..',
    value,
    onChange,
  }
  return (
    suggestions && (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={(suggestion) => renderSuggestion(suggestion, setOpen)}
        inputProps={inputProps}
      />
    )
  )
}

export default Search
