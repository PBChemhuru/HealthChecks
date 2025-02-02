import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-patient-dialog',
  imports: [],
  templateUrl: './delete-patient-dialog.component.html',
  styleUrl: './delete-patient-dialog.component.css'
})
export class DeletePatientDialogComponent {
  constructor(private dialogRef:MatDialogRef<DeletePatientDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:any){
      }
    
      closeDialog():void{
        this.dialogRef.close();
      }
    
      confirmDialog():void {
        this.dialogRef.close(true);
      }
}
