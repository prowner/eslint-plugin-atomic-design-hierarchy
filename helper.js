function testHierarchy(filePath, importPath, hierarchy, componentFolder) {
    const res = new RegExp(`${componentFolder}\\/(\\w+)`, 'g').exec(filePath);
    if (res) {
        const fileLevel = res[1];
        if(fileLevel) {
            const levelsGroup = Object.keys(hierarchy).reduce((acc, cur) => {
                return `${acc}|${cur}`;
            });
            const res = new RegExp(`(${levelsGroup})`, 'g').exec(importPath);
            if (res) {
                const importLevel = res[1];
                if(hierarchy[importLevel] > hierarchy[fileLevel]) {
                    return `Cannot import ${importLevel} from ${fileLevel}`
                }
            }
        }
    }
}

module.exports = testHierarchy;
