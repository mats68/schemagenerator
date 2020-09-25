import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base/schemaManager';
import { ComponentType, IComponent } from 'src/app/base/types';

@Component({
  selector: 'mt-container',
  templateUrl: './mt-container.component.html',
  styleUrls: ['./mt-container.component.scss']
})
export class MtContainerComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;
  usesGrid: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.usesGrid = this.sm.usesGrid(this.comp);
  }

  getHighlight(child: IComponent): string {
    if (!child.field || child.type === ComponentType.datatable) return '';
    if (!child.field) return '';
    let val1, val2
    if (this.sm.ParentSchemaManager) {
      const psm = this.sm.ParentSchemaManager;
      if (!psm.DiffValues) return '';
      const ind = this.sm.ArrayInd;
      if (isNaN(ind)) return '';
      const c1 = psm.getCompByField(child.field);
      if (!c1 || !c1.comp || !c1.parent || !c1.parent.field) return '';
      const arr1 = psm.Values[c1.parent.field];
      const arr2 = psm.DiffValues[c1.parent.field];
      if (!arr1 || !Array.isArray(arr1) || !arr2 || !Array.isArray(arr2) || ind >= arr1.length || ind >= arr2.length) return '';
      val1 = this.sm.getValue(child, arr1[ind]);
      val2 = this.sm.getValue(child, arr2[ind]);
      // val1 = arr1[ind][child.field];
      // val2 = arr2[ind][child.field];
    } else {
      if (!this.sm.DiffValues) return '';
      val1 = this.sm.getValue(child);
      val2 = this.sm.getValue(child, this.sm.DiffValues);
    }
    if (val1 !== val2) return ' highlight';
    return '';
  }


}
