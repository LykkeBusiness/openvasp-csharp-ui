export enum TransferReplyMessageCode {
  TransferAccepted = 'TransferAccepted',
  TransferDeclinedRequestNotValid = 'TransferDeclinedRequestNotValid',
  TransferDeclinedNoSuchBeneficiary = 'TransferDeclinedNoSuchBeneficiary',
  TransferDeclinedVirtualAssetNotSupported = 'TransferDeclinedVirtualAssetNotSupported',
  TransferDeclinedTransferNotAuthorized = 'TransferDeclinedTransferNotAuthorized',
  TransferDeclinedTemporaryDisruptionOfService = 'TransferDeclinedTemporaryDisruptionOfService',
}
