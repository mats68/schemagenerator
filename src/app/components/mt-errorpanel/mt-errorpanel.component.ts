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
  @Input() ErrorCount: number;

  hidden: boolean;


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.hidden = (!this.Errors || this.Errors.length === 0)
  }

  clickError(error: IError) {
    this.sm.DoFocus(error.comp, error.arrayInd);
  }

  hidePanel() {
    this.hidden = true;
  }

getErrorLabel(error: IError): string {
    let lb = '';
    if (!error.comp) return lb;
    lb = this.sm.getLabel(error.comp);
    if (!lb) return '';
    const suff = error.arrayInd !== -1 ? ` ${this.sm.Strings.row} [${error.arrayInd+1}]` : '';
    return `${lb}${suff}`;
  }



}
