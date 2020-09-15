import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base-components/schemaManager';


@Component({
  selector: 'mt-btn',
  templateUrl: './mt-btn.component.html',
  styleUrls: ['./mt-btn.component.scss']
})
export class MtBtnComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick() {
    if (this.comp.onClick) {
      this.comp.onClick(this.sm);
    }
  }

}
