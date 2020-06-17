import {JuridicalIdentificationType} from '../OpenVASP.Messaging.Messages.Entities/juridical-identification-type.enum';

export interface JuridicalPersonIdModel {
  Id: string;
  Type: JuridicalIdentificationType;
  CountryIso2Code: string;
  NonStateIssuer: string;
}
