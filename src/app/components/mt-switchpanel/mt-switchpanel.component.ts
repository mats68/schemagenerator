import { Component, OnInit, Input } from '@angular/core';
import { MtBaseComponent } from 'src/app/base/mt-base/mt-base.component';

@Component({
  selector: 'mt-switchpanel',
  templateUrl: './mt-switchpanel.component.html',
  styleUrls: ['./mt-switchpanel.component.scss']
})
export class MtSwitchpanelComponent extends MtBaseComponent implements OnInit {

  ngOnInit(): void {
  }
  get switchText() {
    return this.valueSwitch ? this.sm.Strings.switch_yes : this.sm.Strings.switch_no;
  }

  get valueSwitch(): boolean {
    return this.sm.getValue(this.comp);
  }

  set valueSwitch(val: boolean) {
    this.sm.updateValue(this.comp, val);
  }

  add() {
    this.valueSwitch = true;
  }

  delete() {
    this.valueSwitch = false;
  }


}
