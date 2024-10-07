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

//제네릭 T :
//제네릭 사용 시 함수, 클래스가 어떤 타입의 값을 다룰지 미리 정하지 않고도 여러 타입 처리 가능!
//다양한 타입의 값을 안전하게 처리할 수 있는 유용한 도구
export function deepClone<T extends object>(value: T, weakMap = new WeakMap<object, any>()): T {
    // 기본 타입 처리
    if (typeof value !== 'object' || value === null) {
        return value;
    }

    // 순환 참조 처리
    if (weakMap.has(value)) {
        return weakMap.get(value) as T; // 타입 단언
    }

    let clone: any; // any로 선언하여 다양한 타입을 처리

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
        return new Date(value) as T;
    }

    // RegExp 처리
    if (value instanceof RegExp) {
        return new RegExp(value) as T;
    }

    // Map 처리
    if (value instanceof Map) {
        clone = new Map();
        weakMap.set(value, clone);
        value.forEach((v, k) => {
            clone.set(k, deepClone(v, weakMap));
        });
        return clone as T;
    }

    // Set 처리
    if (value instanceof Set) {
        clone = new Set();
        weakMap.set(value, clone);
        value.forEach(v => {
            clone.add(deepClone(v, weakMap));
        });
        return clone as T;
    }

    // 일반 객체 처리
    clone = Object.create(Object.getPrototypeOf(value));
    weakMap.set(value, clone);

    Reflect.ownKeys(value).forEach(key => {
        const propValue = value[key as keyof T];
        if (typeof propValue === 'object' && propValue !== null) { // propValue가 객체인지 확인
            clone[key as keyof T] = deepClone(propValue, weakMap); // deepClone 호출
        } else {
            clone[key as keyof T] = propValue; // 객체가 아닐 경우 직접 할당
        }
    });

    return clone as T;
}

let copiedObj = deepClone(obj); // deepClone 함수를 사용하여 obj를 클론
console.log(copiedObj); // 클론된 객체 출력

// 방법 2. Lodash
import _ from 'lodash'; // ES 모듈 방식으로 lodash를 임포트
const copiedObjLodash = _.cloneDeep(obj); // lodash의 cloneDeep 함수를 사용하여 obj를 클론
console.log(copiedObjLodash); // 클론된 객체 출력


