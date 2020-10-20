# Atomic Design ESLint Plugin

[![npm version](https://badge.fury.io/js/eslint-plugin-atomic-design-hierarchy.svg)](https://badge.fury.io/js/eslint-plugin-atomic-design-hierarchy)
![david-dm](https://david-dm.org/robinalaerts1/eslint-plugin-atomic-design-hierarchy.svg)

A simplistic plugin that enforces atomic design hierarchy. 
The plugin allows you to define a components folder containing component level divisions (e.g. atoms, molecules, ...).
The plugin will check each file in the components folder for imports that don't follow the design hierarchy.

## installation

``npm i eslint-plugin-atomic-design-hierarchy``

## Usage

Add the plugin to your eslint config file

```
"plugins": [
    "atomic-design-hierarchy"
],
```

Next, enable the rule

``"atomic-design-hierarchy/hierarchical-import": "error"``

## Configuring

### default values

component folder: 'components'

design hierarchy: 
* atoms = 0
* molecules = 1
* organisms = 2
* templates = 3
* pages = 4

### options
You can change the design hierarchy, both names and levels are configurable. 
The plugin will only check imports in these folders located under the components folder. 

You can also change the root components folder name. 
The plugin will only check files and imports within this folder.
```
"atomic-design-hierarchy/hierarchical-import": [
    "error",
    {
        "atoms": 0,
        "molecules": 1,
        "organisms": 2,
        "templates": 3,
        "pages": 4,
    },
    "components"
]
```

## Examples

from `**/components/**/molecules/ComponentX`

```
// valid, molecules can import atoms
import { ComponentA } from '../atoms/ComponentA'

// valid, molecules can import molecules
import { ComponentY } from './ComponentY'

// invalid, molecules can't import organisms
import { ComponentB } from '../organisms/ComponentB'
```
