import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PurchaseOrder} from "./Model/purchase-order";

@Injectable({providedIn: 'root'})

export class SearchService{
  private searchApiUrl = '';
  private http;
  constructor(http:HttpClient) {
    this.http = http;
  }

  public search(): Observable<PurchaseOrder[]>{
    return this.http.get<PurchaseOrder[]>(this.searchApiUrl);
  }
}
