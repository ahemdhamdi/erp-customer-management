import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, 
    InputTextModule, 
    IconFieldModule, 
    InputIconModule, 
    BadgeModule, 
    AvatarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  userName = 'Khaled!';
  selectedLang = 'en';
}
