import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  usuario = new FormGroup({

    user: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),

    pass: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),

  });

  recuperapass() {
    this.router.navigate(['/recuperapass']);
  }

  navegahome() {

    let setData: NavigationExtras = {

      state: {

        user: this.usuario.value.user,

        id: this.usuario.value.pass

      }

    };
      this.router.navigate(['/home'], setData);





    
  }

}
