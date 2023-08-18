import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styles: [],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.cookieService.check("loggedInUser");
  }

  onLogout(): void {
    this.cookieService.delete("loggedInUser", "/");
    this.isLoggedIn = false;
    this.router.navigate(["/login"]);
  }
}
