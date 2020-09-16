# Schemagenerator

ng new schemagenerator  
ng add @angular/material

## Features
- uses angular-material
- Components: input, checkbox, autocomplete, button, 
  - Autocomplete: filter, add free items to list
  - common properties: label, field, width, style, default
 - Containers: form, panel, expansionpanel
   - Card Grid
  - label,hint, placeholder etc. as function
  - default value 
- Values Object
- Validation
  - required, function
  - validate per field
  - validate all (on submit)
  - requrired fields with *         
- properties can be functions or value
- check if form has changed (enable button)


### todo:

- types for schema, component
- grid: sub-schemaManger
- grid system
- readonly 
- default properties, for inputs (eg. appearance) in schema
- validation
  panel with all errors, (mit Feldnamen am anfang, can jump)
- Components: select, radio, ja/nein Panel,Date, Sidenav ?, Tabs ?
- Validation
  - disabled (input, check, btn...)
- Button type: '', 'raised', 'stroked', 'flat', 'icon', 'fab', 'mini-fab' 
         link: (falls link, dann <a>)
         icon: (falls type = 'icon', 'fab', 'mini-fab')
  
- Grid system ?
- unbound Fields (not in Values)
- exp.panel ev. expanded on start
- input w prefix, suffix, hint, multiline
- übersetzung (label, titel, hint, placeholder als funktion)
- autocomplete value not read
- tooltip
- split
