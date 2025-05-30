import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { ActivatedRoute } from '@angular/router';
>>>>>>> origin

@Component({
  selector: 'app-pago-arriendo',
  standalone: true,
  imports: [],
  templateUrl: './pago-arriendo.component.html',
  styleUrl: './pago-arriendo.component.css'
})
export class PagoArriendoComponent {

<<<<<<< HEAD
=======
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', id);
  }


>>>>>>> origin
}
