import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  email: string = "";
  password: string = "";

  onSubmit(form: NgForm) {
    if (form.invalid || form.value.email == "" || form.value.password == "") {
      return;
    } else {
      const user = {
        email: form.value.email,
        password: form.value.password,
      };
      this.http
        .post("http://localhost:3000/api/user/login", user)
        .subscribe((response: any) => {
          console.log(response);
          if (response.message === "Login successful") {
            const uid = response.user;
            this.cookieService.set("loggedInUser", uid, 7);

            // refresh the page
            window.location.href = "/";
          }
        });
    }
  }
}
