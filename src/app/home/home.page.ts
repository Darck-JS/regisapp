import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AlertButton } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private activerouter: ActivatedRoute, private router: Router) {
    this.activerouter.queryParams.subscribe(params => {
      var user = this.router.getCurrentNavigation()?.extras.state?.['user'];
      var pass = this.router.getCurrentNavigation()?.extras.state?.['id'];
      console.log(user);
      console.log(pass);

      if (user == "") {
        console.log("usuario en blanco");
        
      }

    });
  }

  navega() {
    this.router.navigate(['/login']);
  }

  alertButtons = ['Action'];
}
