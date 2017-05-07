import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class AppNavComponent {
  @Input() isTransparent: boolean;

  constructor(){}

  getStyle(){
    if(this.isTransparent){
      return "rgba(3, 3, 3, 0.5)";
    }
  }
}
