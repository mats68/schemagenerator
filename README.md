# Schemagenerator

ng new schemagenerator  
ng add @angular/material

## Features
- uses angular-material
- Components: input, checkbox,  button, 
  - Autocomplete: input with option, filter
  - nur input; kein autocomplete
  - autocomplete nur string[] options
  - Select options with strings or objects like {value: 1, text: 'one'}...
  - common properties: label, field, width, style, default
  - types defined for component
  - datatype: number, float..
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
- switch language
- switch schema at runtime
- switch values at runtime
- refresh UI 
- load external js file (schema)
- text-mask
- grid system (cols-property)

### todo:
- not validate bug in grid
- input prefix und suffix (icon oder text)npm install --save ngx-mask
- settings objekt 
- sm.translate function ("de", "fr", "it")
- Components: select, radio, label, ja/nein Panel,Date, Sidenav ?, Tabs ?
- schemamanager innerhalb mt-form
- readonly 
- default properties, for inputs (eg. appearance) in schema
- validation
  panel with all errors, (mit Feldnamen am anfang, can jump)
- Validation
  - disabled (input, check, btn...)
- Button type: 'standard', 'raised', 'stroked', 'flat', 'icon', 'fab', 'mini-fab' 
         link: (falls link, dann <a>)
         icon: (falls type = 'icon', 'fab', 'mini-fab')
  
- Grid system ?
- unbound Fields (not in Values)
- exp.panel ev. expanded on start
- input w prefix, suffix, hint, multiline
- übersetzung (label, titel, hint, placeholder als funktion)
- tooltip
- split
