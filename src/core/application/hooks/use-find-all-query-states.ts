import { parseAsInteger, parseAsString, useQueryStates } from "nuqs"

export function useFindALlQueryStates() {
  const [query, setQuery] = useQueryStates(
    {
      id: parseAsInteger,
      search: parseAsString,
      page: parseAsInteger,
      limit: parseAsInteger,
      status: parseAsInteger
    },
    {
      history: 'push'
    }
  )
  return {
    query,
    setQuery
  }
}
