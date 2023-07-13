import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  public active :boolean = false;
  public loggedIn: boolean = false;
  public userName: string = "";
  constructor() {}
  ngOnInit():void{}

  setActive() : void{
    this.active = !this.active
  }
  login(): void {
    this.loggedIn = true;
    this.userName = 'Nombre de usuario';
  }

  logout(): void {
    this.loggedIn = false;
    this.userName = "";
  }
}
