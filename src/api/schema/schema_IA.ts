import { Component } from '@angular/core';
import { SchemaManager } from '../../app/base/schemaManager';
import { ComponentType, IComponent, IComponentPartial, ISchema } from '../../app/base/types';
import { buttons } from './schemaButtons';

const adress = (PrefField: string, disabled: boolean = false): Array<IComponent> => [
    {
        type: 'input',
        field: PrefField + 'name',
        name: 'name',
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
        cols: 'md-4',
        label: 'PLZ',
        disabled
    },
    {
        label: 'Ort',
        type: 'input',
        field: PrefField + 'ort',
        cols: 'md-8',
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


const InitSidenav = (sm: SchemaManager) => {
    let menuitems: IComponent[] = [];
    sm.getCompByName('sidenav').children.forEach(c => {
        if (c.children) {
            menuitems.push({
                type: 'button',
                label: c.label,
                style: 'font-weight: 200;',
                name: 'm_' + c.name,
                onClick(sm, comp) {
                    showPanel(sm, comp);
                }
            });
        }
    });
    sm.getCompByName('sidenav').menu = menuitems;
    showPanel(sm, menuitems[0]);
}

const showPanel = (sm: SchemaManager, comp: IComponent) => {
    const pn = comp.name.substring(2);
    const sn = sm.getCompByName('sidenav');
    sn.menu.forEach(c => {
        c.color = '';
        // c.icon = '';
        c.style = 'font-weight: 200;';
    });
    comp.color = 'primary';
    // comp.icon = 'trending_flat';
    comp.style = 'font-weight: 500;';

    sn.children.forEach(c => {
        if (c.children) {
            c.hidden = true;
        }
    });
    sn.navopen = false;
    sm.getCompByName(pn).hidden = false;
    sm.getCompByName(pn).expanded = true;
}



export const schema_IA: ISchema =
{
    onInitSchema(sm) {
        InitSidenav(sm);
    },
    onMakeVisible(sm, comp) {
        if (comp.type === ComponentType.expansionspanel && comp.hidden && comp.name) {
            const menu = sm.getCompByName('m_' + comp.name);
            if (menu) {
                showPanel(sm, menu);
            }
        }
    },
    type: 'sidenav',
    style: 'min-height: 800px',
    label: 'Installationsanzeige',
    menu: [],
    name: 'sidenav',
    children: [
        {
            type: 'expansionspanel',
            expanded: true,
            label: 'Ort der Installation',
            name: 'Ort der Installation',
            children: [
                {
                    type: 'input',
                    multiline: true,
                    field: 'standort',
                    label: 'Standort',
                    disabled: true,
                    cols: 'md-3',
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
                    mask: '0*',
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
                    autofocus: true,
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
            label: 'Adressen / Geschäftspartner',
            name: 'Adressen / Geschäftspartner',
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
                            required: true,
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
                                ac.hidden = val === comp.options[1];
                                ac = sm.getCompByName('pnAdrArchitekt');
                                ac.hidden = val === comp.options[0];

                            }
                        },
                        {
                            type: 'panel',
                            style: 'margin: 10px;',
                            name: 'pnAdrVerwaltung',
                            hidden: true,
                            children: [
                                ...adress('verwaltung.', true)
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
                                ...adress('architekt.')
                            ]

                        },
                    ]
                },
            ]
        },
        {
            type: 'expansionspanel',
            label: 'Installationsbeschrieb',
            name: 'Installationsbeschrieb',
            children: [
                {
                    type: 'input',
                    field: 'installationsbeschrieb',
                    multiline: true,
                    rows: 6,
                    label: '',
                    appearance: 'outline',
                    cols: 'md-6'
                },
                {
                    type: 'select',
                    field: 'installationstyp',
                    label: 'Typ',
                    multiselect: true,
                    cols: 'md-6',
                    options: ['Neuanlage', 'Änderung/Erweit.', 'Rückbau', 'Bauanschluss', 'Temporär', 'Festplatz']
                }
            ]
        },
        {
            type: 'expansionspanel',
            label: 'Netzanschluss',
            name: 'Netzanschluss',
            children: [
                {
                    type: 'input',
                    label: 'Standort',
                    required: true,
                    field: 'StandortNetzanschluss'
                }
            ]
        },
        {
            type: 'expansionspanel',
            label: 'Verbraucher, Erzeuger, Speicher',
            name: 'Verbraucher, Erzeuger, Speicher',
            expanded: true,
            children: [
                {
                    type: 'switchpanel',
                    field: 'switch_verbraucher',
                    label: 'Liste der Verbraucher, Erzeuger, Speicher',
                    children: [
                        {
                            type: 'panel',
                            style: 'margin-top: 10px; margin-bottom: 10px;',
                            children: [
                                {
                                    type: 'checkbox',
                                    field: 'Liste_gemass_beilage',
                                    label: 'Liste gemäss Beilage'
                                },
                            ]

                        },
                        {
                            type: 'datatable',
                            label: 'Liste der Verbraucher, Erzeuger, Speicher',
                            field: 'Liste_der_Verbraucher',
                            dragdrop: true,
                            cardView: true,
                            summary(sm, comp, row) {
                                const bezeichnung = row.bezeichnung ? `Bezeichnung: <b>${row.bezeichnung}</b><br/>` : '';
                                const anzahl = row.anzahl_v ? `Anzahl: <b>${row.anzahl_v}</b><br/>` : '';
                                return {
                                    type: 'html',
                                    html: `${bezeichnung} ${anzahl}`
                                }
                            },
                            children: [
                                {
                                    type: 'input',
                                    field: 'anzahl_v',
                                    label: 'Anzahl',
                                    dataType: 'int',
                                    cols: 'md-6',
                                    mask: '0*',
                                },
                                {
                                    type: 'checkbox',
                                    field: 'verbr',
                                    label: 'Verbr.',
                                    cols: 'md-2',
                                },
                                {
                                    type: 'checkbox',
                                    field: 'erz',
                                    label: 'Erz.',
                                    cols: 'md-2',
                                },
                                {
                                    type: 'checkbox',
                                    field: 'spei',
                                    label: 'Spei.',
                                    cols: 'md-2',
                                },
                                {
                                    type: 'input',
                                    field: 'bezeichnung',
                                    label: 'Bezeichnung des Verbrauchers, Erzeugers, Speichers ',
                                    options: ['Beleuchtung', 'Kochherd mit Backofen', 'Kochherd ohne Backofen', 'Backofen', 'Geschirrspüler', 'Waschautomat', 'Waschautomat mit Zählerumschalter', 'Wäschetrockner', 'Boiler .... l, Aufheizzeit .... h', 'Motoren ohne Anschlussgesuch', 'Motoren mit Anschlussgesuch', 'Wärmepumpe ohne Anschlussgesuch', 'Wärmepumpe mit Anschlussgesuch', 'Apparat Netzrückwirkungen verursachend'],
                                    cols: 'md-8',
                                },
                                {
                                    type: 'date',
                                    field: 'tag_date',
                                    label: 'techn. Anschlussgesuch (TAG) vom',
                                    cols: 'md-4',
                                },
                                {
                                    type: 'input',
                                    field: 'anzahl',
                                    label: 'Leistung Bezug',
                                    tooltip: 'Leistung Bezug vom Netz [kVA]',
                                    dataType: 'float',
                                    cols: 'md-3',
                                    mask: '0*.0*',
                                },

                            ]
                        },
                        {
                            type: 'input',
                            dataType: 'float',
                            cols: 'md-4',
                            mask: '0*.0*',
                            label: 'Leistung Total Bezug vom Netz',
                            field: 'LeistungBezugNetz',
                            suffix: 'kVA',
                        },
                    ]
                }
            ]
        },
        {
            type: 'expansionspanel',
            label: 'Mess- und Steuereinrichtungen',
            name: 'Mess- und Steuereinrichtungen',
            children: [
                {
                    type: 'datatable',
                    label: 'Mess- und Steuereinrichtungen',
                    field: 'steuereinrichtungen',
                    required: true,
                    cardView: true,
                    dragdrop: true,
                    summary(sm, comp, row) {
                        const kunde = row.kunde ? `Kunde: <b>${row.kunde}</b><br/>` : '';
                        const rechnungsadresse = row.rechnungsadresse ? ` Rechnungsadresse: ${row.rechnungsadresse}` : '';
                        const gebaeudeteil = row.gebaeudeteil ? ` Gebäudeteil: ${row.gebaeudeteil}` : '';
                        return {
                            type: 'html',
                            html: `${kunde} ${rechnungsadresse} ${gebaeudeteil}`
                        }
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
                            cols: 'md-3',
                        },
                        {
                            type: 'input',
                            label: 'Stockwerk',
                            field: 'Stockwerk',
                            options: ['Allg.', 'UG', 'EG', '1. OG', '2. OG'],
                            cols: 'md-3',
                        },
                        {
                            type: 'input',
                            label: 'Raumnummer',
                            field: 'Raumnummer',
                            cols: 'md-3',
                        },
                        {
                            type: 'input',
                            label: 'VNB Tarif',
                            field: 'VNBTarif',
                            cols: 'md-3',
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
                        {
                            type: 'select',
                            label: 'AS Multiselect',
                            field: 'multi_1',
                            options: ['ZEV', 'neu.', 'vorh.', 'ausw.', 'dem.', 'umm.'],
                            cols: 'md-6',
                            multiselect: true,
                        }
                    ]
        
                },
        
            ]

        },
        {
            type: 'switchpanel',
            label: 'Bemerkungen',
            name: 'Bemerkungen',
            field: 'switcher_bemerkungen',
            children: [
                {
                    type: 'input',
                    multiline: true,
                    rows: 6,
                    label: 'Bemerkungen',
                    field: 'testw'
                }

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
    installationsbeschrieb: 'Neubau\nmit chinesischen Geräten',
    Parzelle: '2',
    VersicherungsNr: '120',
    verwaltung: {
        name: 'Markus Plattenbeläge',
        name2: 'Zementfliesen',
        adresse: 'Bleienbachstrasse 26b',
        plz: '4900',
        ort: 'Langenthal',
        tel: '079 603 64 04',
    },
    switcher_bemerkungen: true,
    steuereinrichtungen: [
        {
            kunde: "Meier, Bern",
            rechnungsadresse: 'Bernstrasse 111, 3001 Bern',
            gebaeudeteil: '1. OG',
            Raumnummer: '2',
            multi_1: []
        },
        {
            kunde: "Karrer, Zürich",
            rechnungsadresse: 'Brandschenkestrasse 90, 8002 Zürich',
            gebaeudeteil: '1. UG',
            Raumnummer: '1',
        },
    ]



}