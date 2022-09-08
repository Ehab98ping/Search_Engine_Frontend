import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ResultsAreaDataSource, ResultsAreaItem } from './results-area-datasource';

@Component({
  selector: 'app-results-area',
  templateUrl: './results-area.component.html',
  styleUrls: ['./results-area.component.css']
})
export class ResultsAreaComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ResultsAreaItem>;
  dataSource: ResultsAreaDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['code','type', 'vendor', 'reference_document', 'state', 'business_unit'];

  constructor() {
    this.dataSource = new ResultsAreaDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
