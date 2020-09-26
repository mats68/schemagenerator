import { SchemaManager } from '../../app/base/schemaManager';
import { IComponent, ISchema, ComponentType, ButtonKind, Color } from '../../app/base/types';

function buttonClick(comp) {
  alert(comp.label);
}

export const schema1: ISchema =
{
  type: 'form',
  name: 'form',
  onInitSchema(sm) {

  },
  onSubmit(sm) {
    console.log('form submitted');
  },
  onResize(sm) {
    sm.getCompByName('tb')!.comp.menuView = sm.ScreenSize === 'xs';
  },
  onDataLoaded(sm) {
    const liste = sm.Schema.auswahllisten.mitarbeiter;
    sm.getCompByName('mitarbeiter').comp.options = Object.values(liste) as string[];
    sm.refresh_UI();
  },
  children: [
    {
      type: 'input',
      name: 'firstInput',
      required: true,
      label(sm: SchemaManager): string {
        return sm.Language === 'de' ? 'Standort' : 'Position';
      },
      onChange(sm: SchemaManager, comp: IComponent) {
        let val: string = sm.getValue(comp) || '';
        val = val.trim().toLowerCase();
        sm.updateValue(comp, val);

      },
      field: 'text1'
    },
    {
      type: 'input',
      label: 'Autocomplete',
      hint: 'Choose an item',
      default: 'one',
      required: true,
      field: 'text2',
      options: ['one', 'two', 'test', 'three', 'four', 'five', 'six', 'seven', 'eight']
    },
    {
      type: 'input',
      label: 'Integer',
      cols: 'md-6',
      dataType: 'int',
      required: true,
      field: 'int1'
    },
    {
      type: 'input',
      label: 'Float',
      cols: 'md-6',
      dataType: 'float',
      required: true,
      field: 'float1'
    },
    {
      type: 'input',
      label: 'Mitarbeiter',
      options: [],
      field: 'mitarbeiter'
    },
    {
      type: 'checkbox',
      label: 'Check1',
      field: 'check1',
      cols: 'xs-3 md-4',
    },
    {
      type: 'checkbox',
      label: 'Check2',
      field: 'check2',
      cols: 'xs-3 md-4',
    },
    {
      type: 'checkbox',
      label: 'Check3',
      field: 'check3',
      cols: 'xs-3 md-4',
    },
    {
      type: 'expansionspanel',
      label: 'Panel1',
      children: [
        {
          type: 'input',
          label: 'Text10',
          field: 'text10',
        },
        {
          type: 'checkbox',
          label: 'Hide Panel 2',
          field: 'check10',
          onChange(sm, comp, val): void {
            sm.getCompByName('panel2').comp.hidden = !val; 
          }
        },
        {
          type: 'expansionspanel',
          label: 'Panel2',
          name: 'panel2',
          children: [
            {
              type: 'input',
              label: 'Text100',
              field: 'text100'
            },
            {
              type: 'checkbox',
              label: 'Check100',
              field: 'check100'
            },
            {
              type: 'input',
              label: 'Autocomplete2',
              field: 'text2a',
              options: ['one', 'two', 'three', 'four', 'test']
            },

          ]
        },
        {
          type: 'input',
          label: 'Multiline',
          field: 'multiline',
          rows: 6,
          multiline: true,
          hint: 'Hinweis',
          required: true

        },
        {
          type: 'input',
          label() {
            return 'Label from function'
          },
          field: 'test12',
          hint() {
            return 'Hinweis aus Funktion'
          },
          required: true

        },

      ]
    },
    {
      type: 'expansionspanel',
      label: 'Validation',
      children: [
        {
          type: 'input',
          label: 'Required',
          field: 'text20',
          cols: 'lg-3 xs-6',
          required: true
        },
        {
          type: 'input',
          label: 'Text30',
          cols: 'lg-3 xs-6',
          field: 'text30'
        },
        {
          type: 'input',
          label: 'Prev',
          cols: 'lg-3 xs-6',
          field: 'prev'
        },
        {
          type: 'input',
          label: 'Required if prev empty',
          field: 'next',
          cols: 'lg-3 xs-6',
          validate(sm: SchemaManager, comp: IComponent, val: any): string {
            if (!sm.Values.prev && !val) {
              return 'Required since prev is empty';
            }
            return '';

          }
        },
        {
          type: 'input',
          inputType: 'number',
          dataType: 'float',
          label: 'Number',
          cols: 'lg-3',
          field: 'number'
        },
        {
          type: 'input',
          label: 'Number with mask',
          dataType: 'float',
          mask: '0*.00',
          cols: 'lg-3',
          field: 'numbermask'
        },
        {
          type: 'input',
          label: 'mask special character',
          hint: 'special character not saved',
          dataType: 'float',
          mask: '0*.00',
          maskOptions: {
            dropSpecialCharacters: true
          },
          cols: 'lg-3',
          field: 'numbermask2'
        },
        
      ]
    },
    {
      type: ComponentType.expansionspanel,
      label: 'Buttons',
      children: [
        {
          type: ComponentType.button,
          label: 'normal button',
          color: 'primary',
          cols: 'sm-1',
          onClick(sm: SchemaManager, comp: IComponent)  {
            buttonClick(comp);
          }

        },
        {
          type: ComponentType.button,
          kind: ButtonKind.raised,
          label: 'raised button',
          color: 'warn',
          cols: 'sm-1',
          onClick(sm: SchemaManager, comp: IComponent) {
            buttonClick(comp);
          }
        },
        {
          type: ComponentType.button,
          kind: ButtonKind.flat,
          cols: 'sm-1',
          label: 'flat button',
          onClick(sm: SchemaManager, comp: IComponent) {
            buttonClick(comp);
          }
        },
        {
          type: ComponentType.button,
          kind: ButtonKind.stroked,
          cols: 'sm-1',
          label: 'stroked button',
          onClick(sm: SchemaManager, comp: IComponent) {
            buttonClick(comp);
          }
        },
        {
          type: ComponentType.button,
          kind: ButtonKind.icon,
          color: 'accent',
          tooltip: 'icon button',
          cols: 'sm-1',
          icon: 'favorite',
          onClick(sm: SchemaManager, comp: IComponent) {
            buttonClick(comp);
          }
        },
        {
          type: ComponentType.button,
          kind: ButtonKind.minifab,
          cols: 'sm-1',
          tooltip: 'minifab button',
          icon: 'menu',
          onClick(sm: SchemaManager, comp: IComponent) {
            buttonClick(comp);
          }
        },
        {
          type: ComponentType.button,
          kind: ButtonKind.fab,
          cols: 'sm-1',
          tooltip: 'fab button',
          color: 'primary',
          icon: 'menu',
          onClick(sm: SchemaManager, comp: IComponent) {
            buttonClick(comp);
          }
        },
        {
          type: 'divider',
        },
        {
          type: ComponentType.link,
          kind: ButtonKind.standard,
          label: 'Link',
          cols: 'sm-1',
          tooltip: 'link',
          color: 'primary',
          href: 'https://www.sbb.ch',
          openInNewTab: true,
        },

      ]
    },
    {
      type: 'expansionspanel',
      label: 'Focus Input',
      children: [
        {
          type: 'button',
          cols: 'md-2',
          kind: 'raised',
          label: 'Focus Input',
          onClick(sm) {
            sm.DoFocus(sm.getCompByField('focusinput').comp);
          }
        },
        {
          type: 'radiogroup',
          label: 'Radiogroup',
          cols: 'sm-12',
          dataType: 'int',
          options: [{value: 1, text: 'Eins'}, {value: 2, text: 'Zwei'}, {value: 3, text: 'Drei'}, {value: 4, text: 'Vier'}],
          required: true,
          field: 'radio1',
        },
        {
          type: 'input',
          cols: 'md-5',
          field: 'focusinput',
          label: 'Focus',
        }
      ]
    },
    {
      type: 'datatable',
      label: 'Adressen',
      field: 'adresses',
      required: true,
      cardView: true,
      // datacols: 'lg-6',
      summary(sm, comp, row) {
        const name = row.name ? `Name: ${row.name}` : '';
        const ort = row.ort ? ` Ort: ${row.ort}` : '';
        const email = row.email ? ` Email: ${row.email}` : '';

        return `${name}\n${ort}${email}`;

      },
      children: [
        {
          type: 'input',
          label: 'Adresstyp',
          field: 'typ',
          options: ["Rechnungsadresse", "Versandadresse"],
          required: true,
          cols: 'md-6',
        },
        {
          type: 'input',
          label: 'Name',
          field: 'name',
          required: true,
          cols: 'md-6',
        },
        {
          type: 'input',
          label: 'Ort',
          field: 'ort',
          required: true,
          cols: 'md-6',
        },
        {
          type: 'input',
          inputType: 'email',
          label: 'Email',
          field: 'email',
          suffix: '.com',
          required: true,
          cols: 'md-6',
        },
        {
          type: 'checkbox',
          label: 'Gueltig',
          field: 'gültig',
          cols: 'md-6',
        },

      ]
    },
    {
      type: 'toolbar',
      label: 'Eine Toolbar',
      name: 'tb',
      toolbarItems: [
        {
          label: 'First',
          icon: 'menu',
          color: 'primary',
          onClick(sm, comp) {alert(comp.label)}
        },
        {
          label: 'Delete',
          icon: 'delete',
          color: 'warn',
          onClick(sm, comp) {alert(comp.label)}
        },
      ]
    },
    {
      type: 'errorpanel',
      label: 'Fehler',
    },    
    {
      type: 'divider',
      style: 'margin-top: 60px;'
    },
    {
      type: 'button',
      label: 'Speichern',
      style: 'color: blue',
      kind: 'raised',
      cols: 'md-1',
      onClick(sm: SchemaManager) {
        sm.validateAll();
      }
    },
    {
      type: 'button',
      inputType: 'submit',
      kind: 'raised',
      cols: 'md-1',
      label: 'Submit'
    },
    {
      type: 'button',
      kind: 'raised',
      cols: 'md-1',
      label: 'refresh UI',
      onClick(sm: SchemaManager) {
        sm.refresh_UI();
      }
    },
    {
      type: 'button',
      kind: 'raised',
      cols: 'md-1',
      label: 'Focus prev',
      onClick(sm: SchemaManager) {
        sm.DoFocus(sm.getCompByField('prev').comp);
      }
    },

  ]

};

export const values1 = {
  text1: 'AA',
  text2: 'one',
  numbermask: 123.55,
  number: 800,
  adresses: [
    {
      typ: 'Rechnungsadresse',
      name: 'Thaler Matthias',
      ort: 'Bern',
      email: 'Matthias@gmail.com'
    },
    {
      typ: 'Versandadresse',
      name: 'Meier Hans',
      ort: 'Zürich',
      email: 'MeierHans@gmail.com'
    }

  ]
};

export const values2 = {
  text1: 'BB',
  check1: true,
  numbermask: 144,
  number: 800,
  multiline: 'dada',
  adresses: [
    {
      typ: 'Rechnungsadresse',
      name: 'Thaler Matthias',
      ort: 'Bern',
      email: 'Matthias@gmail.com',
    },
    {
      typ: 'Versandadresse',
      name: 'Meier Hans',
      ort: 'Zürich',
      email: 'MeierHans@gmail.com'
    }

  ]
};

