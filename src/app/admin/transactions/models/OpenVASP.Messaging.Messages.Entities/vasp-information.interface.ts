import {PostalAddress} from './postal-address.interface';
import {PlaceOfBirth} from './place-of-birth.interface';
import {NaturalPersonId} from './natural-person-id.interface';
import {JuridicalPersonId} from './juridical-person-id.interface';

export interface VaspInformation {
  Name: string;
  VaspIdentity: string;
  VaspPublickKey: string;
  PostalAddress: PostalAddress;
  PlaceOfBirth: PlaceOfBirth;
  NaturalPersonIds: NaturalPersonId[];
  JuridicalPersonIds: JuridicalPersonId[];
  BIC: string;
}
