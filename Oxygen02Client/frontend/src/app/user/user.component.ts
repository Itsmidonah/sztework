import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: any[] = [];
  newUser: any = {};
  updatedUser: any = {};
  selectedUser: any = {};

  constructor(private http: HttpClient, 
    private authService: AuthService,
    private userService: UserService) { }


  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any[]>('/app/users').subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  addUser() {
    this.http.post('/app/users', this.newUser).subscribe(
      (response) => {
        this.newUser = {};
        this.fetchUsers();
      },
      (error) => {
        console.error('Error adding user:', error);
      }
    );
  }

  updateUser() {
    this.http.patch(`/app/users/${this.selectedUser._id}`, this.updateUser).subscribe(
      (response) => {
        this.updatedUser = {};
        this.fetchUsers();
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  deleteUser(userId: string) {
    this.http.delete(`/app/users/${userId}`).subscribe(
      (response) => {
        this.fetchUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  selectUser(user: any) {
    this.selectedUser = user;
  }
}