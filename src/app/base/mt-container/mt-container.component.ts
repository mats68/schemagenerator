import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base/schemaManager';
import { IComponent } from 'src/app/base/types';
import { CheckboxRequiredValidator } from '@angular/forms';

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
    if (!this.sm.DiffValues) return '';
    if (!child.field) return '';
    const val1 = this.sm.Values[child.field];
    const val2 = this.sm.DiffValues[child.field];
    if (val1 !== val2) return ' highlight';
    return '';


  }


}
