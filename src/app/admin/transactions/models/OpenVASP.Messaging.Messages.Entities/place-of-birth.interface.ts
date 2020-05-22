import {Country} from '../OpenVASP.Messaging.Messages.Entities/country.interface';

export interface PlaceOfBirth {
  DateOfBirth: Date;
  CityOfBirth: string;
  Country: Country;
}
