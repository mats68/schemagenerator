import { SchemaManager } from '../../app/base/schemaManager';
import { IComponent, IComponentPartial, ISchema } from '../../app/base/types';
import { buttons } from './schemaButtons';

const adress = (PrefField: string, disabled: boolean = false): Array<IComponent> => [
    {
        type: 'input',
        field: PrefField + 'name',
        label: 'Name',
        disabled
    },
    {
        type: 'input',
        field: PrefField + 'name2',
        label: '(2. Zeile)',
        disabled
    },
    {
        type: 'input',
        field: PrefField + 'adresse',
        label: 'Adresse',
        disabled
    },
    {
        type: 'input',
        field: PrefField + 'adresse2',
        label: '(2. Zeile)',
        disabled
    },
    {
        type: 'input',
        field: PrefField + 'plz',
        cols: 'col-md-4',
        label: 'PLZ',
        disabled
    },
    {
        label: 'Ort',
        type: 'input',
        field: PrefField + 'ort',
        cols: 'col-md-8',
        disabled
    },
    {
        type: 'input',
        field: PrefField + 'email',
        label: 'E-Mail',
        disabled
    },
    {
        type: 'input',
        field: PrefField + 'telefon',
        label: 'Telefon',
        disabled
    },
]




export const schema_IA: ISchema =
{
    type: 'form',
    name: 'schema_IA',
    children: [
        {
            type: 'label',
            label: 'Installationsanzeige',
            style: 'font-size: 30px; margin-top: 10px; margin-bottom: 10px;'
        },
        {
            type: 'expansionspanel',
            expanded: true,
            label: 'Ort der Installation',
            children: [
                {
                    type: 'input',
                    field: 'standort',
                    label: 'Standort',
                    disabled: true,
                    cols: 'md-6',
                },
                {
                    type: 'input',
                    field: 'gebaeudeart',
                    label: 'Gebäudeart',
                    disabled: true,
                    cols: 'md-6',
                },
                {
                    type: 'input',
                    field: 'Gemeinde',
                    label: 'Gemeinde',
                    disabled: true,
                    cols: 'md-6',
                },
                {
                    type: 'input',
                    field: 'anzEinheiten',
                    label: 'Anz. Einheiten / Zähler',
                    cols: 'md-6',
                },
                {
                    type: 'input',
                    field: 'Parzelle',
                    label: 'Parzelle',
                    disabled: true,
                    cols: 'md-6',
                },
                {
                    type: 'input',
                    field: 'Gebäudeteil',
                    label: 'Gebäudeteil',
                    cols: 'md-6',
                },
                {
                    type: 'input',
                    field: 'Versicherungs-Nr',
                    label: 'Versicherungs-Nr.',
                    cols: 'md-6',
                },
                {
                    type: 'checkbox',
                    field: 'ZEV',
                    label: 'Zusammenschluss zum Eigenverbrauch (ZEV)',
                    cols: 'md-6',
                },
            ]
        },
        {
            type: 'expansionspanel',
            expanded: true,
            label: 'Adressen / Geschäftspartner',
            children: [
                {
                    type: 'panel',
                    cols: 'md-6',
                    children: [
                        {
                            type: 'input',
                            field: 'Installationsbetrieb',
                            label: 'Installationsbetrieb',
                            disabled: true,
                        },
                        {
                            type: 'input',
                            field: 'Bewilligungs-Nr.',
                            label: 'Bewilligungs-Nr.',
                            disabled: true,
                        },
                        {
                            type: 'input',
                            field: 'Sachbearbeiter',
                            label: 'Sachbearbeiter',
                            disabled: true,
                        },
                        {
                            type: 'input',
                            field: 'Eigentümer',
                            label: 'Eigentümer',
                            disabled: true,
                        },
                        {
                            type: 'radiogroup',
                            field: 'Sprache',
                            label: 'Sprache',
                            options: ['De', 'Fr', 'It'],
                        },

                    ]
                },
                {
                    type: 'panel',
                    cols: 'md-6',
                    children: [
                        {
                            type: 'select',
                            field: 'zus_adress',
                            label: 'Zusätzliche Adresse',
                            options: ['Verwaltung', 'Architekt'],
                            onChange(sm, comp, val) {
                                let ac = sm.getCompByName('pnAdrVerwaltung');
                                ac.comp.hidden = val === comp.options[1];
                                ac = sm.getCompByName('pnAdrArchitekt');
                                ac.comp.hidden = val === comp.options[0];

                            }
                        },
                        {
                            type: 'panel',
                            style: 'margin: 10px;',
                            name: 'pnAdrVerwaltung',
                            hidden: true,
                            children: [
                                ...adress('verwaltung_', true)
                            ]

                        },
                        {
                            type: 'panel',
                            style: 'margin: 10px;',
                            name: 'pnAdrArchitekt',
                            hidden: true,
                            children: [
                                {
                                    type: 'button',
                                    kind: 'stroked',
                                    label: ' Adresse in telsearch.ch suchen...',

                                },
                                ...adress('architekt_')
                            ]
    
                        },
                        ]
            },
            ]
        },
        ...buttons

    ]
}