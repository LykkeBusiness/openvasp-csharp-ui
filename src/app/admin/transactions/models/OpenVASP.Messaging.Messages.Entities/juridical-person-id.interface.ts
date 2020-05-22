import {JuridicalIdentificationType} from './juridical-identification-type.enum';
import {Country} from './country.interface';

export interface JuridicalPersonId {
  IdentificationType: JuridicalIdentificationType;
  Identifier: string;
  IssuingCountry: Country;
  NonStateIssuer: string;
}
