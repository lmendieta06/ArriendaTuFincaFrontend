import { Component } from '@angular/core';
import { ButtonTemporalComponent } from '../../components/button-temporal/button-temporal.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-temporal',
  standalone: true,
  imports: [ButtonTemporalComponent],
  templateUrl: './temporal.component.html',
  styleUrl: './temporal.component.css'
})
export class TemporalComponent {
  constructor(private router: Router) {}
}
