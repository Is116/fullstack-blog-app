import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { HomeComponent } from "./home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DonateComponent } from "./donate/donate.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from '@angular/material/dialog'
import { HeroSectionComponent } from "../components/hero-section/hero-section.component";
import { LatestArticlesSectionComponent } from "../components/latest-articles-section/latest-articles-section.component";
import { BannerStudiesSectionComponent } from "../components/banner-studies-section/banner-studies-section.component";
import { CaseStudiesSectionComponent } from "../components/case-studies-section/case-studies-section.component";
import { ContactComponent } from "./contact/contact.component";
import { AuthModule } from "./auth/auth.module";
import { EditUserComponent } from "src/app/pages/admin/users/modals/edit-user/edit-user.component";

const routes = [
  { path: "", component: HomeComponent },
  { path: "donate", component: DonateComponent },
  { path: "contact", component: ContactComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    DonateComponent,
    HeroSectionComponent,
    LatestArticlesSectionComponent,
    BannerStudiesSectionComponent,
    CaseStudiesSectionComponent,
    ContactComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AuthModule,
    FormsModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  exports: [HomeComponent, DonateComponent, ContactComponent, AuthModule, EditUserComponent],
  providers: [],
})
export class PagesModule {}
