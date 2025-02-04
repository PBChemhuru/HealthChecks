import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { Users } from '../../../model/Users';
import { UserService } from '../../../services/user.service';
import { AdduserdialogComponent } from '../adduserdialog/adduserdialog.component';
import { EdituserdialogComponent } from '../edituserdialog/edituserdialog.component';
import { DeleteuserdialogComponent } from '../deleteuserdialog/deleteuserdialog.component';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-userlist',
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
    MatListModule,
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css',
})
export class UserlistComponent implements OnInit {
  users = new MatTableDataSource<any>([]);
  displayColumns: string[] = [
    'username',
    'email',
    'role',
    'firstname',
    'surname',
    'actions',
  ];
  searchKey: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userservice: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.users.paginator = this.paginator;
  }

  getUsers() {
    this.userservice.getUsers().subscribe({
      next: (data) => {
        this.users.data = data;
      },
      error: (error) => {
        this.snackBar.open('Failed to load recommended checks', 'Close', {
          duration: 3000,
        });
        console.error('error getting user', error);
      },
    });
  }

  addUser(newUser: Users): void {
    newUser.username = newUser.surname.toLowerCase()+ newUser.firstname.toLowerCase();
    if(newUser.role != "Patient" )
    {
      newUser.patientId = 0;
    }
    console.log(newUser);
    this.userservice.createUser(newUser).subscribe({
      next: (data) => {
        const message = `User Created: ${newUser.username}`;
        this.getUsers();
        this.snackBar.open(message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        console.error('Error creating user', error);
        this.snackBar.open('Error creating user', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AdduserdialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addUser(result);
      }
    });
  }

  updateUsers(updatedUser: Users): void {
      updatedUser.username = updatedUser.surname.toLowerCase()+ updatedUser.firstname.toLowerCase();
    console.log(updatedUser);
    this.userservice.updateUser(updatedUser.id, updatedUser).subscribe({
      next: (response) => {
        this.getUsers();
        const message = `User Created: ${updatedUser.username}`;
        this.snackBar.open('User Created', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        console.log('check updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updatin user', error);
        this.snackBar.open('Error creating user', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }

  openEditDialog(item: any): void {
    const dialogRef = this.dialog.open(EdituserdialogComponent, {
      width: '500px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateUsers(result);
      }
    });
  }

  deleteUser(user: any): void {
    console.log(user);
    this.userservice.deleteUser(user).subscribe({
      next: (response) => {
        this.getUsers();
        console.log('User deleted successfully:', response);
      },
      error: (error) => {
        console.log('errror while delete user');
      },
    });
  }

  openDeleteDialog(item: any) {
    const dialogRef = this.dialog.open(DeleteuserdialogComponent, {
      width: '500px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(item.id);
      }
    });
  }

  applySearchFilter(event: Event):void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchKey = filterValue.trim().toLowerCase();
    this.users.filter = this.searchKey;
  }
}
