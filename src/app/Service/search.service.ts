import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {PurchaseOrder} from "./Model/purchase-order";
import {ɵElement, ɵValue} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  searchApiUrl = 'http://localhost:8080/api/v1/search';
  constructor(private http : HttpClient) {
  }

  results : Subject<PurchaseOrder[]> = new Subject<PurchaseOrder[]>();
  search(searchInput: string){
    let p : HttpParams = new HttpParams();
    p = p.append("query",searchInput);
    this.http.get<any>(this.searchApiUrl,{params: p}).subscribe(
      res => {
        // this.results = res;
        console.log(this.results);
        this.results.next(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  f1(){

  }
}

