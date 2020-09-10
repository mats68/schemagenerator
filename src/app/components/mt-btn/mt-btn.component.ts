import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mt-btn',
  templateUrl: './mt-btn.component.html',
  styleUrls: ['./mt-btn.component.scss']
})
export class MtBtnComponent implements OnInit {
  @Input() comp: any;

  constructor() { }

  ngOnInit(): void {
  }

}
