export type Item = {
    name: string,
    description: string,
    contents: string,
    unitPrice: number,
    note: string,
}
export const sumItem = (a: Item, b: Item) => a.unitPrice + b.unitPrice

export interface Product {
    name: string,
    description: string,
    contents: string,
    unitPrice: number,
    note: string,
}
export const sumProduct = (a: Product, b: Product) => a.unitPrice + b.unitPrice