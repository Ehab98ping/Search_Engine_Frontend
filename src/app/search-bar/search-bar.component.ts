import { Component, OnInit } from '@angular/core';
import {SearchService} from "../search.service";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  serviceList;

  constructor(service: SearchService,private formBuilder: FormBuilder) {
    this.serviceList = service.getList();
  }

  searchForm = this.formBuilder.group({
    searchInput: ''
  });
  ngOnInit(): void {

  }

  public submit(){
    console.log(this.searchForm.value)
  }

}
