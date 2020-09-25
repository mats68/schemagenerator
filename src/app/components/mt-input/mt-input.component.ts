import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';

import { SchemaManager } from '../../base/schemaManager';
import { IComponent, IMaskOptions, ISelectOptionItems } from 'src/app/base/types';


@Component({
  selector: 'mt-input',
  templateUrl: './mt-input.component.html',
  styleUrls: ['./mt-input.component.scss']
})
export class MtInputComponent implements OnInit, OnDestroy  {
  @ViewChild("name") nameField: ElementRef;
  @ViewChild('namesel') nameselField: any;
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;
  @Input() isSelect: boolean;

  options: string[];
  optionsAsObj: ISelectOptionItems;
  filteredOptions: string[];
  maskOptions: IMaskOptions;
  subscription: Subscription;

  constructor() {  }

  ngOnInit(): void {
    if (this.isSelect) {
      this.optionsAsObj = this.sm.selectOptionsAsObjects(this.comp);
    } else if (this.comp.options) {
      this.options = this.comp.options as string[];
    }
    this.filteredOptions = this.options;
    this.maskOptions = this.comp.maskOptions || {};
    if (!this.comp.mask) this.maskOptions = {};
    this.subscription =  this.sm.getParentSM().OnFocus.subscribe({
      next: (comp) => {
        if (comp === this.comp) {
          if (this.nameField) this.nameField.nativeElement.focus();
          if (this.nameselField) this.nameselField.focus();
          
        }
      }
    });
  }

  get Value(): string {
    return this.sm.getValue(this.comp);
  }

  set Value(val: string) {
    this.sm.updateValue(this.comp, val);
  }

  getError() {
    return this.sm.getError(this.comp);
  }

  Filter(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  onBlur(): void {
    const value = this.sm.getValue(this.comp);
    this.sm.validate(this.comp, value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
}




}
