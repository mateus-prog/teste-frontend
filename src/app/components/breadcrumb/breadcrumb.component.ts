import { Component, OnInit, Input } from '@angular/core';

@Component({ selector: 'breadcrumb', templateUrl: './breadcrumb.component.html' })
export class BreadcrumbComponent implements OnInit {

  @Input() action: string = '';
  @Input() module: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
