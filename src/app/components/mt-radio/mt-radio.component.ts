import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';

import { SchemaManager } from '../../base/schemaManager';
import { IComponent, ISelectOptionItems } from 'src/app/base/types';

@Component({
  selector: 'mt-radio',
  templateUrl: './mt-radio.component.html',
  styleUrls: ['./mt-radio.component.scss']
})
export class MtRadioComponent implements OnInit {
  @ViewChild('name') nameField: any;
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;
  optionsAsObj: ISelectOptionItems;
  subscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.optionsAsObj = this.sm.selectOptionsAsObjects(this.comp);

    this.subscription =  this.sm.getParentSM().OnFocus.subscribe({
      next: (comp) => {
        if (comp === this.comp) {
          if (this.nameField) this.nameField.focus();
         
        }
      }
    });
  }

  get Value(): any {
    return this.sm.getValue(this.comp);
  }

  set Value(val: any) {
    this.sm.updateValue(this.comp, val);
  }


}
