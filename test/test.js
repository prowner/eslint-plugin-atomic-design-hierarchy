const validateHierarchy = require('../helper');

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
        const errors = validateHierarchy(filePath, '../atoms/ComponentA', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });

    it('allow horizontal import', () => {
        const errors = validateHierarchy(filePath, './ComponentY', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });

    it('disallow upward import', () => {
        const errors = validateHierarchy(filePath, '../organisms/ComponentB', hierarchy, componentFolder);
        expect(errors).toEqual('Cannot import organisms from molecules');
    });

    it('ignore source files outside of components folder', () => {
        const errors = validateHierarchy(filePathOutsideComponentsFolder, '../organisms/ComponentB', hierarchy, componentFolder);
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
        const errors = validateHierarchy(filePath, '../atoms/ComponentA', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });

    it('allow horizontal import', () => {
        const errors = validateHierarchy(filePath, './ComponentY', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });

    it('disallow upward import', () => {
        const errors = validateHierarchy(filePath, '../organisms/ComponentB', hierarchy, componentFolder);
        expect(errors).toEqual('Cannot import organisms from molecules');
    });

    it('ignore source files outside of components folder', () => {
        const errors = validateHierarchy(filePathOutsideComponentsFolder, '../organisms/ComponentB', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });
});

describe('Validate hierarchy with custom hierarchy names', () => {
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
        const errors = validateHierarchy(filePath, '../levelOne/ComponentA', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });

    it('allow horizontal import', () => {
        const errors = validateHierarchy(filePath, './ComponentY', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });

    it('disallow upward import', () => {
        const errors = validateHierarchy(filePath, '../levelThree/ComponentB', hierarchy, componentFolder);
        expect(errors).toEqual('Cannot import levelThree from levelTwo');
    });

    it('ignore source files outside of components folder', () => {
        const errors = validateHierarchy(filePathOutsideComponentsFolder, '../levelThree/ComponentB', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });
});

describe('Validate hierarchy with custom hierarchy levels', () => {
    const filePath = 'src/components/particles/ComponentX';

    const hierarchy = {
        atoms: 0,
        particles: 1,
        molecules: 1,
        organisms: 2,
        templates: 3,
        pages: 4
    };

    const componentFolder = 'components';

    it('allow downward import', () => {
        const errors = validateHierarchy(filePath, '../atoms/ComponentA', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });

    it('allow horizontal import of same type', () => {
        const errors = validateHierarchy(filePath, './ComponentY', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });

    it('allow horizontal import of different type', () => {
        const errors = validateHierarchy(filePath, '../molecules/ComponentB', hierarchy, componentFolder);
        expect(errors).toEqual(undefined);
    });

    it('disallow upward import', () => {
        const errors = validateHierarchy(filePath, '../organisms/ComponentC', hierarchy, componentFolder);
        expect(errors).toEqual('Cannot import organisms from particles');
    });
});
