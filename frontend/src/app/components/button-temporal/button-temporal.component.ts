import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-button-temporal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './button-temporal.component.html',
  styleUrl: './button-temporal.component.css'
})
export class ButtonTemporalComponent {
  @Input() text: string = '';
  @Input() routerLink: string = '';
}
