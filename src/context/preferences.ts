import { createContext, useContext } from 'react'

export type ColorMode = 'light' | 'dark'
export type Language = 'pt' | 'en'

interface PreferencesContextValue {
  mode: ColorMode
  language: Language
  toggleMode: () => void
  toggleLanguage: () => void
}

export const PreferencesContext = createContext<PreferencesContextValue | null>(null)

export const usePreferences = () => {
  const context = useContext(PreferencesContext)

  if (!context) {
    throw new Error('usePreferences must be used inside PreferencesProvider')
  }

  return context
}
