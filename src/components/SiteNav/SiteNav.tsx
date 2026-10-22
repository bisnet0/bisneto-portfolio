import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { Box, Button, IconButton, Stack } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { siteCopy } from '../../content/portfolio'
import type { TrackId } from '../../content/tracks'
import { usePreferences } from '../../context/preferences'

interface SiteNavProps {
  track: TrackId
}

const SiteNav = ({ track }: SiteNavProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { language, mode, toggleLanguage, toggleMode } = usePreferences()
  const copy = siteCopy[language]
  const location = useLocation()
  const isBackend = track === 'backend'
  const surface = isBackend ? 'panel mono' : 'liquid-glass'

  const routeLinks = [
    { label: 'Frontend', to: '/frontend' },
    { label: 'Backend', to: '/backend' },
  ]

  const anchorLinks = track === 'hub'
    ? []
    : [
        { label: language === 'pt' ? 'Projetos' : 'Projects', href: '#projects' },
        { label: language === 'pt' ? 'Credenciais' : 'Credentials', href: '#credentials' },
        { label: language === 'pt' ? 'Contato' : 'Contact', href: '#contact' },
      ]

  const linkStyles = {
    px: 1.4,
    py: 0.9,
    borderRadius: isBackend ? '5px' : '9999px',
    color: 'text.primary',
    fontSize: isBackend ? '0.68rem' : '0.76rem',
    fontWeight: 500,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'background-color 180ms ease, color 180ms ease',
    '&:hover, &:focus-visible': { backgroundColor: 'var(--accent-soft)' },
  } as const

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        zIndex: 60,
        top: { xs: 'max(10px, env(safe-area-inset-top))', md: 16 },
        left: 0,
        width: '100%',
        px: { xs: 2, md: 4, lg: 7 },
        pointerEvents: 'none',
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ pointerEvents: 'auto' }}>
        <Box
          component={Link}
          to="/"
          className={surface}
          aria-label="Henrique Bisneto"
          sx={{
            display: 'grid',
            width: 46,
            height: 46,
            placeItems: 'center',
            borderRadius: isBackend ? '7px' : '50%',
            overflow: 'hidden',
            color: 'text.primary',
            textDecoration: 'none',
          }}
        >
          <Box
            component="img"
            src="/me/nocanva.webp"
            alt=""
            width={46}
            height={46}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 22%' }}
          />
        </Box>

        <Stack
          component="nav"
          direction="row"
          alignItems="center"
          className={isBackend ? 'panel mono' : 'liquid-glass'}
          aria-label="Primary navigation"
          sx={{ display: { xs: 'none', md: 'flex' }, borderRadius: isBackend ? '7px' : '9999px', p: 0.6, gap: 0.4 }}
        >
          {routeLinks.map((link) => {
            const active = location.pathname === link.to

            return (
              <Box
                key={link.to}
                component={Link}
                to={link.to}
                aria-current={active ? 'page' : undefined}
                sx={{
                  ...linkStyles,
                  color: active ? 'var(--page-bg)' : 'text.primary',
                  backgroundColor: active ? 'var(--accent)' : 'transparent',
                  '&:hover': { backgroundColor: active ? 'var(--accent)' : 'var(--accent-soft)' },
                }}
              >
                {link.label}
              </Box>
            )
          })}
          {anchorLinks.map((link) => (
            <Box key={link.href} component="a" href={link.href} sx={linkStyles}>
              {link.label}
            </Box>
          ))}
        </Stack>

        <Stack direction="row" spacing={0.7}>
          <Button
            onClick={toggleLanguage}
            className={surface}
            aria-label={copy.nav.switchLanguage}
            sx={{
              minWidth: 46,
              height: 46,
              borderRadius: isBackend ? '7px' : '9999px',
              color: 'text.primary',
              fontSize: '0.7rem',
              fontWeight: 600,
            }}
          >
            {language === 'pt' ? 'EN' : 'PT'}
          </Button>
          <IconButton
            onClick={toggleMode}
            className={surface}
            aria-label={`${copy.nav.switchTheme} ${mode === 'dark' ? 'light' : 'dark'}`}
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              width: 46,
              height: 46,
              borderRadius: isBackend ? '7px' : '50%',
              color: 'text.primary',
            }}
          >
            {mode === 'dark' ? <LightModeRoundedIcon fontSize="small" /> : <DarkModeRoundedIcon fontSize="small" />}
          </IconButton>
          <IconButton
            onClick={() => setMenuOpen((open) => !open)}
            className={surface}
            aria-label={menuOpen ? copy.nav.closeMenu : copy.nav.menu}
            aria-expanded={menuOpen}
            sx={{ display: { md: 'none' }, width: 46, height: 46, borderRadius: isBackend ? '7px' : '50%', color: 'text.primary' }}
          >
            {menuOpen ? <CloseRoundedIcon fontSize="small" /> : <MenuRoundedIcon fontSize="small" />}
          </IconButton>
        </Stack>
      </Stack>

      <AnimatePresence>
        {menuOpen && (
          <Box
            component={motion.nav}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={isBackend ? 'panel mono' : 'liquid-glass-strong'}
            aria-label="Mobile navigation"
            sx={{
              display: { md: 'none' },
              mt: 1,
              ml: 'auto',
              width: 'min(100%, 300px)',
              borderRadius: isBackend ? '8px' : '1.4rem',
              p: 1.2,
              pointerEvents: 'auto',
            }}
          >
            <Stack>
              {routeLinks.map((link) => (
                <Box
                  key={link.to}
                  component={Link}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  sx={{ ...linkStyles, px: 1.6, py: 1.2, fontSize: '0.82rem' }}
                >
                  {link.label}
                </Box>
              ))}
              {anchorLinks.map((link) => (
                <Box
                  key={link.href}
                  component="a"
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  sx={{ ...linkStyles, px: 1.6, py: 1.2, fontSize: '0.82rem' }}
                >
                  {link.label}
                </Box>
              ))}
              <Button
                onClick={toggleMode}
                startIcon={mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
                sx={{ justifyContent: 'flex-start', borderRadius: '6px', px: 1.6, py: 1.2, color: 'text.primary', fontSize: '0.8rem' }}
              >
                {copy.nav.switchTheme} {mode === 'dark' ? 'light' : 'dark'}
              </Button>
            </Stack>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default SiteNav
