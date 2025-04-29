import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-farm-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './farm-card.component.html',
  styleUrls: ['./farm-card.component.scss']
})
export class FarmCardComponent implements OnInit{
  @Input() farmName: string = '';
  @Input() description: string = '';
  @Input() status: boolean = true;
  @Input() image: string = '';

  disponible:string="";

  ngOnInit(){
    if(this.status === true){
      this.disponible = 'Disponible';
    }else{
      this.disponible = 'Ocupada';
    }
  }
}