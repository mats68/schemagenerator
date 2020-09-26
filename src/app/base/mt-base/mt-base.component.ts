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
  
  label() {
    return this.sm.getLabel(this.comp);
  }

  type(): string {
    return this.comp.type || 'button';
  }

  style(): string {
    return this.sm.getStyle(this.comp);
  }

  color() {
    return this.comp.color;
  }

  disabled(): boolean {
    return this.sm.getPropValue(this.comp, 'disabled');
  }

  tooltip() {
    return this.sm.getPropValue(this.comp, 'tooltip');
  }

}
