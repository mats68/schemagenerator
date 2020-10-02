import { SchemaManager } from '../../app/base/schemaManager';
import { IComponent, ISchema, ComponentType, ButtonKind, Color } from '../../app/base/types';
import { buttons } from './schemaButtons'

const showPanel = (sm: SchemaManager, comp: IComponent) => {
    const pn = comp.name.substring(2);
    sm.getCompByName('sidenav').menu.forEach(c => {
        c.color = '';
        c.icon = '';
        c.style = 'font-weight: 200;';
    });
    comp.color = 'primary';
    comp.icon =  'trending_flat';
    comp.style = 'font-weight: 500;';

    sm.getCompByName('sidenav').children.forEach(c => {
        c.hidden = true;
    });
    sm.getCompByName(pn).hidden = false;
    sm.getCompByName(pn).expanded = true;
}

export const schema2: ISchema =
{
    type: 'form',
    name: 'schema2',
    onInitSchema(sm) {
        let menuitems: IComponent[] = [];
        sm.getCompByName('sidenav').children.forEach(c => {
            menuitems.push({
                type: 'button',
                label: c.label,
                style: 'font-weight: 200;',
                name: 'm_' + c.name,
                onClick(sm, comp) {
                    showPanel(sm, comp);
                }
            })
        });
        sm.getCompByName('sidenav').menu = menuitems;
    },
    children: [
        {
            type: 'sidenav',
            name: 'sidenav',
            menu: [
                {
                    type: 'button',
                    label: 'Button1',
                }
            ],
            children: [
                {
                    label: 'Inputs',
                    type: 'expansionspanel',
                    name: 'inputs',
                    children: [
                        {
                            type: 'input',
                            name: 'firstInput',
                            label: 'Text1',
                            field: 'text1',
                            required: true,
                        },
                        {
                            type: 'input',
                            name: 'secondInput',
                            label: 'Text2',
                            field: 'text2',
                            required: true,
                        },
                    ]
                },
                {
                    label: 'Check & Radio',
                    type: 'expansionspanel',
                    name: 'Check & Radio',
                    children: [
                        {
                            type: 'checkbox',
                            label: 'check1',
                            required: true,
                            field: 'check1',
                        },
                        {
                            type: 'switch',
                            label: (sm, comp) => {
                                return sm.getValue(comp) ? 'Ja' : 'Nein';
                            },
                            required: true,
                            field: 'switch1',
                        },
                        {
                            type: 'radiogroup',
                            label: 'Radiogroup',
                            cols: 'sm-12',
                            dataType: 'int',
                            options: [{ value: 1, text: 'Eins' }, { value: 2, text: 'Zwei' }, { value: 3, text: 'Drei' }, { value: 4, text: 'Vier' }],
                            required: true,
                            field: 'radio1',
                        }
                    ]
                },
                {
                    label: 'Card & Panel',
                    name: 'Card & Panel',
                    type: 'expansionspanel',
                    children: [
                        {
                            type: 'card',
                            label: 'Card',
                            children: [
                                {
                                    type: 'label',
                                    label: 'Label1'
                                }
                            ]
                        },
                        {
                            type: 'panel',
                            children: [
                                {
                                    type: 'label',
                                    label: 'Label2'
                                }
                            ]

                        },
                        {
                            type: 'html',
                            style: 'margin: 10px;',
                            html: `<p>was ist <b>lost</b> </p>`

                        },
                        {
                            type: 'html',
                            style: 'margin: 10px;',
                            label: 'Thaler',
                            html: (sm, comp) => {
                                return `<div class="row">
                                        <div class="col-lg-6">Thaler1</div>
                                        <div class="col-lg-6">Thaler2</div>
                                    </div> `;
                            }

                        },
                    ]
                },
                {
                    label: 'Test',
                    name: 'Test',
                    type: 'expansionspanel',
                    children: [
                        {
                            type: 'input',
                            label: 'Test',
                            field: 'Test',
                            required: true,
                        },
                        {
                            type: 'input',
                            label: 'Test2',
                            field: 'Test2',
                            required: true,
                        },
                    ]
                },
                {
                    label: 'Selects',
                    name: 'Selects',
                    type: 'expansionspanel',
                    children: [
                        {
                            type: 'select',
                            label: 'Numerischer Wert',
                            field: 'select1',
                            dataType: 'int',
                            required: true,
                            options: [{ value: 1, text: 'Eins' }, { value: 2, text: 'Zwei' }, { value: 3, text: 'Drei' }, { value: 4, text: 'Vier' }]
                        },
                        {
                            type: 'select',
                            label: 'Text',
                            field: 'select2',
                            required: true,
                            options: ['Eins', 'Zwei', 'Drei', 'Vier']
                        },
                        {
                            type: 'select',
                            label: 'Multiselect Numerischer Wert',
                            multiselect: true,
                            field: 'multiselect1',
                            required: true,
                            options: [{ value: 1, text: 'Eins' }, { value: 2, text: 'Zwei' }, { value: 3, text: 'Drei' }, { value: 4, text: 'Vier' }]
                        },
                        {
                            type: 'select',
                            label: 'Multiselect Text',
                            field: 'multiselect2',
                            multiselect: true,
                            required: true,
                            options: ['Eins', 'Zwei', 'Drei', 'Vier']
                        },
                        {
                            type: 'input',
                            label: 'Multiselect Chips',
                            field: 'multiselect_chips1',
                            multiselect: true,
                        },
                        {
                            type: 'input',
                            label: 'Multiselect Chips with options',
                            field: 'multiselect_chips2',
                            multiselect: true,
                            options: ['Eins', 'Zwei', 'Drei', 'Vier']
                        },
                    ]
                }
            ]
        }
    ]
}


export const values2 = {
    text1: 'Text 2',
    // multiselect_chips1 : ['Eins']
}

