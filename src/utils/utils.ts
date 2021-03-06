import { useLocation } from "react-router-dom";

export const onlyUnique = (value: any, index: number, self: any) => {
    return self.indexOf(value) === index;
}

export const formatNumber = (num: number, precision: number = 5): string => {
    const n = Math.pow(10, precision);
    return (Math.round((num + Number.EPSILON) * n) / n).toString()
}

export interface HashTable<T> {
    [key: string]: T;
}

export interface HashTableArray<T> {
    [key: string]: Array<T>;
}

export interface HasId {
    id: string;
}

export const convertToHashTable = (array: Array<HasId>): HashTable<HasId> => {
    return array.map((biz: HasId) => {
        return {[biz.id]: biz}
    }).reduce((pv: HashTable<HasId>, nv: HashTable<HasId>) => {
        return {...pv, ...nv}
    });
};

export const convertToHashTable2 = <T>(array: Array<T>): HashTable<T> => {
    return array.map((biz: any) => {
        return {[biz.id]: biz}
    }).reduce((pv: HashTable<T>, nv: HashTable<T>) => {
        return {...pv, ...nv}
    });
};

export function useQuery() {
    return new URLSearchParams(useLocation().search);
}