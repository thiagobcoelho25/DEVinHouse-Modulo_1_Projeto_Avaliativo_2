import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-search-bar',
  templateUrl: './filter-search-bar.component.html',
  styleUrls: ['./filter-search-bar.component.scss']
})
export class FilterSearchBarComponent {

  @Output()
  search_term = new EventEmitter<string>();

  sendSearchTermToParentComponent(term: string){
      this.search_term.emit(term);
  }

}
