import { SchemaManager } from './schemaManager';

export type IComponentStringFunction = (sm: SchemaManager, comp: IComponent, value?: any) => string;
export type IComponentBoolFunction = (sm: SchemaManager, comp: IComponent, value?: any) => boolean;
export type IComponentAnyFunction = (sm: SchemaManager, comp: IComponent, value?: any) => any;
export type IComponentVoidFunction = (sm: SchemaManager, comp: IComponent, value?: any) => void;
export type ISchemaVoidFunction = (sm: SchemaManager) => void;
export type ISelectOptionItemsFunction = (sm: SchemaManager, comp: IComponent, value?: any) => ISelectOptionItems | string[];
// export type IPartialSchema = Partial<ISchema>;
// export type IPartialComponent = Partial<IComponent>;


export type IScreenSize = 'xs' | 'sm' | 'md' | 'lg';
export type IAppearance = 'legacy' | 'standard' | 'fill' | 'outline';

export interface ISelectOptionItem {
    value: string | number,
    text: string,
  }

export interface ISelectOptionItems extends Array<ISelectOptionItem> { }

export interface ISchema extends ISchemaProps, IComponent {
  [key: string]: any,
}

export interface ISchemaPartial extends ISchemaProps, IComponentPartial {
  [key: string]: any,
}

export interface ISchemaProps  {
  onSubmit?: ISchemaVoidFunction,
  onInitSchema?: ISchemaVoidFunction,
  onInitValues?: ISchemaVoidFunction,
  onDataLoaded?: ISchemaVoidFunction,
  onResize?: ISchemaVoidFunction,
  inheritFrom?: ISchema;
  auswahllisten?: any,
}

export interface IComponent extends IComponentProps {
  type: keyof typeof ComponentType;
  children?: Array<IComponent>,
}

export interface IComponentPartial extends IComponentProps {
  type?: keyof typeof ComponentType;
  children?: Array<IComponentPartial>,
}

export interface IComponentProps {
    dataType?: keyof typeof DataType;
    label?: string | IComponentStringFunction,
    name?: string;
    field?: string,
    style?: string | IComponentStringFunction,
    hidden?: boolean,
    tooltip?: string | IComponentStringFunction,
    hint?: string | IComponentStringFunction,
    default?: any,
    inputType?: string,
    width?: string,
    suffix?: string,
    prefix?: string,
    mask?: string | IComponentStringFunction,
    maskOptions?: IMaskOptions,
    rows?: number,
    multiline?: boolean,
    required?: boolean,
    color?: keyof typeof Color,
    validate?: IComponentStringFunction,
    onChange?: IComponentVoidFunction,
    summary?: IComponentStringFunction,
    onClick?: IComponentVoidFunction,
    disabled?: boolean | IComponentBoolFunction,
    options?: ISelectOptionItems | ISelectOptionItemsFunction | string[],
    appearance?: IAppearance,
    cols?: string | IComponentStringFunction,
    datacols?: string | IComponentStringFunction,
    curRowInd?: number,
    kind?: keyof typeof ButtonKind,
    icon?: string,
    expanded?: boolean,
    toolbarColor?: keyof typeof Color,
    menuView?: boolean,
    cardView?: boolean,
    noWrap?: boolean,
    selectedTabIndex?: number,
    html?: string | IComponentStringFunction,
    href?: string | IComponentStringFunction,
    openInNewTab?: boolean,
}

type KeysEnum<T> = { [P in keyof Required<T>]: true };
export const ComponentKeys: KeysEnum<IComponent> = {
  type: true,
  dataType: true,
  label: true,
  name: true,
  field: true,
  style: true,
  hidden: true,
  tooltip: true,
  hint: true,
  children: true,
  default: true,
  inputType: true,
  width: true,
  suffix: true,
  prefix: true,
  mask: true,
  maskOptions: true,
  rows: true,
  multiline: true,
  required: true,
  color: true,
  validate: true,
  onChange: true,
  summary: true,
  onClick: true,
  disabled: true,
  options: true,
  appearance: true,
  cols: true,
  datacols: true,
  curRowInd: true,
  kind: true,
  icon: true,
  expanded: true,
  toolbarColor: true,
  menuView: true,
  cardView: true,
  noWrap: true,
  selectedTabIndex: true,
  html: true,
  href: true,
  openInNewTab: true,
};

export const SchemaKeys: KeysEnum<ISchemaProps> = {
  onSubmit: true,
  onInitSchema: true,
  onInitValues: true,
  onDataLoaded: true,
  onResize: true,
  inheritFrom: true,
  auswahllisten: true,
  
}


export interface IMaskOptions {
  thousandSeparator?: string,
  dropSpecialCharacters?: boolean,
  showMaskTyped?: boolean,
}

export interface IToolbarItem {
  label: string,
  icon: string,
  color?: keyof typeof Color,
  disabled?: boolean | IComponentBoolFunction,
  onClick?: IComponentVoidFunction,
}


export enum ComponentType {
    // containers
    card = 'card',
    panel = 'panel',
    expansionspanel = 'expansionspanel',
    tabs = 'tabs',
    tab = 'tab',
    form = 'form',
    datatable = 'datatable',
    //fields
    input = 'input',
    select = 'select',
    date = 'date',
    radiogroup = 'radiogroup',
    slider = 'slider',
    checkbox = 'checkbox',
    switch = 'switch',
    chips = 'chips',
    // static
    label = 'label',
    html = 'html',
    button = 'button',
    link = 'link',
    toolbar = 'toolbar',
    divider = 'divider',
    icon = 'icon',
    errorpanel = 'errorpanel',
  }

  export enum DataType {
    string = 'string',
    float = 'float',
    int = 'int',
    bool = 'bool',
    date = 'date',
  }

  export enum ButtonKind {
    standard = 'standard',
    raised = 'raised',
    stroked = 'stroked',
    flat = 'flat',
    icon = 'icon',
    fab = 'fab',
    minifab = 'minifab'
   }

   export enum Color {
    primary ='primary',
    accent ='accent',
    warn ='warn',

   }
