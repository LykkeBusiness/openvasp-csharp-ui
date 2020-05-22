import {VirtualAssetType} from '../OpenVASP.Messaging.Messages.Entities/virtual-asset-type.enum';
import {PlaceOfBirth} from '../OpenVASP.Host.Models/place-of-birth.interface';
import {PostalAddress} from '../OpenVASP.Host.Models/postal-address.interface';
import {VaspInformation} from '../OpenVASP.Messaging.Messages.Entities/vasp-information.interface';
import {NaturalPersonId} from '../OpenVASP.Messaging.Messages.Entities/natural-person-id.interface';
import {JuridicalPersonId} from '../OpenVASP.Messaging.Messages.Entities/juridical-person-id.interface';
import {TransactionStatus} from './transaction-status.enum';
import {TransactionType} from './transaction-type.enum';

export interface Transaction {
  Id: string;
  SessionId: string;
  Asset: VirtualAssetType;
  Amount: number;
  OriginatorPlaceOfBirth: PlaceOfBirth;
  OriginatorPostalAddress: PostalAddress;
  OriginatorFullName: string;
  OriginatorVaan: string;
  CounterPartyVasp: VaspInformation;
  OriginatorNaturalPersonIds: NaturalPersonId[];
  OriginatorJuridicalPersonIds: JuridicalPersonId[];
  OriginatorBic: string;
  BeneficiaryFullName: string;
  BeneficiaryVaan: string;
  CreationDateTime: Date;
  Status: TransactionStatus;
  DestinationAddress: string;
  TransactionHash: string;
  SendingAddress: string;
  SessionDeclineCode: string;
  TransferDeclineCode: string;
  Type: TransactionType;
}
