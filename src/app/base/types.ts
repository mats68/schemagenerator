import { SchemaManager } from './schemaManager';

export type IComponentStringFunction = (sm: SchemaManager, comp: IComponent, value?: any) => string;
export type IComponentBoolFunction = (sm: SchemaManager, comp: IComponent, value?: any) => boolean;
export type IComponentAnyFunction = (sm: SchemaManager, comp: IComponent, value?: any) => any;
export type IComponentVoidFunction = (sm: SchemaManager, comp: IComponent, value?: any) => void;
export type ISchemaVoidFunction = (sm: SchemaManager) => void;
export type ISelectOptionItemsFunction = (sm: SchemaManager, comp: IComponent, value?: any) => ISelectOptionItems | string[];

export type IScreenSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ISelectOptionItem {
    value: string | number,
    text: string,
  }

export interface ISelectOptionItems extends Array<ISelectOptionItem> { }

export interface ISchema extends IComponent {
  name?: string,
  onSubmit?: ISchemaVoidFunction,
  onInitSchema?: ISchemaVoidFunction,
  onInitValues?: ISchemaVoidFunction,
  onDataLoaded?: ISchemaVoidFunction,
  onResize?: ISchemaVoidFunction,
  language?: string,
  auswahllisten?: any,
}

export interface IComponent {
    type: keyof typeof ComponentType;
    dataType?: keyof typeof DataType;
    label?: string | IComponentStringFunction,
    name?: string;
    field?: string,
    style?: string | IComponentStringFunction,
    hidden?: boolean,
    tooltip?: string | IComponentStringFunction,
    hint?: string | IComponentStringFunction,
    children?: Array<IComponent>,
    default?: any,
    inputType?: string,
    width?: string,
    suffix?: string,
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
    cols?: string | IComponentStringFunction,
    datacols?: string | IComponentStringFunction,
    kind?: keyof typeof ButtonKind,
    isSubmit?: boolean,
    icon?: string,
    expanded?: boolean,
    toolbarColor?: keyof typeof Color,
    toolbarItems?: IToolbarItem[],
    menuView?: boolean,
    cardView?: boolean,
    tabs?: Array<IComponent>,
    // [key: string]: any,
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
    // static
    label = 'label',
    button = 'button',
    toolbar = 'toolbar',
    divider = 'divider',
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
