import deepmerge from "deepmerge";

export function deepCopy<Type>(value: Type): Type {
  return deepmerge({}, value);
}
