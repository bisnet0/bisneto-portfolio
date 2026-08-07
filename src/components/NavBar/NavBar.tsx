import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { siteCopy } from '../../content/portfolio'
import { usePreferences } from '../../context/preferences'

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { language, mode, toggleLanguage, toggleMode } = usePreferences()
  const copy = siteCopy[language]
  const links = [
    { label: copy.nav.home, href: '#home' },
    { label: copy.nav.expertise, href: '#expertise' },
    { label: copy.nav.about, href: '#about' },
    { label: copy.nav.projects, href: '#projects' },
  ]

  const navLinkStyles = {
    px: 1.5,
    py: 1,
    borderRadius: '9999px',
    color: 'text.primary',
    fontSize: '0.78rem',
    fontWeight: 500,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'background-color 180ms ease',
    '&:hover, &:focus-visible': { backgroundColor: 'rgba(255,255,255,0.1)' },
  } as const

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        zIndex: 50,
        top: { xs: 'max(12px, env(safe-area-inset-top))', md: 16 },
        left: 0,
        width: '100%',
        px: { xs: 2, md: 4, lg: 8 },
        pointerEvents: 'none',
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ pointerEvents: 'auto' }}>
        <Box
          component="a"
          href="#home"
          className="liquid-glass"
          aria-label={copy.nav.home}
          sx={{
            display: 'grid',
            width: 48,
            height: 48,
            placeItems: 'center',
            borderRadius: '50%',
            color: 'text.primary',
            textDecoration: 'none',
          }}
        >
          <Typography sx={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: '1.55rem', lineHeight: 1 }}>
            hb
          </Typography>
        </Box>

        <Stack
          component="nav"
          direction="row"
          alignItems="center"
          className="liquid-glass"
          aria-label="Primary navigation"
          sx={{ display: { xs: 'none', md: 'flex' }, borderRadius: '9999px', p: 0.75 }}
        >
          {links.map((link) => (
            <Box key={link.href} component="a" href={link.href} sx={navLinkStyles}>
              {link.label}
            </Box>
          ))}
          <Button
            component="a"
            href="#contact"
            endIcon={<ArrowOutwardRoundedIcon sx={{ fontSize: '1rem !important' }} />}
            sx={{
              ml: 0.5,
              px: 2,
              py: 1,
              borderRadius: '9999px',
              color: mode === 'dark' ? '#050607' : '#fff',
              backgroundColor: mode === 'dark' ? '#fff' : '#111315',
              fontSize: '0.78rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              '&:hover': { backgroundColor: mode === 'dark' ? '#eceff1' : '#25282b' },
            }}
          >
            {copy.nav.contact}
          </Button>
        </Stack>

        <Stack direction="row" spacing={0.75}>
          <Button
            className="liquid-glass"
            onClick={toggleLanguage}
            aria-label={copy.nav.switchLanguage}
            sx={{
              minWidth: 48,
              height: 48,
              borderRadius: '9999px',
              color: 'text.primary',
              fontSize: '0.72rem',
              fontWeight: 600,
            }}
          >
            {language === 'pt' ? 'EN' : 'PT'}
          </Button>
          <IconButton
            className="liquid-glass"
            onClick={toggleMode}
            aria-label={`${copy.nav.switchTheme} ${mode === 'dark' ? 'light' : 'dark'}`}
            sx={{ display: { xs: 'none', sm: 'inline-flex' }, width: 48, height: 48, color: 'text.primary' }}
          >
            {mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
          </IconButton>
          <IconButton
            className="liquid-glass"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? copy.nav.closeMenu : copy.nav.menu}
            aria-expanded={menuOpen}
            sx={{ display: { md: 'none' }, width: 48, height: 48, color: 'text.primary' }}
          >
            {menuOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
          </IconButton>
        </Stack>
      </Stack>

      <AnimatePresence>
        {menuOpen && (
          <Box
            component={motion.nav}
            initial={{ opacity: 0, filter: 'blur(8px)', y: -10 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(8px)', y: -10 }}
            className="liquid-glass-strong"
            aria-label="Mobile navigation"
            sx={{
              display: { md: 'none' },
              mt: 1,
              ml: 'auto',
              width: 'min(100%, 310px)',
              borderRadius: '1.5rem',
              p: 1.5,
              pointerEvents: 'auto',
            }}
          >
            <Stack>
              {links.map((link) => (
                <Box
                  key={link.href}
                  component="a"
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  sx={{ ...navLinkStyles, px: 2, py: 1.5, fontSize: '0.9rem' }}
                >
                  {link.label}
                </Box>
              ))}
              <Button
                onClick={toggleMode}
                startIcon={mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
                sx={{ justifyContent: 'flex-start', borderRadius: '9999px', px: 2, py: 1.5, color: 'text.primary' }}
              >
                {copy.nav.switchTheme} {mode === 'dark' ? 'light' : 'dark'}
              </Button>
              <Button
                component="a"
                href="#contact"
                onClick={() => setMenuOpen(false)}
                endIcon={<ArrowOutwardRoundedIcon />}
                sx={{ mt: 1, borderRadius: '9999px', color: '#050607', backgroundColor: '#fff' }}
              >
                {copy.nav.contact}
              </Button>
            </Stack>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default NavBar
