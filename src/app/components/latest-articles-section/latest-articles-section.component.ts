import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

@Component({
  selector: "app-latest-articles-section",
  templateUrl: "./latest-articles-section.component.html",
  styles: [],
})
export class LatestArticlesSectionComponent implements OnInit {
  blogItems: BlogPost[] = [];
  email: string = "";
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLatestPosts();
  }

  fetchLatestPosts(): void {
    const apiUrl = "http://localhost:3000/api/posts?perPage=3";

    this.http.get<{ posts: BlogPost[]; total: number }>(apiUrl).subscribe(
      (response) => {
        this.blogItems = response.posts.map((post) => {
          return {
            _id: post._id,
            title: post.title,
            description: post.description.trim().slice(0, 100) + "...",
            image: post.image,
            link: `/post/${post._id}`, // Update this with your actual routing logic
          };
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  subscribeToNewsletter(): void {
    if (!this.email) {
      this.errorMessage = "Email cannot be empty";
      return;
    }

    const apiUrl = `http://localhost:3000/api/subscribe/${this.email}`;

    this.http.get<{ message: string }>(apiUrl).subscribe(
      (response) => {
        this.successMessage = response.message;
        this.errorMessage = null;
        this.email = ""; 
      },
      (error) => {
        this.errorMessage = "Something went wrong or you are already subscribed";
        this.successMessage = null;
      }
    );
  }
}
