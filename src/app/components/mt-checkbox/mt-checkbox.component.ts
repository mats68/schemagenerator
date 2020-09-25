import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';

import { SchemaManager } from '../../base/schemaManager';
import { IComponent } from 'src/app/base/types';

@Component({
  selector: 'mt-checkbox',
  templateUrl: './mt-checkbox.component.html',
  styleUrls: ['./mt-checkbox.component.scss']
})
export class MtCheckboxComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;

  get Value(): boolean {
    return this.sm.getValue(this.comp);
  }

  set Value(val: boolean) {
    this.sm.updateValue(this.comp, val);
  }

  constructor() { }

  ngOnInit(): void {
  }


}
