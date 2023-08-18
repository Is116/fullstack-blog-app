import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

import { AppComponent } from "./app.component";
import { SharedModule } from "./modules/shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PostSingleComponent } from "./modules/shared/post-single/post-single.component";
import { DashboardComponent } from "./pages/admin/dashboard/dashboard.component";
import { PostsComponent } from "./pages/admin/posts/posts.component";
import { CategoriesComponent } from "./pages/admin/categories/categories.component";
import { DonationsComponent } from "./pages/admin/donations/donations.component";
import { UsersComponent } from "./pages/admin/users/users.component";
import { PagesModule } from "./pages/pages.module";
import { AddPostsComponent } from "./pages/admin/posts/modals/add-posts/add-posts.component";
import { AuthGuard } from "./auth-guard.service";

const routes = [
  { path: "", component: PagesModule },
  { path: "post/:postId", component: PostSingleComponent },
  { path: "admin", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "admin/posts", component: PostsComponent, canActivate: [AuthGuard] },
  {
    path: "admin/categories",
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin/donations",
    component: DonationsComponent,
    canActivate: [AuthGuard],
  },
  { path: "admin/users", component: UsersComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    PostSingleComponent,
    DashboardComponent,
    PostsComponent,
    CategoriesComponent,
    DonationsComponent,
    UsersComponent,
    AddPostsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    PagesModule,
  ],
  providers: [CookieService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
