import { strings } from './strings';
import { ISchema, IComponent, ComponentType, ISelectOptionItems, DataType, IScreenSize } from './types';
import { Subject } from 'rxjs';

export interface ISettings {
  requiredSuffix: string;
  language: string;
}

export interface ICompExt {
  comp: IComponent,
  parent: IComponent,
}

export interface IError {
  comp: IComponent;
  arrayInd: number; //index of array in datatable
  error: string;
}

export class SchemaManager {
  Schema: ISchema;
  Values: any;
  DiffValues: any;
  ValuesChanged: boolean;
  Settings: ISettings;
  Strings: any;

  CompArray: ICompExt[];
  ArrayInd: number;
  ParentSchemaManager: SchemaManager;

  Errors: IError[];
  AllValidated: boolean;

  OnFocus: Subject<IComponent>;
  
  private _ScreenSize: IScreenSize;
  get ScreenSize(): IScreenSize {
    return this._ScreenSize;
  }

  set ScreenSize(val: IScreenSize) {
    if (this._ScreenSize !== val) {
      this._ScreenSize = val;
      if (this.Schema?.onResize) {
        this.Schema.onResize(this)
      }
    }
  }

  private _NeedsRefreshUI: boolean = false;
  get NeedsRefreshUI(): boolean {
    return this._NeedsRefreshUI;
  }
  refresh_UI() {
    setTimeout(() => this._NeedsRefreshUI = true);
    setTimeout(() => this._NeedsRefreshUI = false);
  }

  get Language(): string {
    return this.Settings.language;
  }

  set Language(val: string) {
    if (this.Settings.language !== val) {
      this.Settings.language = val; 
      this.Strings = strings[this.Settings.language];
    }
  }

  constructor(parentSchemaManager: SchemaManager = null, settings: ISettings = null) {
    this.ParentSchemaManager = parentSchemaManager;
    this.InitSettings(settings);
    this.InitScreenSize();
    this.ArrayInd = -1;
    this.OnFocus = new Subject<IComponent>();
  }

  InitSchema(schema: ISchema) {
    this.Schema = schema;
    this.CompArray = [];
    this.Errors = this.ParentSchemaManager ? this.ParentSchemaManager.Errors : [];
    this.AllValidated = false;
    const fn = (comp: IComponent, parent: IComponent) => {
      this.CompArray.push({comp, parent})
    }
    this.traverseSchema(this.Schema, null, fn);
    this.InitValues(this.Values);
    if (this.Schema.onInitSchema) this.Schema.onInitSchema(this);
  }

  InitValues(values: any, arrayInd: number = -1, diffValues: any = null) {
    if (diffValues) {
      this.DiffValues = diffValues;
    }
    if (values) {
      this.Values = values;
    } else {
      this.Values = {};
      this.CompArray.forEach(ca => {
        if (ca.comp.field && ca.comp.default) {
          const val = this.getPropValue(ca.comp, 'default');
          this.Values[ca.comp.field] = val;
        }
      });
    }
    if (!this.ParentSchemaManager) {
      this.Errors = [];
      this.AllValidated = false;
      this.ValuesChanged = false;
    }
    this.ArrayInd = arrayInd;
    if (this.Schema.onInitValues) this.Schema.onInitValues(this);
    // this.origValues = JSON.parse(JSON.stringify(this.Values));

  }

  InitSettings(settings: ISettings) {
    if (this.ParentSchemaManager) {
      this.Settings = this.ParentSchemaManager.Settings;
    } else if (settings) {
      this.Settings = settings;
    } else {
      this.Settings = {
          requiredSuffix: ' *',
          language: 'de',
      }
    }
    this.Strings = strings[this.Settings.language];
  }

  InitScreenSize() {
    if (screen.width >= 1200) {
      this.ScreenSize = 'lg';
    } else if (screen.width >= 992) { 
      this.ScreenSize = 'md';
    } else if (screen.width >= 768) { 
      this.ScreenSize = 'sm';
    } else { 
      this.ScreenSize = 'xs';
    }
  }

  DataLoaded() {
    if (this.Schema.onDataLoaded) this.Schema.onDataLoaded(this);
  }

  getPropValue(comp: IComponent, prop: string): any {
    if (typeof comp[prop] === 'undefined') {
      return undefined;
    } else if (typeof comp[prop] === 'function') {
      return comp[prop](this, comp);
    } else {
      return comp[prop];
    }
  }

  getLabel(comp: IComponent): string {
    return this.getPropValue(comp, 'label') + (comp.required ? this.Settings.requiredSuffix : '');
  }

  getValue(comp: IComponent): any {
    let val;
    if (!comp.field) {
      console.error('field not specified !');
      console.dir(JSON.stringify(comp));
      return undefined;
    }

    val = this.Values[comp.field];

    if (!val) {
      if (comp.type === 'checkbox') {
        return false;
      }
      if (comp.type === 'datatable') {
        return [];
      }
      return '';
    }
    return val;
  }

  updateValue(comp: IComponent, val: any): void {

    if (comp.dataType === DataType.float) {
      val = parseFloat(val);
      if (isNaN(val)) val = null;

    }
    if (comp.dataType === DataType.int) {
      val = parseInt(val);
      if (isNaN(val)) val = null;
    }

    if (this.Values[comp.field] === val) return;
    this.Values[comp.field] = val;
    this.validate(comp, val);

    if (comp.onChange) {
      comp.onChange(this, comp, val);
    }

    this.ValuesChanged = true;
  }

  validate(comp: IComponent, value: any, arrayInd: number = -1): void {
    if (arrayInd === - 1) arrayInd = this.ArrayInd;
    let msg = '';
    if (!value && comp.required) {
      msg = `${this.Strings.required}`;
    } else if (comp.validate) {
      msg = comp.validate(this, comp, value);
    } 
    if (msg) {
      this.addError(comp, msg, arrayInd);
    } else {
      this.removeError(comp, arrayInd);
    }
  }

  validateAll() {
    this.Errors = []
    this.CompArray.forEach(ca => {
      if (ca.comp.field) {
        if (ca.comp.type === ComponentType.datatable) {
          const arrVal = this.Values[ca.comp.field];
          this.validate(ca.comp,arrVal);
          if (arrVal && Array.isArray(arrVal)) {
            arrVal.forEach((obj, ind) => {
              ca.comp.children.forEach(comp => {
                const value = obj[comp.field];
                this.validate(comp, value, ind);
              })
            })
          }
        } else if (ca.parent.type !== ComponentType.datatable) {
          const value = this.getValue(ca.comp);
          this.validate(ca.comp, value);
        }
      }
    });
    this.AllValidated = true;
  }

  private addError(comp: IComponent, msg: string, arrayInd: number) {
    const error = this.Errors.find(e => e.comp === comp && e.arrayInd === arrayInd);
    if (error) {
      error.error = msg;
    } else {
      this.Errors.push({
        comp: comp,
        arrayInd: arrayInd,
        error: msg
      });
    }
  }

  private removeError(comp: IComponent, arrayInd: number) { 
    const ind = this.Errors.findIndex(e => e.comp === comp && e.arrayInd === arrayInd);
    if (ind > -1) {
      this.Errors.splice(ind,1);
    } 
  }

  removeAllErrors() { 
    this.Errors = [];
  }



  getError(comp: IComponent) { 
    let msg = '';
    const error = this.Errors.find(e => e.comp === comp && e.arrayInd === this.ArrayInd);
    if (error) {
      msg = error.error;
    } 
    return msg;
  }

  getStyle(comp: IComponent): string {
    const width = comp.width ? `width: ${comp.width};` : 'width: 100%;';
    const style = comp.style ?? '';
    return `${width}${style}`;
  }

  getCompByName(name: string): IComponent | undefined {
    const c = this.CompArray.find(ca => ca.comp.name === name);
    return c ? c.comp : undefined;
  }

  getCompByField(field: string): IComponent | undefined {
    const c = this.CompArray.find(ca => ca.comp.field === field);
    return c ? c.comp : undefined;
  }

  selectOptionsAsObjects(comp: IComponent): ISelectOptionItems {
    const val = this.getPropValue(comp, 'options');
    if (!val || !Array.isArray(val) || val.length === 0) return [];
    let ret: ISelectOptionItems = [];
    if (typeof val[0] === "string") {
      val.forEach(item => ret.push({ value: item, text: item }));
      return ret;
    } else {
      return val;
    }
  }

  selectOptionsAsStrings(comp: IComponent): string[] {
    const val = this.getPropValue(comp, 'options');
    if (!val || !Array.isArray(val) || val.length === 0) return [];
    let ret: string[] = [];
    if (typeof val[0] === "object") {
      val.forEach(item => ret.push(item.text));
      return ret;
    } else {
      return val;
    }
  }

  getColsClass(comp: IComponent, prop: string = 'cols'): string {
    let ret: string = this.getPropValue(comp, prop) || '';
    let xs = ret.indexOf('xs') > -1 ? ret.substr(ret.indexOf('xs')+3, 2) : '12';
    let sm = ret.indexOf('sm') > -1 ? ret.substr(ret.indexOf('sm')+3, 2) : xs;
    let md = ret.indexOf('md') > -1 ? ret.substr(ret.indexOf('md')+3, 2) : sm;
    let lg = ret.indexOf('lg') > -1 ? ret.substr(ret.indexOf('lg')+3, 2) : md;
    return `col-xs-${xs} col-sm-${sm} col-md-${md} col-lg-${lg}`
  }
  
  usesGrid(comp: IComponent): boolean {
    if (!comp.children) return false;
    const hasGrid = comp.children.find(f => f.cols);
    return !!hasGrid;
  }

  DoFocus(comp: IComponent, arrayInd: number = -1) {
    this.MakeVisible(comp, arrayInd);
    setTimeout(() => this.OnFocus.next(comp), 100);
  }

  MakeVisible(comp: IComponent, arrayInd: number) {
    let curTab: IComponent = null;
    let ext = this.CompArray.find(c => c.comp === comp);
    
    while (ext && ext.parent) {
      if (ext.parent.type == ComponentType.expansionspanel) {
        ext.parent.expanded = true;
      } else if (ext.parent.type == ComponentType.tab) {
        curTab = ext.parent;
      } else if (ext.parent.type == ComponentType.tabs) {
        if (curTab && ext.parent.tabs && Array.isArray(ext.parent.tabs)) {
          const ind = ext.parent.tabs.indexOf(curTab);
          ext.parent.selectedTabIndex = ind;
        }
      } else if (ext.parent.type == ComponentType.datatable) {
        ext.parent.curRowInd = arrayInd;
      }
      ext = this.CompArray.find(c => c.comp === ext.parent);
    }

  }

  private traverseSchema(comp: IComponent, parentComp: IComponent, fn) {
    fn(comp, parentComp);
    if (comp.children) {
      comp.children.forEach(c => this.traverseSchema(c, comp, fn));
    }
    if (comp.tabs) {
      comp.tabs.forEach(c => this.traverseSchema(c, comp, fn));
    }
  }

  getParentSM(): SchemaManager {
    return this.ParentSchemaManager ? this.ParentSchemaManager : this;
  }



}
