import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
/* Creamos una array que contendrá las imagenes, luego el carousel solo itinerará una a una*/
    images=[
        'assets/img/croissant.png',
        'assets/img/jamon.png',
        'assets/img/naranja.png',
        'assets/img/nutella.png',
        'assets/img/platano.png',
        'assets/img/chapata.png'


    ];
}
