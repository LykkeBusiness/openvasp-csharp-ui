import {JuridicalIdentificationType} from '../OpenVASP.Messaging.Messages.Entities/juridical-identification-type.enum';

export interface JuridicalPersonIdModel {
  IdentificationType: JuridicalIdentificationType;
  Identifier: string;
  CountryIso2Code: string;
  NonStateIssuer: string;
}
