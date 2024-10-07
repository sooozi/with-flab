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