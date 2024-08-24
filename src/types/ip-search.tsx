export interface ipSearch {
  freeIpApiData: FreeIpApi
  ipApiData: IpApi
}

interface FreeIpApi {
  cityName: string
  continent: string
  continentCode: string
  countryCode: string
  countryName: string
  currency: Currency
  ipAddress: string
  ipVersion: number
  isProxy: boolean
  language: string
  latitude: number
  longitude: number
  regionName: string
  timeZone: string
  timeZones: string[]
  tlds: string[]
  zipCode: string
}

interface Currency {
  code: string
  name: string
}

interface IpApi {
  status: string
  continent: string
  continentCode: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  district: string
  zip: string
  lat: number
  lon: number
  timezone: string
  offset: number
  currency: string
  isp: string
  org: string
  as: string
  asname: string
  reverse: string
  mobile: boolean
  proxy: boolean
  hosting: boolean
  query: string
}