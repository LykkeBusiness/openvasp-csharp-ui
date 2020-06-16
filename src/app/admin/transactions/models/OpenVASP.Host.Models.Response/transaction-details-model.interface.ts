import {VaspInformation} from '../OpenVASP.Messaging.Messages.Entities/vasp-information.interface';
import {NaturalPersonId} from '../OpenVASP.Messaging.Messages.Entities/natural-person-id.interface';
import {JuridicalPersonId} from '../OpenVASP.Messaging.Messages.Entities/juridical-person-id.interface';

export interface TransactionDetailsModel {
  TransactionType: string;
  Id: string;
  SessionId: string;
  Asset: string;
  Amount: number;
  OriginatorPostalAddressStreet: string;
  OriginatorPostalAddressBuilding: number;
  OriginatorPostalAddressAddressLine: string;
  OriginatorPostalAddressPostCode: string;
  OriginatorPostalAddressTown: string;
  OriginatorPostalAddressCountryIso2Code: string;
  OriginatorPlaceOfBirthTown: string;
  OriginatorPlaceOfBirthCountryIso2Code: string;
  OriginatorPlaceOfBirthDate: Date;
  OriginatorFullName: string;
  OriginatorVaan: string;
  CounterPartyVasp: VaspInformation;
  OriginatorNaturalPersonIds: NaturalPersonId[];
  OriginatorJuridicalPersonIds: JuridicalPersonId[];
  OriginatorBic: string;
  BeneficiaryFullName: string;
  BeneficiaryVaan: string;
  CounterPartyVaspName: string;
  CreationDateTime: Date;
  Status: string;
  DestinationAddress: string;
  TransactionDateTime: Date;
  TransactionHash: string;
  SendingAddress: string;
  SessionDeclineCode: string;
  TransferDeclineCode: string;
}
