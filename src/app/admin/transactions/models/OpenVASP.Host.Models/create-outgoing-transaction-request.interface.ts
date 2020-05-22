import {PostalAddress} from './postal-address.interface';
import {PlaceOfBirth} from './place-of-birth.interface';
import {NaturalPersonIdModel} from './natural-person-id.interface';
import {JuridicalPersonIdModel} from './juridical-person-id.interface';

export interface CreateOutgoingTransactionRequest {
  BeneficiaryFullName: string;
  BeneficiaryVaan: string;
  OriginatorFullName: string;
  OriginatorVaan: string;
  OriginatorPostalAddress: PostalAddress;
  OriginatorPlaceOfBirth: PlaceOfBirth;
  OriginatorNaturalPersonIds: NaturalPersonIdModel[];
  OriginatorJuridicalPersonIds: JuridicalPersonIdModel[];
  OriginatorBic: string;
  Asset: string;
  Amount: number;
}
