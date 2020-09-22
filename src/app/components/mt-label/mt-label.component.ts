import { Component, Input } from '@angular/core';
import { SchemaManager } from '../../base/schemaManager';
import { IComponent } from 'src/app/base/types';

@Component({
  selector: 'mt-label',
  templateUrl: './mt-label.component.html',
  styleUrls: ['./mt-label.component.scss']
})
export class MtLabelComponent {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;

  constructor() {

  }


}
