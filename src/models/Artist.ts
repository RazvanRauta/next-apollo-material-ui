import {
  Artist as ArtistType,
  FilterExtrema,
  Image,
} from '__generated__/src/graphQL/Artists.graphql'

class Artist {
  id?: number | null
  name?: string | null
  nationality?: string | null
  bio?: string | null
  birth?: number | null
  death?: number | null
  longBio?: string | null
  qualifier?: string | null
  artworksCount?: number | null
  lotsCount?: number | null
  modelVersion?: string | null
  supportedModelVersions?: (string | null)[] | null
  mediumTypes?: (string | null)[] | null
  filterExtrema?: FilterExtrema | null
  photo?: Image | null

  constructor({
    id,
    name,
    nationality,
    bio,
    birth,
    death,
    longBio,
    qualifier,
    artworksCount,
    lotsCount,
    modelVersion,
    supportedModelVersions,
    mediumTypes,
    filterExtrema,
    photo,
  }: ArtistType) {
    this.id = id
    this.name = name
    this.nationality = nationality
    this.bio = bio
    this.birth = birth
    this.death = death
    this.longBio = longBio
    this.qualifier = qualifier
    this.artworksCount = artworksCount
    this.lotsCount = lotsCount
    this.modelVersion = modelVersion
    this.supportedModelVersions = supportedModelVersions
    this.mediumTypes = mediumTypes
    this.filterExtrema = filterExtrema
    this.photo = photo
  }
}

export default Artist
