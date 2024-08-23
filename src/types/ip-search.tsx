export interface ipSearch {
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

export interface Currency {
  code: string
  name: string
}