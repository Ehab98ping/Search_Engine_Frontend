import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ResultsAreaItem {

  code: string;
  type: string;
  vendor: string;
  reference_document: string;
  state: string;
  business_unit: string;
}
/*
*
*
* | Code       | Type                   | Vendor            | Reference Document                 | Business Unit | State     |
  | 2020000048 | Local Purchase Order   | 000002 - Zhejiang | --                                 | Signmedia     | Shipped   |
  | 2020000047 | Service Purchase Order | 000002 - Zhejiang | Local Purchase Order - 2018000017  | Signmedia     | Confirmed |
  | 2020000046 | Service Purchase Order | 000002 - Zhejiang | Import Purchase Order - 2018000023 | Offset        | Confirmed |
  | 2020000045 | Service Purchase Order | 000001 - Zhejiang | Import Purchase Order - 2018000001 | Signmedia     | Confirmed |
*/
// TODO: replace this with real data from your application
const EXAMPLE_DATA: ResultsAreaItem[] = [
  {code: '2020000048', type: 'Local Purchase Order'  ,vendor:'000002 - Zhejiang' ,
    reference_document:"--"                          , state:'Shipped',business_unit:'Signmedia'},
  {code: '2020000047', type: 'Service Purchase Order', vendor:'000002 - Zhejiang',
    reference_document:"Local Purchase Order - 2018000017", state: 'Confirmed',business_unit:'Signmedia'},
  {code: '2020000046', type: 'Service Purchase Order',vendor:'000002 - Zhejiang' ,
    reference_document:"Import Purchase Order - 2018000023", state: 'Confirmed',business_unit:'Offset'}
];

/**
 * Data source for the ResultsArea view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ResultsAreaDataSource extends DataSource<ResultsAreaItem> {
  data: ResultsAreaItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ResultsAreaItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ResultsAreaItem[]): ResultsAreaItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ResultsAreaItem[]): ResultsAreaItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'code': return compare(a.code, b.code, isAsc);
        case 'type': return compare(+a.type, +b.type, isAsc);
        case 'vendor': return compare(+a.vendor, +b.vendor, isAsc);
        case 'reference_document': return compare(+a.reference_document, +b.reference_document, isAsc);
        case 'state': return compare(+a.state, +b.state, isAsc);
        case 'business_unit': return compare(+a.business_unit, +b.business_unit, isAsc)

        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
