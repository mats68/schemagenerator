import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mt-input',
  templateUrl: './mt-input.component.html',
  styleUrls: ['./mt-input.component.scss']
})
export class MtInputComponent implements OnInit {
  @Input() comp: any;

  constructor() { }

  ngOnInit(): void {
  }

}
