import { CssBaseline, ThemeProvider } from '@mui/material'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import createAppTheme from '../theme'
import {
  PreferencesContext,
  type ColorMode,
  type Language,
} from './preferences'

const readCookie = (name: string) => document.cookie
  .split('; ')
  .find((entry) => entry.startsWith(`${name}=`))
  ?.split('=')[1]

const writeCookie = (name: string, value: string) => {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${name}=${value}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`
}

const getInitialMode = (): ColorMode => {
  const savedMode = readCookie('portfolio-theme')
  if (savedMode === 'light' || savedMode === 'dark') return savedMode

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

const getInitialLanguage = (): Language => {
  const savedLanguage = readCookie('portfolio-language')
  if (savedLanguage === 'pt' || savedLanguage === 'en') return savedLanguage

  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

interface PreferencesProviderProps {
  children: ReactNode
}

const PreferencesProvider = ({ children }: PreferencesProviderProps) => {
  const [mode, setMode] = useState<ColorMode>(getInitialMode)
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const theme = useMemo(() => createAppTheme(mode), [mode])

  useEffect(() => {
    document.documentElement.dataset.theme = mode
    document.documentElement.style.colorScheme = mode
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      mode === 'dark' ? '#030405' : '#eef1f3',
    )
  }, [mode])

  useEffect(() => {
    if (readCookie('portfolio-theme')) return

    const media = window.matchMedia('(prefers-color-scheme: light)')
    const handleSystemMode = (event: MediaQueryListEvent) => setMode(event.matches ? 'light' : 'dark')
    media.addEventListener('change', handleSystemMode)

    return () => media.removeEventListener('change', handleSystemMode)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
    document.title = language === 'pt'
      ? 'Henrique Bisneto | Engenheiro de Software'
      : 'Henrique Bisneto | Software Engineer'
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      language === 'pt'
        ? 'Portfólio de engenharia de software de Henrique Bisneto: produtos full stack, integrações, dados e entrega.'
        : "Henrique Bisneto's software engineering portfolio: full-stack products, integrations, data and delivery.",
    )
  }, [language])

  const toggleMode = () => {
    setMode((currentMode) => {
      const nextMode = currentMode === 'dark' ? 'light' : 'dark'
      writeCookie('portfolio-theme', nextMode)
      return nextMode
    })
  }

  const toggleLanguage = () => {
    setLanguage((currentLanguage) => {
      const nextLanguage = currentLanguage === 'pt' ? 'en' : 'pt'
      writeCookie('portfolio-language', nextLanguage)
      return nextLanguage
    })
  }

  return (
    <PreferencesContext.Provider value={{ mode, language, toggleMode, toggleLanguage }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </PreferencesContext.Provider>
  )
}

export default PreferencesProvider
