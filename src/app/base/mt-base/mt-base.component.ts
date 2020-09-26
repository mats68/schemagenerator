import { Component, Input  } from '@angular/core';

import { SchemaManager } from '../../base/schemaManager';
import { IComponent } from 'src/app/base/types';

@Component({
  selector: 'mt-base',
  template: ''
})
export class MtBaseComponent {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;
  
  get label() {
    return this.sm.getLabel(this.comp);
  }

  get type(): string {
    return this.comp.type || 'button';
  }

  get style(): string {
    return this.sm.getStyle(this.comp);
  }

  get color() {
    return this.comp.color;
  }

  get disabled(): boolean {
    return this.sm.getPropValue(this.comp, 'disabled');
  }

  get tooltip() {
    return this.sm.getPropValue(this.comp, 'tooltip');
  }

}
