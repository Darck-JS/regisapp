import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recuperapass',
  templateUrl: './recuperapass.page.html',
  styleUrls: ['./recuperapass.page.scss'],
})
export class RecuperapassPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navega(){
    this.router.navigate(['/login']);
  }

}
