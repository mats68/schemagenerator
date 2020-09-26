import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base/schemaManager';
import { MtBaseComponent } from 'src/app/base/mt-base/mt-base.component';

@Component({
  selector: 'mt-exp',
  templateUrl: './mt-exp.component.html',
  styleUrls: ['./mt-exp.component.scss']
})
export class MtExpComponent extends MtBaseComponent implements OnInit {

  ngOnInit(): void {
  }

  afterExpand() {
    if (!this.comp.expanded) this.comp.expanded = true;
  }

  afterCollapse() {
    if (this.comp.expanded) this.comp.expanded = false;
  }



}
