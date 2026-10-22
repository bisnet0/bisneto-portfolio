import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import { Box, IconButton } from '@mui/material'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { sfx } from '../../lib/sfx'

/** Floating "back to top" control in the bottom-right corner. */
const ScrollTopButton = () => {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const isBackend = location.pathname.startsWith('/backend')

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <Box
          component={motion.div}
          initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          sx={{ position: 'fixed', zIndex: 57, right: { xs: 14, md: 22 }, bottom: { xs: 14, md: 20 } }}
        >
          <IconButton
            onClick={() => {
              sfx.click()
              window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
            }}
            aria-label="Voltar ao topo"
            className={isBackend ? 'panel' : 'liquid-glass-strong'}
            sx={{
              width: 46,
              height: 46,
              borderRadius: isBackend ? '8px' : '50%',
              color: 'var(--text-primary)',
              border: isBackend ? '1px solid var(--line-strong)' : undefined,
            }}
          >
            <ArrowUpwardRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      )}
    </AnimatePresence>
  )
}

export default ScrollTopButton
