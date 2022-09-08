import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ResultsAreaDataSource } from './results-area-datasource';
import {SearchService} from "../Service/search.service";
import {PurchaseOrder} from "../Service/Model/purchase-order";
import {Observable} from "rxjs";

@Component({
  selector: 'app-results-area',
  templateUrl: './results-area.component.html',
  styleUrls: ['./results-area.component.css']
})
export class ResultsAreaComponent implements OnInit,OnDestroy {

  dataSource: ResultsAreaDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['code','type', 'vendor', 'reference_document', 'state', 'business_unit'];
  data : PurchaseOrder[] = [];
  constructor(private searchService : SearchService) {
    this.dataSource = new ResultsAreaDataSource(searchService);
  }

  ngOnInit(): void {
    this.searchService.results.subscribe(
      response =>{
        this.data = response;
      }
  );
  }

  ngOnDestroy(): void {
    this.searchService.results.unsubscribe();
  }
}
