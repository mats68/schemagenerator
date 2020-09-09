import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mt-form',
  templateUrl: './mt-form.component.html',
  styleUrls: ['./mt-form.component.scss']
})
export class MtFormComponent implements OnInit {
  @Input() comp: any;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.comp);
  }

}
