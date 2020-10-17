const DEFAULT_HIERARCHY = {
    atoms: 0,
    molecules: 1,
    organisms: 2,
    templates: 3,
    pages: 4
};

const DEFAULT_COMPONENTS_FOLDER = 'components';

module.exports.rules = {
    "hierarchical-import": {
        meta: {
            schema: [
                {
                    "type": "object",
                    "additionalProperties": true
                },
                {
                    "type": "string"
                }
            ]
        },
        create: context =>
            ({
                ImportDeclaration: ( node ) => {
                    const hierarchy = context.options[0] || DEFAULT_HIERARCHY;
                    const fn = context.getFilename();
                    const res = new RegExp(`${context.options[1] || DEFAULT_COMPONENTS_FOLDER}\\/(\\w+)`, 'g').exec(fn);
                    if (res) {
                        const fileLevel = res[1];
                        if(fileLevel) {
                            const importLocation = node.source.value;
                            const res = new RegExp(/(atoms|molecules|organisms|templates|pages)/g).exec(importLocation);
                            if (res) {
                                const importLevel = res[1];
                                if(hierarchy[importLevel] > hierarchy[fileLevel]) {
                                    context.report(node, `Cannot import ${importLevel} from ${fileLevel}`);
                                }
                            }
                        }
                    }

                }
            })
    }
};
