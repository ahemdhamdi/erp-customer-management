import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, RouterOutlet,ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'customer_management';
}
