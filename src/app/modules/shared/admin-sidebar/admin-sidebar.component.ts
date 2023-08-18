import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styles: [
  ]
})
export class AdminSidebarComponent {
  sidebarItems = [
    {
      icon: 'fa-grip',
      text: 'Dashboard',
      link: '/admin'
    },
    {
      icon: 'fa-file',
      text: 'Posts',
      link: '/admin/posts'
    },
    {
      icon: 'fa-hand-holding-dollar',
      text: 'Donations',
      link: '/admin/donations'
    },
    {
      icon: 'fa-users',
      text: 'Users',
      link: '/admin/users'
    }
  ];
}
