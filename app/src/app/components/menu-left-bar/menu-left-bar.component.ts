import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-left-bar',
  templateUrl: './menu-left-bar.component.html',
  styleUrls: ['./menu-left-bar.component.css']
})
export class MenuLeftBarComponent {


  show_nav_bar: boolean = true


  changeNavBarvisibility(){
    this.show_nav_bar = !this.show_nav_bar
  }
}
