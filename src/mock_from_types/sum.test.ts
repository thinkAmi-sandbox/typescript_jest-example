import { sumItem, Item, sumProduct, Product } from './sum'
import {mock, MockProxy} from "jest-mock-extended";

// ------------------------------
// Jest only
// ------------------------------
describe('Jest only', () => {
    const itemFactory = (unitPrice: Pick<Item, 'unitPrice'>['unitPrice']): jest.Mocked<Item> => {
        const mockObject: jest.Mocked<Item> = jest.createMockFromModule<Item>('./sum')
        mockObject.unitPrice = unitPrice

        return mockObject
    }

    test('sumItem', () => {
        // jest.createMockFromModule<MyInterface>()を使用して、Itemを実装したモックオブジェクトを作成
        // 型注釈なしでも動作するが、可読性のために付けている
        const a: jest.Mocked<Item> = jest.createMockFromModule<Item>('./sum')
        a.unitPrice = 100

        const b: jest.Mocked<Item> = jest.createMockFromModule<Item>('./sum')
        b.unitPrice = 250

        expect(sumItem(a, b)).toBe(350)

        expect(a.name).toBe(undefined)
        expect(b.name).toBe(undefined)
    })

    test('sumItem with factory', () => {
        const a: jest.Mocked<Item> = itemFactory(100)
        const b: jest.Mocked<Item> = itemFactory(250)

        expect(sumItem(a, b)).toBe(350)

        expect(a.name).toBe(undefined)
        expect(b.name).toBe(undefined)
    })

    test('sumProduct', () => {
        const a: jest.Mocked<Product> = jest.createMockFromModule<Product>('./sum')
        a.unitPrice = 200

        const b: jest.Mocked<Product> = jest.createMockFromModule<Product>('./sum')
        b.unitPrice = 400

        expect(sumProduct(a, b)).toBe(600)

        expect(a.name).toBe(undefined)
        expect(b.name).toBe(undefined)
    })
})

// ------------------------------
// Jest with jest-mock-extended
// ------------------------------
describe('Jest with jest-mock-extended', () => {
    test('sumItem', () => {
        // type文の場合、初期値の設定も行える
        const a: MockProxy<Item> = mock<Item>({unitPrice: 100})
        const b: MockProxy<Item> = mock<Item>({unitPrice: 200})

        expect(sumItem(a, b)).toBe(300)

        // undefinedではなく、 [Function mockConstructor] が返ってくる
        // expect(a.name).toBe(undefined)
        // => Expected: undefined, Received: [Function mockConstructor]
    })

    test('sumProduct', () => {
        // interfaceの場合、以下のエラーが出るため、初期値の設定は後で行う
        // Argument type {unitPrice: number} is not assignable to parameter type import("ts-essentials").DeepPartial<Product> | undefined
        // const a: MockProxy<Product> = mock<Product>({unitPrice: 100})

        const a: MockProxy<Product> = mock<Product>()
        a.unitPrice = 100

        const b: MockProxy<Product> = mock<Product>()
        b.unitPrice = 200

        expect(sumItem(a, b)).toBe(300)

        // undefinedではなく、 [Function mockConstructor] が返ってくる
        // expect(a.name).toBe(undefined)
        // => Expected: undefined, Received: [Function mockConstructor]
    })
})
