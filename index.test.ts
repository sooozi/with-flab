import _ from 'lodash';
import { deepClone } from './src/index'; // deepClone 함수의 경로를 지정하세요

describe('deepClone', () => {
    it('should deep clone a nested object', () => {
        const obj = {
            a: 1,
            b: [1, 2, 3],
            c: {
                hello: Symbol("hello"),
                d: {
                    m: new Map(),
                },
            },
        };

        const copiedObj = deepClone(obj);

        expect(copiedObj).toEqual(obj);
        expect(copiedObj).not.toBe(obj);
        expect(copiedObj.b).not.toBe(obj.b);
        expect(copiedObj.c.d).not.toBe(obj.c.d);
        expect(copiedObj.c.hello).toBe(obj.c.hello);
    });

    it('should deep clone using Lodash', () => {
        const obj = {
            a: 1,
            b: [1, 2, 3],
            c: {
                hello: Symbol("hello"),
                d: {
                    m: new Map(),
                },
            },
        };

        const copiedObjLodash = _.cloneDeep(obj);

        expect(copiedObjLodash).toEqual(obj);
        expect(copiedObjLodash).not.toBe(obj);
        expect(copiedObjLodash.b).not.toBe(obj.b);
        expect(copiedObjLodash.c.d).not.toBe(obj.c.d);
        expect(copiedObjLodash.c.hello).toBe(obj.c.hello);
    });
});