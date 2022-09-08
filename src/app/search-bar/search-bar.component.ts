import { Component, OnInit } from '@angular/core';
import {SearchService} from "../Service/search.service";
import {NgForm} from "@angular/forms";
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private service : SearchService) {
  }



  ngOnInit(): void {

  }

  public submit(form : NgForm){
    console.log(form.value.search);
    this.service.search(form.value.search);
  }



}
