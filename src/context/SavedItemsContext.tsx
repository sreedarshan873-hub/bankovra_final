import React, { createContext, useContext, useEffect, useState } from 'react'
import { SavedItem } from '../types'

interface SavedItemsContextValue {
  items: SavedItem[]
  addItem: (item: Omit<SavedItem, 'id' | 'savedAt'>) => void
  removeItem: (id: string) => void
  clearAll: () => void
}

const STORAGE_KEY = 'bankovra_dashboard_v1'

const SavedItemsContext = createContext<SavedItemsContextValue | undefined>(undefined)

export function SavedItemsProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<SavedItem[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // ignore corrupted storage
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage may be unavailable (e.g. private mode) — fail silently
    }
  }, [items])

  const addItem: SavedItemsContextValue['addItem'] = (item) => {
    const newItem: SavedItem = {
      ...item,
      id: `${item.type}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      savedAt: new Date().toISOString(),
    }
    setItems((prev) => [newItem, ...prev])
  }

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id))
  const clearAll = () => setItems([])

  return (
    <SavedItemsContext.Provider value={{ items, addItem, removeItem, clearAll }}>
      {children}
    </SavedItemsContext.Provider>
  )
}

export function useSavedItems() {
  const ctx = useContext(SavedItemsContext)
  if (!ctx) throw new Error('useSavedItems must be used within SavedItemsProvider')
  return ctx
}
