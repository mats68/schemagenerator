import { Component, Input, ViewChild  } from '@angular/core';
import { Subscription } from 'rxjs';

import { SchemaManager } from '../../base/schemaManager';
import { IComponent, ISelectOptionItems } from 'src/app/base/types';

@Component({
  selector: 'mt-base',
  template: ''
})
export class MtBaseComponent {
  @ViewChild('name') nameField: any;
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;
  _OptionsAsStrings: string[];
  _OptionsAsObjects: ISelectOptionItems;
  subscription: Subscription;

  
  get Value(): any {
    return this.sm.getValue(this.comp);
  }

  set Value(val: any) {
    this.sm.updateValue(this.comp, val);
  }

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

  get placeholder(): boolean {
    return this.sm.getPropValue(this.comp, 'placeholder');
  }

  get tooltip() {
    return this.sm.getPropValue(this.comp, 'tooltip');
  }

  get hint() {
    return this.sm.getPropValue(this.comp, 'hint');
  }

  onBlur(): void {
    const value = this.sm.getValue(this.comp);
    this.sm.validate(this.comp, value);
  }

  getError() {
    return this.sm.getError(this.comp);
  }

  get OptionsAsObjects(): ISelectOptionItems {
    if (!this._OptionsAsObjects) {
      this._OptionsAsObjects = this.sm.selectOptionsAsObjects(this.comp);
    }
    return this._OptionsAsObjects;
  }

  get OptionsAsStrings(): string[] {
    if (!this._OptionsAsStrings) {
      this._OptionsAsStrings = this.sm.selectOptionsAsStrings(this.comp);
    }
    return this._OptionsAsStrings;
  }

  registerFocus() {
    this.subscription =  this.sm.getParentSM().OnFocus.subscribe({
      next: (comp) => {
        if (comp === this.comp && this.nameField) {
          if (this.nameField.nativeElement && this.nameField.nativeElement.focus) {
            this.nameField.nativeElement.focus();
          } else if (this.nameField.focus) {
            this.nameField.focus();
          }
        }
      }
    });
  }

  unregisterFocus() {
    this.subscription.unsubscribe();
  }


}
