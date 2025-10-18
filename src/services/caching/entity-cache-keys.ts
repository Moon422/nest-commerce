export function cacheKeyById(typeName: string): string {
  return `nest.${typeName}.byid.{0}`
}

export function cacheKeyByIds(typeName: string): string {
  return `nest.${typeName}.byids.{0}`
}

export function cacheKeyAll(typeName: string): string {
  return `nest.${typeName}.all`
}
