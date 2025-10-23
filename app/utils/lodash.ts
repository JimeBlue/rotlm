import _cloneDeep from 'lodash-es/cloneDeep.js'
import _get from 'lodash-es/get.js'

export function cloneDeep<T>(value: T): T {
  return _cloneDeep(value)
}

export function get<T, K>(
  object: T,
  path: string | string[],
  defaultValue?: K,
): K | undefined {
  return _get(object, path, defaultValue)
}
