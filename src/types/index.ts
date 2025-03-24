export interface Geo {
    lat: string
    lng: string
  }
  
  export interface Address {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: Geo
  }
  
  export interface Company {
    name: string
    catchPhrase: string
    bs: string
  }
  
  export interface User {
    id: number
    name: string
    username: string
    email: string
    address: Address
    phone: string
    website: string
    company: Company
  }
  
  export interface Hotel {
    name: string
    latitude: number
    longitude: number
  }
  
  export interface NearestUserResult {
    hotel: Hotel
    nearestUser: User
    distance: number
  }
  
  