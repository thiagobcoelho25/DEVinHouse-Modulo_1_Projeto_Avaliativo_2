import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-menu-left-bar',
  templateUrl: './menu-left-bar.component.html',
  styleUrls: ['./menu-left-bar.component.scss']
})
export class MenuLeftBarComponent {

  show_nav_bar: boolean = true

  constructor(private login_service: LoginServiceService, private route: Router){

  }

  changeNavBarvisibility(){
    this.show_nav_bar = !this.show_nav_bar
  }


  logout(){
    this.login_service.logout()
    this.route.navigate(['login'])
  }
}
