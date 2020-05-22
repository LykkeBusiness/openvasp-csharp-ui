import {Injectable} from '@angular/core';
import {ApiHttpService} from 'ngx-api-utils';
import {TransactionDetailsModel} from './models/OpenVASP.Host.Models.Response/transaction-details-model.interface';
import {CreateOutgoingTransactionRequest} from './models/OpenVASP.Host.Models/create-outgoing-transaction-request.interface';

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

  create(model: CreateOutgoingTransactionRequest) {
    return this.apiHttp.post<TransactionDetailsModel>('/api/outgoingTransactions/create', model, {
      headers: this.apiHttp.headersWithNoAuthorization(),
    });
  }
}
