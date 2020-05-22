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
  OriginatorPostalAddressCountry: string;
  OriginatorPlaceOfBirthTown: string;
  OriginatorPlaceOfBirthCountry: string;
  OriginatorPlaceOfBirthDate: Date;
  OriginatorFullName: string;
  OriginatorVaan: string;
  BeneficiaryFullName: string;
  BeneficiaryVaan: string;
  CounterPartyVaspName: string;
  CreationDateTime: Date;
  Status: string;
  DestinationAddress: string;
  TransactionHash: string;
  SendingAddress: string;
}
