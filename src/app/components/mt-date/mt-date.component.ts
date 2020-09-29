import { Component, OnInit, OnChanges, OnDestroy  } from '@angular/core';
import { MtBaseComponent } from 'src/app/base/mt-base/mt-base.component';

import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
  },
};

@Component({
  selector: 'mt-date',
  templateUrl: './mt-date.component.html',
  styleUrls: ['./mt-date.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_LOCALE, useValue: 'de'},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class MtDateComponent extends MtBaseComponent implements OnInit, OnChanges, OnDestroy {
  date: FormControl;

  constructor(private dateAdapter: DateAdapter<Date>) {
    super();
   }

  ngOnInit(): void {
    this.date = new FormControl(moment());
    this.registerFocus();
  }

  ngOnChanges() {
    this.dateAdapter.setLocale(this.sm.Language);   
  }

  ngOnDestroy() {
    this.unregisterFocus();
  }


}
