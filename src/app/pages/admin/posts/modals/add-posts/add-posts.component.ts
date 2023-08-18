import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-add-posts",
  templateUrl: "./add-posts.component.html",
})
export class AddPostsComponent {
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddPostsComponent>
  ) {}

  title = "";
  description = "";
  category = "";
  postImage: File | undefined;
  image = "";
  author = "";

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(formData: any) {
    const loggedInUserId = this.getLoggedInUserId();
    const postData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      image: this.image,
      author: loggedInUserId,
    };

      this.http
        .post("http://localhost:3000/api/post/add", postData)
        .subscribe((response: any) => {
          console.log("Post added successfully:", response);
          this.dialogRef.close();
        });
  }

  handleImageUpload(event: any) {
    const imageFile = event.target.files[0] as File;

    if (imageFile) {
      if (imageFile.size <= 10485760) {
        this.uploadImage(imageFile).subscribe((response: any) => {
          const imageUrl = response.imageUrl;
          console.log("Uploaded image URL:", imageUrl);
          this.image = imageUrl;
        });
      } else {
        alert("Image size must be less than 10MB");
      }
    }
  }

  uploadImage(imageFile: File) {
    const formData = new FormData();
    formData.append("postImage", imageFile);

    return this.http.post("http://localhost:3000/api/upload", formData);
  }

  getLoggedInUserId(): string {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("loggedInUser="));

    if (cookie) {
      return cookie.split("=")[1];
    }

    return "";
  }
}
