import { Component, OnInit, Input } from '@angular/core';
import { IValueType, SchemaManager } from '../../base/schemaManager';
import { ComponentType, IComponent } from 'src/app/base/types';
import get from 'lodash.get';
import set from 'lodash.set';

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
    if (!child.field || !this.sm.DiffValues || child.type === ComponentType.datatable) return '';
    let val1, val2
    if (child.parentComp &&  child.parentComp.type === ComponentType.datatable) {
      const ind = child.parentComp.curRowInd;
      if (this.sm.checkValueType(ind) !== IValueType.number) return '';
      // todo const c1 = psm.getCompByField(child.field);
      // if (!c1 || !c1.comp || !c1.parent || !c1.parent.field) return '';
      // const arr1 = get(psm.Values,c1.parent.field);
      // const arr2 = get(psm.DiffValues, c1.parent.field);
      // if (!arr1 || !Array.isArray(arr1) || !arr2 || !Array.isArray(arr2) || ind >= arr1.length || ind >= arr2.length) return '';
      // val1 = this.sm.getValue(child, arr1[ind]);
      // val2 = this.sm.getValue(child, arr2[ind]);
      return '';
    } else {
      val1 = this.sm.getValue(child);
      val2 = this.sm.getValue(child, this.sm.DiffValues);
    }
    if (val1 !== val2) return ' highlight';
    return '';
  }


}
