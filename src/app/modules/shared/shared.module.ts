import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AdminSidebarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatIconModule,
    MatToolbarModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    AdminSidebarComponent
  ]
})
export class SharedModule { }
