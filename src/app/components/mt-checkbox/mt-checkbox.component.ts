import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';
import { MtBaseComponent } from 'src/app/base/mt-base/mt-base.component';

@Component({
  selector: 'mt-checkbox',
  templateUrl: './mt-checkbox.component.html',
  styleUrls: ['./mt-checkbox.component.scss']
})
export class MtCheckboxComponent extends MtBaseComponent implements OnInit {
  @ViewChild('name') nameField: any;
  subscription: Subscription;

  get Value(): boolean {
    return this.sm.getValue(this.comp);
  }

  set Value(val: boolean) {
    this.sm.updateValue(this.comp, val);
  }

  ngOnInit(): void {
    this.subscription =  this.sm.getParentSM().OnFocus.subscribe({
      next: (comp) => {
        if (comp === this.comp) {
          if (this.nameField) this.nameField.focus();
         
        }
      }
    });
  }


}
