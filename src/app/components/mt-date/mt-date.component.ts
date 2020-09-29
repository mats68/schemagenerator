import { Component, OnInit, OnDestroy  } from '@angular/core';
import { MtBaseComponent } from 'src/app/base/mt-base/mt-base.component';

import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as moment from 'moment';
import { analyzeAndValidateNgModules } from '@angular/compiler';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'mt-date',
  templateUrl: './mt-date.component.html',
  styleUrls: ['./mt-date.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_LOCALE, useValue: 'de-ch'},


    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class MtDateComponent extends MtBaseComponent implements OnInit, OnDestroy {
  date: any;

  constructor(private dateAdapter: DateAdapter<Date>) {
    super();
    this.dateAdapter.setLocale('de-ch');   
   }

  ngOnInit(): void {
    this.date = new FormControl(moment());
    this.registerFocus();
  }

  ngOnDestroy() {
    this.unregisterFocus();
  }


}
