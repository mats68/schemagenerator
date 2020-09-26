import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';
import { MtBaseComponent } from 'src/app/base/mt-base/mt-base.component';

import { ISelectOptionItems } from 'src/app/base/types';

@Component({
  selector: 'mt-radio',
  templateUrl: './mt-radio.component.html',
  styleUrls: ['./mt-radio.component.scss']
})
export class MtRadioComponent extends MtBaseComponent implements OnInit, OnDestroy {
  @ViewChild('name') nameField: any;
  optionsAsObj: ISelectOptionItems;
  subscription: Subscription;

  ngOnInit(): void {
    this.optionsAsObj = this.sm.selectOptionsAsObjects(this.comp);

    this.subscription =  this.sm.getParentSM().OnFocus.subscribe({
      next: (comp) => {
        if (comp === this.comp) {
          if (this.nameField) this.nameField.nativeElement.focus();
         
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
}


}
