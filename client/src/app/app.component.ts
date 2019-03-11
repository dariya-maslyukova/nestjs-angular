import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  private destroyedSubject = new Subject<any>();

  constructor(
    private ar: ActivatedRoute,
    private r: Router,
  ) {

  }

  ngOnInit(): void {
    // console.log(this.ar)
    // this.ar.url.subscribe((url) => console.log(url));
  }
}
