import { MtBaseComponent } from 'src/app/base/mt-base/mt-base.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'mt-sidenav',
  templateUrl: './mt-sidenav.component.html',
  styleUrls: ['./mt-sidenav.component.scss']
})
export class MtSidenavComponent extends MtBaseComponent implements OnInit, OnDestroy, AfterViewInit {
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  navopen: boolean = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
  ) {
    super();
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    // this.navopen = !this.mobileQuery.matches;
    // this.navopen = true;
  }


  toggle() {
    this.navopen = !this.navopen;  
  }

  navClick() {
    if (this.mobileQuery.matches) {
      this.navopen = false;
    }
  }

  navContent() {
    // return this.navopen ? 'right' : 'full-width';
  }

  contentVisible() {
     if (this.mobileQuery.matches && this.navopen) {
       return false;
     }
     return true;
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
    this.navopen = !this.mobileQuery.matches;
  }
}
