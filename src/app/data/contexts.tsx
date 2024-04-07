"use client"
import {
  IBadge,
  IBrand,
  ICategory,
  IEntry,
  IEntryType,
  ILink,
} from "@/domain/types"
import { createContext, useContext, useEffect } from "react"

interface IDataContext {
  categories: ICategory[]
  links: ILink[]
  badges: IBadge[]
  entries: IEntry[]
  brands: IBrand[]
  entryTypes: IEntryType[]
}

const dataContext = createContext<IDataContext>({
  categories: [],
  links: [],
  badges: [],
  entries: [],
  brands: [],
  entryTypes: [],
})

export const useDataContext = () => {
  return useContext(dataContext)
}

export const DataProvider: React.FC<{
  children: React.ReactNode
  data: IDataContext
}> = ({ children, data }) => {
  useEffect(() => {
    console.log(data)
  }, [])
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>
}

export const useCategoriesContext = () => {
  return useDataContext().categories
}

export const useLinksContext = () => {
  return useDataContext().links
}

export const useBadgesContext = () => {
  return useDataContext().badges
}

export const useEntriesContext = () => {
  return useDataContext().entries
}
