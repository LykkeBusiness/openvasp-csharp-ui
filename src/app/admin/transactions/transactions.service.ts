import {Injectable} from '@angular/core';
import {ApiHttpService} from 'ngx-api-utils';
import {TransactionDetailsModel} from './models/OpenVASP.Host.Models.Response/transaction-details-model.interface';
import {CreateOutgoingTransactionRequest} from './models/OpenVASP.Host.Models/create-outgoing-transaction-request.interface';
import {toParamsString} from 'src/app/shared/utils/common';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private apiHttp: ApiHttpService) {}

  getIncomingTransactions() {
    return this.apiHttp.get<TransactionDetailsModel[]>('/api/incomingTransactions' /* + toParamsString(request)*/, {
      headers: this.apiHttp.headersWithNoAuthorization(),
    });
  }

  getOutgoingTransactions() {
    return this.apiHttp.get<TransactionDetailsModel[]>('/api/outgoingTransactions' /* + toParamsString(request)*/, {
      headers: this.apiHttp.headersWithNoAuthorization(),
    });
  }

  getIncomingTransaction(id: string) {
    return this.apiHttp.get<TransactionDetailsModel>('/api/incomingTransactions/' + id, {
      headers: this.apiHttp.headersWithNoAuthorization(),
    });
  }

  getOutgoingTransaction(id: string) {
    return this.apiHttp.get<TransactionDetailsModel>('/api/outgoingTransactions/' + id, {
      headers: this.apiHttp.headersWithNoAuthorization(),
    });
  }

  create(model: CreateOutgoingTransactionRequest) {
    return this.apiHttp.post<TransactionDetailsModel>('/api/outgoingTransactions/create', model, {
      headers: this.apiHttp.headersWithNoAuthorization(),
    });
  }

  sessionReply(id: string, model: any) {
    const paramsStr = toParamsString(model);

    return this.apiHttp.put<TransactionDetailsModel>(`/api/incomingTransactions/${id}/sessionReply` + paramsStr, null, {
      headers: this.apiHttp.headersWithNoAuthorization(),
    });
  }

  transferReply(id: string, model: any) {
    const paramsStr = toParamsString(model);

    return this.apiHttp.put<TransactionDetailsModel>(`/api/incomingTransactions/${id}/transferReply` + paramsStr, null, {
      headers: this.apiHttp.headersWithNoAuthorization(),
    });
  }

  transferDispatch(id: string, model: any) {
    const paramsStr = toParamsString(model);

    return this.apiHttp.put<TransactionDetailsModel>(`/api/outgoingTransactions/${id}/transferDispatch` + paramsStr, null, {
      headers: this.apiHttp.headersWithNoAuthorization(),
    });
  }

  transferConfirm(id: string) {
    return this.apiHttp.put<TransactionDetailsModel>(`/api/incomingTransactions/${id}/transferConfirm`, null, {
      headers: this.apiHttp.headersWithNoAuthorization(),
    });
  }
}
