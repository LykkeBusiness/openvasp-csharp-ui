import {Country} from './country.interface';

export interface PostalAddress {
  StreetName: string;
  BuildingNumber: string;
  AddressLine: string;
  PostCode: string;
  TownName: string;
  Country: Country;
}
