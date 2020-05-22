import {NaturalIdentificationType} from './natural-identification-type.enum';
import {Country} from './country.interface';

export interface NaturalPersonId {
  IdentificationType: NaturalIdentificationType;
  Identifier: string;
  IssuingCountry: Country;
  NonStateIssuer: string;
}
