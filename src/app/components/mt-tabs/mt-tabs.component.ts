import { Component, OnInit, Input } from '@angular/core';

import { SchemaManager } from '../../base/schemaManager';
import { IComponent } from 'src/app/base/types';

@Component({
  selector: 'mt-tabs',
  templateUrl: './mt-tabs.component.html',
  styleUrls: ['./mt-tabs.component.scss']
})
export class MtTabsComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;

  constructor() { }

  ngOnInit(): void {
  }

  selectedIndexChange(num: number) {
    if (this.comp.selectedTabIndex !== num) this.comp.selectedTabIndex = num;
  }

}
