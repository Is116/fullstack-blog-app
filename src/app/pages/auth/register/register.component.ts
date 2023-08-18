import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent {
  constructor(private http: HttpClient) {}

  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  terms: boolean = false;

  onSubmit(form: NgForm) {
    if (
      form.invalid ||
      form.value.firstName == "" ||
      form.value.lastName == "" ||
      form.value.email == "" ||
      form.value.password == "" ||
      form.value.terms == false
    ) {
      return;
    } else {
      const user = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        password: form.value.password,
      };
      this.http
        .post("http://localhost:3000/api/user/register", user)
        .subscribe((response) => {
          console.log(response);
        });
    }
  }
}
