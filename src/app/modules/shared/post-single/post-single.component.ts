import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

interface PostData {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  author: string;
  createdAt: string;
}

@Component({
  selector: "app-post-single",
  templateUrl: "./post-single.component.html",
  styles: [],
})
export class PostSingleComponent implements OnInit {
  postId!: string;
  postData: PostData | null = null;
  backgroundImageStyle: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = params["postId"];
      this.fetchPostData();
    });
  }

  fetchPostData(): void {
    const apiUrl = `http://localhost:3000/api/post/${this.postId}`;

    this.http.get<PostData>(apiUrl).subscribe(
      (response) => {
        this.postData = response;
        try {
          this.http
            .get(`http://localhost:3000/api/user/${this.postData.author}`)
            .subscribe((data: any) => {
              if (
                data &&
                data.firstName &&
                data.lastName &&
                data.firstName !== "" &&
                data.lastName !== ""
              ) {
                this.postData!.author = data.firstName + " " + data.lastName;
              } else {
                this.postData!.author = "Unknown";
              }
            });
        } catch (err) {
          console.error(err);
          this.postData!.author = "Unknown";
        }
        this.backgroundImageStyle = {
          "background-image": `url(${this.postData?.image || ""})`,
          "background-size": "cover",
          "background-position": "center",
        };
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
