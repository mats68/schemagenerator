import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';

import { SchemaManager } from '../../base/schemaManager';
import { IComponent } from 'src/app/base/types';

@Component({
  selector: 'mt-radio',
  templateUrl: './mt-radio.component.html',
  styleUrls: ['./mt-radio.component.scss']
})
export class MtRadioComponent implements OnInit {
  @ViewChild('name') nameField: any;
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;
  subscription: Subscription;

  constructor() { }

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
