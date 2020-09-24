import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { SchemaManager, IError } from '../../base/schemaManager';
import { IComponent } from 'src/app/base/types';

@Component({
  selector: 'mt-errorpanel',
  templateUrl: './mt-errorpanel.component.html',
  styleUrls: ['./mt-errorpanel.component.scss']
})
export class MtErrorpanelComponent implements OnInit, OnChanges {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;
  @Input() Errors: IError[];
  Hidden: boolean;


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.Hidden = (!this.Errors || this.Errors.length === 0)
  }

  clickError(comp: IComponent) {
    this.sm.DoFocus(comp);
  }

  hidePanel() {
    this.Hidden = true;

  }


}
