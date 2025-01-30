import { CommonModule } from '@angular/common';
import { Component,Output,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-search',
  imports: [CommonModule,FormsModule],
  standalone:true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() search:EventEmitter<string> = new EventEmitter();
  searchTerm:string = "";

  onSearch()
  {
    this.search.emit(this.searchTerm);
  }

}
