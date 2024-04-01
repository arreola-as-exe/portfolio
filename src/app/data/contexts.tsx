"use client"
import { IBadge, ICategory, ILink } from "@/domain/types"
import { createContext, useContext } from "react"

interface IDataContext {
  categories: ICategory[]
  links: ILink[]
  badges: IBadge[]
}

const dataContext = createContext<IDataContext>({
  categories: [],
  links: [],
  badges: [],
})

export const useDataContext = () => {
  return useContext(dataContext)
}

export const DataProvider: React.FC<
  {
    children: React.ReactNode,
    data: IDataContext
  }
> = ({ children, data }) => {
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>
}

export const useCategoriesContext = () => {
  return useDataContext().categories
}

export const useLinksContext = () => {
  return useDataContext().links
}
