import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-recommendcheckslist-items',
  standalone: true,
  imports: [
      MatDialogModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatSnackBarModule,
      MatToolbarModule,
      MatCardModule,
      MatListModule,],
  templateUrl: './recommendcheckslist-items.component.html',
  styleUrl: './recommendcheckslist-items.component.css',
})
export class RecommendcheckslistItemsComponent {
  @Input() recommendedCheck: any;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  onEdit(): void {
    this.edit.emit(this.recommendedCheck);
  }

  onDelete(): void {
    this.delete.emit(this.recommendedCheck);
  }
}
