/**
* Returns differences between objects.
* @throws {Error} If keys of objects are different.
*/
export function getDifferences<T extends object>(
    obj: T,
    objToCompareWith: T,
): Partial<T> {
    const differences: Partial<T> = {}

    const keys = Object.keys(obj) as Array<keyof T>;
    for (const key of keys) {
        if (!(key in objToCompareWith)) {
            throw new Error(
                `Object to compare with has no ${key.toString()} key`,
            )
        }
        if (obj[key] !== objToCompareWith[key]) {
            differences[key] = objToCompareWith[key];
        }
    }

    return differences
}
