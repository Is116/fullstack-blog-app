import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddPostsComponent } from "src/app/pages/admin/posts/modals/add-posts/add-posts.component";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styles: [],
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  currentPage = 1;
  perPage = 8;
  totalPages = 0;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  searchText = "";
  filteredPosts: any[] = [];

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http
      .get<{ posts: any[]; total: number }>(
        `http://localhost:3000/api/posts?page=${this.currentPage}&perPage=${this.perPage}`
      )
      .subscribe(async (data) => {
        this.posts = data.posts;
        this.totalPages = Math.ceil(data.total / this.perPage);

        for (const post of this.posts) {
          try {
            const authorData = await this.http
              .get(`http://localhost:3000/api/user/${post.author}`)
              .subscribe((data: any) => {
                if (
                  data &&
                  data.firstName &&
                  data.lastName &&
                  data.firstName !== "" &&
                  data.lastName !== ""
                ) {
                  post.authorName = data.firstName + " " + data.lastName;
                } else {
                  post.authorName = "Unknown";
                }
              });
          } catch (err) {
            console.error(err);
            post.authorName = "Unknown";
          }
        }
        this.performSearch(); // Initialize filteredPosts
      });
  }

  // Function to navigate to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchPosts();
    }
  }

  // Function to navigate to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchPosts();
    }
  }

  performSearch() {
    if (this.searchText) {
      console.log("Searching for ", this.searchText);
      this.filteredPosts = this.posts.filter((post) =>
        this.matchSearchText(post)
      );
    } else {
      this.filteredPosts = this.posts;
    }
  }

  matchSearchText(post: any): boolean {
    const lowerCaseSearch = this.searchText.toLowerCase();
    return (
      post.title.toLowerCase().includes(lowerCaseSearch) ||
      post.authorName.toLowerCase().includes(lowerCaseSearch)
    );
  }

  openAddPostModal(): void {
    const dialogRef = this.dialog.open(AddPostsComponent, {
      width: "400px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The add post dialog was closed");
      this.fetchPosts();
    });
  }

  deletePost(postId: string): void {
    if (confirm("Are you sure you want to delete this post?")) {
      this.http
        .delete(`http://localhost:3000/api/post/${postId}`)
        .subscribe(() => {
          console.log("The post was deleted");
          this.fetchPosts();
        });
    }
  }
}
