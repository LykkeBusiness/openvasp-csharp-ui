import {NaturalIdentificationType} from '../OpenVASP.Messaging.Messages.Entities/natural-identification-type.enum';

export interface NaturalPersonIdModel {
  Id: string;
  Type: NaturalIdentificationType;
  CountryIso2Code: string;
  NonStateIssuer: string;
}
