const testHierarchy = require('../helper');

describe('Validate hierarchy with default config', () => {
    const filePath = 'src/components/molecules/ComponentX';
    const filePathOutsideComponentsFolder = 'src/components-alt/molecules/ComponentX';

    const hierarchy = {
        atoms: 0,
        molecules: 1,
        organisms: 2,
        templates: 3,
        pages: 4
    };

    const componentFolder = 'components';

    it('allow downward import', () => {
        const errors = testHierarchy(filePath, '../atoms/ComponentA', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });

    it('allow horizontal import', () => {
        const errors = testHierarchy(filePath, './ComponentY', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });

    it('disallow upward import', () => {
        const errors = testHierarchy(filePath, '../organisms/ComponentB', hierarchy, componentFolder);
        expect(errors).toEqual('Cannot import organisms from molecules');
    });

    it('ignore source files outside of components folder', () => {
        const errors = testHierarchy(filePathOutsideComponentsFolder, '../organisms/ComponentB', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });
});

describe('Validate hierarchy with custom components folder', () => {
    const filePath = 'src/components-alt/molecules/ComponentX';
    const filePathOutsideComponentsFolder = 'src/components/molecules/ComponentX';

    const hierarchy = {
        atoms: 0,
        molecules: 1,
        organisms: 2,
        templates: 3,
        pages: 4
    };

    const componentFolder = 'components-alt';

    it('allow downward import', () => {
        const errors = testHierarchy(filePath, '../atoms/ComponentA', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });

    it('allow horizontal import', () => {
        const errors = testHierarchy(filePath, './ComponentY', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });

    it('disallow upward import', () => {
        const errors = testHierarchy(filePath, '../organisms/ComponentB', hierarchy, componentFolder);
        expect(errors).toEqual('Cannot import organisms from molecules');
    });

    it('ignore source files outside of components folder', () => {
        const errors = testHierarchy(filePathOutsideComponentsFolder, '../organisms/ComponentB', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });
});

describe('Validate hierarchy with custom hierarchy', () => {
    const filePath = 'src/components/levelTwo/ComponentX';
    const filePathOutsideComponentsFolder = 'src/components-alt/levelTwo/ComponentX';

    const hierarchy = {
        levelOne: 0,
        levelTwo: 1,
        levelThree: 2,
        levelFour: 3,
        levelFive: 4
    };

    const componentFolder = 'components';

    it('allow downward import', () => {
        const errors = testHierarchy(filePath, '../levelOne/ComponentA', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });

    it('allow horizontal import', () => {
        const errors = testHierarchy(filePath, './ComponentY', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });

    it('disallow upward import', () => {
        const errors = testHierarchy(filePath, '../levelThree/ComponentB', hierarchy, componentFolder);
        expect(errors).toEqual('Cannot import levelThree from levelTwo');
    });

    it('ignore source files outside of components folder', () => {
        const errors = testHierarchy(filePathOutsideComponentsFolder, '../levelThree/ComponentB', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });
});
