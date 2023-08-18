import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.model";
import { MatDialog } from "@angular/material/dialog";
import { EditUserComponent } from "./modals/edit-user/edit-user.component";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styles: [],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  currentPage = 1;
  perPage = 8;
  totalPages = 0;
  searchText = "";
  filteredUsers: User[] = [];

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http
      .get<{ users: User[]; total: number }>(
        `http://localhost:3000/api/users?page=${this.currentPage}&perPage=${this.perPage}`
      )
      .subscribe((data) => {
        this.users = data.users;
        this.totalPages = Math.ceil(data.total / this.perPage);
        this.performSearch(); // Apply initial search on fetched data
      });
  }

  // Function to navigate to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchUsers();
    }
  }

  // Function to navigate to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchUsers();
    }
  }

  // Perform search and filter users based on searchText
  performSearch() {
    if (this.searchText) {
      this.filteredUsers = this.users.filter((user) =>
        this.matchSearchText(user)
      );
    } else {
      this.filteredUsers = this.users;
    }
  }

  // Check if user matches the search text
  matchSearchText(user: User): boolean {
    const lowerCaseSearch = this.searchText.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(lowerCaseSearch) ||
      user.lastName.toLowerCase().includes(lowerCaseSearch) ||
      user.email.toLowerCase().includes(lowerCaseSearch)
    );
  }

  openEditModal(user: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: "400px",
      data: {
        user: user,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      if (result) {
        this.fetchUsers();
      }
    });
  }

  deleteUser(userId: string): void {
    if (confirm("Are you sure you want to delete this user?")) {
      this.http.delete(`http://localhost:3000/api/user/${userId}`).subscribe(() => {
        console.log("User deleted successfully");
        this.fetchUsers(); // Refresh the user list after deletion
      });
    }
  }
}
