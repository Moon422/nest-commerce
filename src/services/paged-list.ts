import { SelectQueryBuilder, ObjectLiteral } from 'typeorm'

export default interface PagedList<T> {
  data: T[]
  pageIndex: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasPreviousPage: number
  hasNextPage: number
}

export async function toPagedList<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  page: number = 1,
  limit: number = 20,
): Promise<PagedList<T>> {
  // Get total count before applying pagination
  const totalCount = await queryBuilder.getCount()

  // Apply pagination
  const offset = (page - 1) * limit
  const paginatedQuery = queryBuilder.skip(offset).take(limit)

  // Execute query
  const data = await paginatedQuery.getMany()

  // Calculate pagination info
  const totalPages = Math.ceil(totalCount / limit)
  const hasPreviousPage = page > 1 ? 1 : 0
  const hasNextPage = page < totalPages ? 1 : 0

  return {
    data,
    pageIndex: page,
    pageSize: limit,
    totalCount,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  }
}
