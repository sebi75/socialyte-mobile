/**
 * Checks obj type. If obj is undefined will return false
 * @param obj Object to type check
 * @param typePrimitive Expected type
 */
export const checkType = (obj: any, typePrimitive: string) =>
  typeof obj == typePrimitive

/**
 * Checks obj type. If obj is undefined, will return true
 * @param obj Object to type check
 * @param typePrimitive Expected type
 */
export const checkPossibleType = (obj: any, typePrimitive: string) =>
  !obj || checkType(obj, typePrimitive)
