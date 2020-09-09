import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mt-container',
  templateUrl: './mt-container.component.html',
  styleUrls: ['./mt-container.component.scss']
})
export class MtContainerComponent implements OnInit {
  @Input() comps: any;

  constructor() { }

  ngOnInit(): void {
  }

}
