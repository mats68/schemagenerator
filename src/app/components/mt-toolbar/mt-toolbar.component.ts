import { Component, OnInit, Input } from '@angular/core';
import { MtBaseComponent } from 'src/app/base/mt-base/mt-base.component';


@Component({
  selector: 'mt-toolbar',
  templateUrl: './mt-toolbar.component.html',
  styleUrls: ['./mt-toolbar.component.scss']
})

export class MtToolbarComponent extends MtBaseComponent implements OnInit {
  smallScreen: boolean;

  ngOnInit(): void {
  }

}
