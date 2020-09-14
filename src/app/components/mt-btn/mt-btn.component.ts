import { Component, OnInit, Input } from '@angular/core';
import {SchemaService} from '../../schema.service';


@Component({
  selector: 'mt-btn',
  templateUrl: './mt-btn.component.html',
  styleUrls: ['./mt-btn.component.scss']
})
export class MtBtnComponent implements OnInit {
  @Input() comp: any;

  constructor(public srv: SchemaService) {
  }

  ngOnInit(): void {
  }

  onClick() {
    if (this.comp.onClick) {
      this.comp.onClick(this.srv);
    }
  }

}
