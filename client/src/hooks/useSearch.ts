import { useMemo } from 'react'
import { IContact } from '../types/contact'

function SortData(x: IContact, y: IContact) {
  return x.name.localeCompare(y.name)
}

export const useSearch = (contacts: IContact[], query: string) => {
  const searchedContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, contacts])
  return searchedContacts.sort(SortData)
}
