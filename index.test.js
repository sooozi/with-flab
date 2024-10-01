let obj = {
    a: 1,
    b: [1, 2, 3],
    c: {
        hello: Symbol("hello"),
        d: {
            m: new Map(),
        },
    },
};

// 방법 1. 재귀함수
function deepClone(value, weakMap = new WeakMap()) {
// 기본 타입 처리
if (typeof value !== 'object' || value === null) {
    return value;
}

// 순환 참조 처리
if (weakMap.has(value)) {
    return weakMap.get(value);
}

let clone;

// 배열 처리
if (Array.isArray(value)) {
    clone = [];
    weakMap.set(value, clone);
    value.forEach((item, index) => {
        clone[index] = deepClone(item, weakMap);
    });
    return clone;
}

// Date 처리
if (value instanceof Date) {
    return new Date(value);
}

// RegExp 처리
if (value instanceof RegExp) {
    return new RegExp(value);
}

// Map 처리
if (value instanceof Map) {
    clone = new Map();
    weakMap.set(value, clone);
    value.forEach((v, k) => {
        clone.set(k, deepClone(v, weakMap));
    });
    return clone;
}

// Set 처리
if (value instanceof Set) {
    clone = new Set();
    weakMap.set(value, clone);
    value.forEach(v => {
        clone.add(deepClone(v, weakMap));
    });
    return clone;
}

// 일반 객체 처리
clone = Object.create(Object.getPrototypeOf(value));
weakMap.set(value, clone);

Reflect.ownKeys(value).forEach(key => {
    clone[key] = deepClone(value[key], weakMap);
});

return clone;
}

let copiedObj = deepClone(obj);
console.log(copiedObj);

// 방법 2. Lodash
const _ = require('lodash');
const copiedObjLodash = _.cloneDeep(obj);
console.log(copiedObjLodash);



// [테스트 케이스 추가]
//jest 사용 시 적어도 하나의 테스트 케이스를 포함해야함!
//=> 테스트 목적 : Jest는 JavaScript 테스트 프레임워크로, 코드의 동작을 검증하기 위해 설계되었다. 따라서 어떤 기능을 테스트하지 않으면 Jest의 기본적인 목적에 맞지 않게 된다.
//=> 코드의 신뢰성 검증 : 테스트 케이스가 없으면 코드가 올바르게 작동하는지 확인할 수 없기 때문에 신뢰성 검증이 어렵다.

describe('Deep Clone Function', () => { //describe 블록: 테스트 스위트를 정의
    it('should correctly deep clone an object', () => { //it 블록 : 실제 테스트 케이스를 정의
        let obj = {
            a: 1,
            b: [1, 2, 3],
            c: {
                hello: Symbol("hello"),
                d: {
                    m: new Map(),
                },
            },
        };

        let copiedObj = deepClone(obj);

        // 복사된 객체가 원본 객체와 동일한지 확인
        expect(copiedObj).toEqual(obj); //expect 및 toEqual: 테스트의 결과를 확인
        // 깊은 복사 확인: 원본 객체를 변경해도 복사된 객체에 영향을 주지 않음
        obj.b.push(4);
        expect(copiedObj.b).not.toContain(4);
    });
});

// Lodash 깊은 복사 테스트 추가
describe('Lodash Deep Clone', () => {
    it('should correctly deep clone an object using lodash', () => {
        let obj = {
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

        // 복사된 객체가 원본 객체와 동일한지 확인
        expect(copiedObjLodash).toEqual(obj);
        // 깊은 복사 확인: 원본 객체를 변경해도 복사된 객체에 영향을 주지 않음
        obj.b.push(4);
        expect(copiedObjLodash.b).not.toContain(4);
    });
});