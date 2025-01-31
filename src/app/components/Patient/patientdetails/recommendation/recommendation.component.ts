import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Patient } from '../../../../model/Patient';


@Component({
  selector: 'app-recommendation',
  imports: [CommonModule,FormsModule],
  standalone:true,
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.css'
})
export class RecommendationComponent {
  @Input() patient!: Patient;
  recommendations = [
    { text: 'Take daily medication', checked: false },
    { text: 'Visit a specialist', checked: false },
    { text: 'Maintain a healthy diet', checked: false },
    ];

    saveRecommendations() {
      console.log('Saving recommendations:', this.recommendations);
    }
}
