import { strings } from './strings';
import { ISchema, IComponent, ComponentType, ISelectOptionItems, DataType, IScreenSize, IAppearance, SchemaKeys, ComponentKeys } from './types';
import { Subject } from 'rxjs';
import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';
import get from 'lodash.get';
import set from 'lodash.set';

export interface ISettings {
  requiredSuffix: string;
  language: string;
  appearance?: IAppearance;
  date: {
    parse: {
      dateInput: string,
    },
    display: {
      dateInput: string,
      monthYearLabel: string,
    },
  }
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

export enum ISchemaErrorType {
  error = 'error',
  warning = 'warning',
}

export enum IValueType {
  undefined = 'undefined',
  null = 'null',
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  function = 'function',
  array = 'array',
  object = 'object',
  component = 'component',
}

export interface ISchemaError {
  comp?: IComponent;
  error: string;
  type: ISchemaErrorType;
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

  // get Language(): string {
  //   return this.Settings.language;
  // }

  // set Language(val: string) {
  //   if (this.Settings.language !== val) {
  //     this.Settings.language = val;
  //     this.Strings = strings[this.Settings.language];
  //   }
  // }

  constructor(parentSchemaManager: SchemaManager = null, settings: ISettings = null) {
    this.ParentSchemaManager = parentSchemaManager;
    this.InitSettings(settings);
    this.InitScreenSize();
    this.ArrayInd = -1;
    this.OnFocus = new Subject<IComponent>();
  }

  InitSchema(schema: ISchema) {
    this.Schema = schema;
    if (this.Schema.inheritFrom) this.InitInherits();

    this.CompArray = [];
    this.Errors = this.ParentSchemaManager ? this.ParentSchemaManager.Errors : [];
    this.AllValidated = false;
    const fn = (comp: IComponent, parent: IComponent) => {
      this.CompArray.push({ comp, parent })
    }
    this.traverseSchema(this.Schema, null, fn);
    this.InitValues(this.Values);
    if (this.Schema.onInitSchema) this.Schema.onInitSchema(this);
  }

  private InitInherits() {
    const getComp = (CompArray: ICompExt[], name: string, field: string = ''): ICompExt | undefined => {
      if (name) {
        return CompArray.find(ca => ca.comp.name === name);
      } else if (field) {
        return CompArray.find(ca => ca.comp.field === field);
      }
      return undefined;
    }

    if (this.Schema.inheritFrom.inheritFrom) {
      console.error('inherits schema should not have a inherits schema himself !');
      return;
    }

    const baseSchema: ISchema = cloneDeep(this.Schema.inheritFrom);
    baseSchema.name = this.Schema.name;

    const updateArray = (schema: ISchema): ICompExt[] => {
      let arr: ICompExt[] = [];
      this.traverseSchema(schema, null, (comp, parent) => arr.push({ comp, parent }));
      return arr;
    }

    let compsBase = updateArray(baseSchema);
    // this.traverseSchema(baseSchema, null, (comp, parent) => compsBase.push({comp,parent}));

    let compsExt = updateArray(this.Schema);


    // neue Komponenten hinzufügen
    compsExt.forEach(ec => {
      compsBase = updateArray(baseSchema);
      let bc = getComp(compsBase, ec.comp.name, ec.comp.field);
      if (!bc && ec.parent) {
        bc = getComp(compsBase, ec.parent.name, ec.parent.field);
        if (bc && bc.comp.children) {
          bc.comp.children.push(ec.comp);
        }
      }
    })


    compsExt.forEach(ec => {
      var bc = getComp(compsBase, ec.comp.name, ec.comp.field);
      if (bc) {
        merge(bc.comp, ec.comp);
      }
    })
    this.Schema = baseSchema;

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
          set(this.Values, ca.comp.field, val);
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
        date: {
          parse: {
            dateInput: 'DD.MM.YYYY',
          },
          display: {
            dateInput: 'DD.MM.YYYY',
            monthYearLabel: 'MMM YYYY'
          },
        }
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
  private hasNoValue(value: any): boolean {
    const typ = this.checkValueType(value);
    let noVal = false;
    if (typ === IValueType.undefined || typ === IValueType.null) {
      noVal = true;
    } else if (typ === IValueType.string && value === '') {
      noVal = true;
    } else if (typ === IValueType.array && value.length === 0) {
      noVal = true;
    }
    return noVal;

  }

  getValue(comp: IComponent, values: any = null): any {  //values could be diff-values
    let val;
    if (!comp.field) {
      console.error('field not specified !');
      console.dir(JSON.stringify(comp));
      return undefined;
    }
    const Values = values || this.Values;
    val = get(Values, comp.field);

    if (this.hasNoValue(val)) {
      if (comp.type === 'checkbox') {
        return false;
      }
      if (comp.type === 'datatable' || comp.multiselect) {
        return [];
      }
      return '';
    }
    return val;
  }

  updateValue(comp: IComponent, val: any): void {

    if (!comp.field) {
      console.error('field not specified !');
      console.dir(JSON.stringify(comp));
      return;
    }

    if (comp.dataType === DataType.float) {
      val = parseFloat(val);
      if (isNaN(val)) val = null;

    } else if (comp.dataType === DataType.int) {
      val = parseInt(val);
      if (isNaN(val)) val = null;
    }

    const curVal = get(this.Values, comp.field);
    if (curVal === val) return;
    set(this.Values, comp.field, val);
    this.validate(comp, val);

    if (comp.onChange) {
      comp.onChange(this, comp, val);
    }

    this.ValuesChanged = true;
  }

  validate(comp: IComponent, value: any, arrayInd: number = -1): void {
    if (arrayInd === - 1) arrayInd = this.ArrayInd;
    let msg = '';

    if (this.hasNoValue(value) && comp.required) {
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
          const arrVal = get(this.Values, ca.comp.field);
          this.validate(ca.comp, arrVal);
          if (arrVal && Array.isArray(arrVal)) {
            arrVal.forEach((obj, ind) => {
              ca.comp.children.forEach(comp => {
                const value = get(obj, comp.field);
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
      this.Errors.splice(ind, 1);
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
    const width = comp.width ? `width: ${comp.width};` : '';
    const style = comp.style ?? '';
    return `${width}${style}`;
  }

  getCompByName(name: string): ICompExt | undefined {
    return this.CompArray.find(ca => ca.comp.name === name);
  }

  getCompByField(field: string): ICompExt | undefined {
    return this.CompArray.find(ca => ca.comp.field === field);
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
    let xs = ret.indexOf('xs') > -1 ? ret.substr(ret.indexOf('xs') + 3, 2) : '12';
    let sm = ret.indexOf('sm') > -1 ? ret.substr(ret.indexOf('sm') + 3, 2) : xs;
    let md = ret.indexOf('md') > -1 ? ret.substr(ret.indexOf('md') + 3, 2) : sm;
    let lg = ret.indexOf('lg') > -1 ? ret.substr(ret.indexOf('lg') + 3, 2) : md;
    return `col-xs-${xs} col-sm-${sm} col-md-${md} col-lg-${lg}`
  }

  getAppearance(comp: IComponent): IAppearance {
    if (comp.appearance) return comp.appearance;
    if (this.Settings.appearance) return this.Settings.appearance;
    return 'standard';
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
        if (curTab && ext.parent.children && Array.isArray(ext.parent.children)) {
          const ind = ext.parent.children.indexOf(curTab);
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
  }

  getParentSM(): SchemaManager {
    return this.ParentSchemaManager ? this.ParentSchemaManager : this;
  }

  checkValueType(val: any): IValueType {
    if (typeof val === 'undefined') {
      return IValueType.undefined;
    } else if (val === null) {
      return IValueType.null;
    } else if (typeof val === 'string') {
      return IValueType.string;
    } else if (typeof val === 'number') {
      return IValueType.number;
    } else if (typeof val === 'boolean') {
      return IValueType.boolean;
    } else if (typeof val === 'function') {
      return IValueType.function;
    } else if (Array.isArray(val)) {
      return IValueType.array;
    } else if (typeof val === 'object') {
      if (val.type) {
        return IValueType.component;
      } else {
        return IValueType.object;
      }
    }

  }

  CheckSchema(): ISchemaError[] {
    //no type 
    // warning falls nicht prop aus IComponent
    // no double names or fields
    // container must have children
    //input usw must have field
    //input usw should have label
    // datatable: summary falls cardView
    // options falls select oder radio

    const notype = 'type Property is missing';
    const noChild = 'children Property is missing';
    const zeroChild = 'children Property has no entry';
    const noField = 'field Property is missing';
    const noLabel = 'label Property is missing';
    const doubleField = 'field Property is more than once used!';
    const doubleName = 'name Property is more than once used!';
    const noSummary = 'summary is necessary in datatable cardview';
    const noOptions = 'options Property is necessary';
    const noIcon = 'icon Property is necessary';
    const unn = prop => `Unnecessary Property "${prop}"`;
    const err = (msg: string, comp: IComponent): string => `${msg}${comp.name ? ', name: "' + comp.name + '"' : ''}${comp.field ? ', field: "' + comp.field + '"' : ''}`;

    const container: ComponentType[] = [ComponentType.form, ComponentType.card, ComponentType.panel, ComponentType.expansionspanel, ComponentType.tabs, ComponentType.tab, ComponentType.toolbar, ComponentType.datatable];
    const fields: ComponentType[] = [ComponentType.input, ComponentType.select, ComponentType.date, ComponentType.checkbox, ComponentType.switch, ComponentType.radiogroup, ComponentType.slider, ComponentType.datatable];
    const noLabels: ComponentType[] = [ComponentType.divider, ComponentType.tabs, ComponentType.panel, ComponentType.html, ComponentType.errorpanel, ComponentType.icon, ComponentType.form, ComponentType.button, ComponentType.icon];

    const Errs: ISchemaError[] = [];
    const AddErr = (comp: IComponent, msg: string, isError: boolean) => {
      const type = isError ? ISchemaErrorType.error : ISchemaErrorType.warning;
      Errs.push({ comp, error: err(msg, comp), type });
    }

    const ck = Object.keys(ComponentKeys);
    const sk = Object.keys(SchemaKeys).concat(ck);
    const duplicateFields = [];
    const duplicateNames = [];

    //Check components 
    this.CompArray.forEach(ca => {
      if (!ca.comp.type) {
        AddErr(ca.comp, notype, true);
      } else {
        if (container.indexOf(ca.comp.type as ComponentType) >= 0) {
          if (!ca.comp.children) {
            AddErr(ca.comp, noChild, true);
          } else {
            if (!Array.isArray(ca.comp.children) || ca.comp.children.length === 0) {
              AddErr(ca.comp, zeroChild, true);
            }
          }
        }

        if (fields.indexOf(ca.comp.type as ComponentType) >= 0 && (!ca.comp.field)) AddErr(ca.comp, noField, true);
        if (noLabels.indexOf(ca.comp.type as ComponentType) === -1 && (!ca.comp.label)) AddErr(ca.comp, noLabel, false);

        if ((ca.comp.type === ComponentType.select || ca.comp.type === ComponentType.radiogroup) && !ca.comp.options) AddErr(ca.comp, noOptions, true);
        if (ca.comp.type === ComponentType.datatable && ca.comp.cardView && !ca.comp.summary) AddErr(ca.comp, noSummary, true);
        if ((ca.comp.type === ComponentType.icon ) && !ca.comp.icon) AddErr(ca.comp, noIcon, true);
      }

      if (ca.comp.field) {
        let field = ca.comp.field
        if (ca.parent && ca.comp.type === ComponentType.datatable) {
          field = ca.parent.field + '.' + field;
        }
        duplicateFields[field] ? AddErr(ca.comp, doubleField, true) : duplicateFields[field] = true;
      }

      if (ca.comp.name) {
        let name = ca.comp.name
        if (ca.parent) {
          let pname = ca.parent.name ? ca.parent.name : (ca.parent.field ? ca.parent.field : '');
          name = pname + '.' + name;
        }
        duplicateNames[name] ? AddErr(ca.comp, doubleName, true) : duplicateNames[name] = true;
      }

      const propKeys = ca.parent ? ck : sk;
      Object.keys(ca.comp).forEach(k => {
        if (propKeys.indexOf(k) === -1) AddErr(ca.comp, unn(k), false);
      });
    });

    return Errs;
  }



}
