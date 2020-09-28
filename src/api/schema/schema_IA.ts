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
        field: PrefField + 'tel',
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
                    multiline: true,
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
                    dataType: 'int',
                    mask: '0*',
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
                    field: 'VersicherungsNr',
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
        {
            type: 'datatable',
            label: 'Mess- und Steuereinrichtungen',
            field: 'steuereinrichtungen',
            cardView: true,
            summary(sm, comp, row) {
                const kunde = row.kunde ? `Kunde: ${row.kunde}` : '';
                const rechnungsadresse = row.rechnungsadresse ? ` Rechnungsadresse: ${row.rechnungsadresse}` : '';
                const gebaeudeteil = row.gebaeudeteil ? ` Gebäudeteil: ${row.gebaeudeteil}` : '';

                return `${kunde} ${rechnungsadresse} ${gebaeudeteil}`;

            },
            children: [
                {
                    type: 'input',
                    label: 'Kunde',
                    field: 'kunde',
                    required: true,
                    cols: 'md-6',
                },
                {
                    type: 'input',
                    label: 'Rechnungsadresse',
                    field: 'rechnungsadresse',
                    required: true,
                    cols: 'md-6',
                },
                {
                    type: 'input',
                    label: 'Gebäudeteil',
                    field: 'gebaeudeteil',
                    cols: 'md-6',
                },
                {
                    type: 'input',
                    label: 'Nutzung',
                    field: 'nutzung',
                    cols: 'md-6',
                },
                {
                    type: 'input',
                    label: 'Verbrauchsstelle VNB',
                    field: 'Verbrauchsstelle',
                    cols: 'md-4',
                },
                {
                    type: 'input',
                    label: 'Stockwerk',
                    field: 'Stockwerk',
                    options: ['Allg.', 'UG', 'EG', '1. OG', '2. OG'],
                    cols: 'md-4',
                },
                {
                    type: 'input',
                    label: 'Raumnummer',
                    field: 'Raumnummer',
                    cols: 'md-4',
                },
                {
                    type: 'input',
                    label: 'VNB Tarif',
                    field: 'VNBTarif',
                    cols: 'md-4',
                },
                {
                    type: 'input',
                    label: 'Sich.',
                    field: 'sicher',
                    cols: 'md-4',
                },
                {
                    type: 'input',
                    label: 'Zählernummer VNB',
                    field: 'Zählernummer',
                    cols: 'md-4',
                },
                {
                    type: 'input',
                    label: 'Mont. Ort',
                    field: 'Mont',
                    cols: 'md-4',
                },
                {
                    type: 'checkbox',
                    label: 'ZEV',
                    field: 'zev',
                    cols: 'md-4',
                },
                {
                    type: 'checkbox',
                    label: 'neu.',
                    field: 'neu',
                    cols: 'md-4',
                },
                {
                    type: 'checkbox',
                    label: 'vorh.',
                    field: 'vorh',
                    cols: 'md-4',
                },
                {
                    type: 'checkbox',
                    label: 'ausw.',
                    field: 'ausw',
                    cols: 'md-4',
                },
                {
                    type: 'checkbox',
                    label: 'dem.',
                    field: 'dem',
                    cols: 'md-4',
                },
                {
                    type: 'checkbox',
                    label: 'umm.',
                    field: 'umm',
                    cols: 'md-4',
                },
            ]

        },
        ...buttons

    ]
}


export const values_IA = {
    standort: 'Bernstrasse 128\n3072 Ostermundigen',
    gebaeudeart: 'MFH',
    Gemeinde: 'Muri',
    anzEinheiten: 1,
    Parzelle: '2',
    VersicherungsNr: '120',
    verwaltung_name: 'Markus Plattenbeläge',
    verwaltung_name2: 'Zementfliesen',
    verwaltung_adresse: 'Bleienbachstrasse 26b',
    verwaltung_plz: '4900',
    verwaltung_ort: 'Langenthal',
    verwaltung_tel: '079 603 64 04',
    steuereinrichtungen: [
        {
            kunde: "Meier, Bern",
            rechnungsadresse: 'Bernstrasse 111, 3001 Bern',
            gebaeudeteil: '1. OG',
            Raumnummer: '2',
        },
        {
            kunde: "Karrer, Zürich",
            rechnungsadresse: 'Brandschenkestrasse 90, 8002 Zürich',
            gebaeudeteil: '1. UG',
            Raumnummer: '1',
        },
    ]



}