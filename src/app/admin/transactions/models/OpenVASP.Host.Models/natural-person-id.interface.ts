import {NaturalIdentificationType} from '../OpenVASP.Messaging.Messages.Entities/natural-identification-type.enum';

export interface NaturalPersonIdModel {
  IdentificationType: NaturalIdentificationType;
  Identifier: string;
  CountryIso2Code: string;
  NonStateIssuer: string;
}
