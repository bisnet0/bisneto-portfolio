import { Box, Stack, Typography } from '@mui/material'
import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import type { Award, Credential } from '../../content/credentials'
import { awards, certificates, studies } from '../../content/credentials'
import { usePreferences } from '../../context/preferences'
import AutoCarousel from '../AutoCarousel/AutoCarousel'
import GalleryDialog from '../GalleryDialog/GalleryDialog'

type Track = 'frontend' | 'backend' | 'hub'

interface CredentialsProps {
  track: Track
}

interface GalleryState {
  title: string
  subtitle?: string
  images: string[]
  link?: { label: string; url: string }
}

interface CardProps {
  track: Track
  onOpen: () => void
  reduced: boolean
}

const RANK_LABEL = {
  1: { pt: '1º lugar', en: '1st place' },
  2: { pt: '2º lugar', en: '2nd place' },
} as const

/**
 * The card components live at module scope on purpose: declaring them inside
 * <Credentials /> made React remount the whole grid on every parent render (the hub
 * re-renders when the hero persona flips), which restarted the pulse animations and
 * looked like the section was blinking.
 */
const AwardCard = ({
  award,
  language,
  track,
  reduced,
  onOpen,
}: CardProps & { award: Award; language: 'pt' | 'en' }) => {
  const isBackend = track === 'backend'
  const isGold = award.rank === 1

  return (
    <Box
      component={motion.article}
      initial={reduced ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`${isBackend ? 'panel mono' : 'liquid-glass'} award-card ${isGold ? 'award-card--gold' : 'award-card--silver'}`}
      sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: isBackend ? '12px' : '1.6rem' }}
    >
      <Box sx={{ position: 'relative' }}>
        <AutoCarousel images={award.images} alt={award.title[language]} aspectRatio="16 / 9" onActivate={onOpen} />
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.75) 100%)' }} />
        <Box
          className={`rank-badge ${isGold ? 'rank-badge--gold' : 'rank-badge--silver'}`}
          sx={{
            position: 'absolute',
            zIndex: 4,
            pointerEvents: 'none',
            top: 14,
            left: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            px: 1.3,
            py: 0.6,
            borderRadius: '9999px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: isGold ? '#2b2100' : '#1d2327',
            backgroundColor: isGold ? 'rgba(240, 200, 80, 0.92)' : 'rgba(214, 222, 228, 0.92)',
          }}
        >
          {award.rank === 1 ? '🏆' : '🥈'} {RANK_LABEL[award.rank][language]}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, p: { xs: 2, md: 2.4 } }}>
        <Typography className="mono" sx={{ color: 'var(--accent)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {award.issuer[language]} · {award.date[language]}
        </Typography>
        <Typography
          component="h3"
          sx={{
            fontFamily: isBackend ? 'var(--font-mono)' : 'var(--font-display)',
            fontStyle: isBackend ? 'normal' : 'italic',
            fontSize: { xs: '1.4rem', md: '1.8rem' },
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
        >
          {award.title[language]}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.65 }}>
          {award.description[language]}
        </Typography>
        {award.links && (
          <Stack direction="row" gap={1} flexWrap="wrap" sx={{ pt: 0.5 }}>
            {award.links.map((link) => (
              <Box
                key={link.url}
                component="a"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mono"
                sx={{
                  px: 1.2,
                  py: 0.5,
                  borderRadius: isBackend ? '4px' : '9999px',
                  border: '1px solid var(--line)',
                  color: 'text.primary',
                  fontSize: '0.6rem',
                  textDecoration: 'none',
                  '&:hover': { borderColor: 'var(--accent)', color: 'var(--accent)' },
                }}
              >
                {link.label}
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  )
}

const CertificateCard = ({ item, language, track, reduced, onOpen }: CardProps & { item: Credential; language: 'pt' | 'en' }) => {
  const isBackend = track === 'backend'

  return (
    <Box
      component={motion.article}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`${isBackend ? 'panel mono' : 'liquid-glass'} cert-card`}
      sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: isBackend ? '10px' : '1.2rem' }}
    >
      <Box sx={{ position: 'relative' }}>
        <AutoCarousel images={item.images} alt={item.title[language]} aspectRatio="16 / 10" onActivate={onOpen} />
        <Box
          sx={{
            position: 'absolute',
            zIndex: 4,
            pointerEvents: 'none',
            top: 10,
            right: 10,
            display: 'grid',
            placeItems: 'center',
            width: 26,
            height: 26,
            borderRadius: '50%',
            backgroundColor: 'rgba(6, 12, 26, 0.72)',
            border: '1px solid var(--line-strong)',
            color: 'var(--accent)',
            fontSize: '0.7rem',
          }}
        >
          ✦
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.7, p: 1.8 }}>
        <Typography className="mono" sx={{ color: 'var(--accent)', fontSize: '0.54rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {item.issuer[language]} · {item.date[language]}
        </Typography>
        <Typography component="h3" sx={{ fontFamily: isBackend ? 'var(--font-mono)' : 'var(--font-display)', fontStyle: isBackend ? 'normal' : 'italic', fontSize: { xs: '1.05rem', md: '1.25rem' }, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          {item.title[language]}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.74rem', fontWeight: 300, lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {item.description[language]}
        </Typography>
      </Box>
    </Box>
  )
}

const StudyCard = ({ item, language, track, reduced, onOpen }: CardProps & { item: Credential; language: 'pt' | 'en' }) => {
  const isBackend = track === 'backend'

  return (
    <Box
      component={motion.article}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`${isBackend ? 'panel mono' : 'liquid-glass'} study-card`}
      sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: isBackend ? '10px' : '1.3rem' }}
    >
      <AutoCarousel images={item.images} alt={item.title[language]} aspectRatio="16 / 9" onActivate={onOpen} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, p: 1.9 }}>
        <Typography className="mono" sx={{ color: 'var(--accent)', fontSize: '0.54rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {item.issuer[language]}
        </Typography>
        <Typography component="h3" sx={{ fontFamily: isBackend ? 'var(--font-mono)' : 'var(--font-display)', fontStyle: isBackend ? 'normal' : 'italic', fontSize: { xs: '1.1rem', md: '1.3rem' }, lineHeight: 1.12, letterSpacing: '-0.02em' }}>
          {item.title[language]}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.76rem', fontWeight: 300, lineHeight: 1.6 }}>
          {item.description[language]}
        </Typography>
        {item.links && (
          <Box
            component="a"
            href={item.links[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="mono"
            sx={{ mt: 0.4, color: 'var(--accent)', fontSize: '0.58rem', letterSpacing: '0.06em', textDecoration: 'none' }}
          >
            {item.links[0].label} ↗
          </Box>
        )}
      </Box>
    </Box>
  )
}

const SectionHeading = ({ kicker, title, subtitle, track }: { kicker: string; title: string; subtitle?: string; track: Track }) => {
  const isBackend = track === 'backend'

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'flex-end' }} justifyContent="space-between" gap={2} sx={{ mb: { xs: 3, md: 4 } }}>
      <Box>
        <Typography className="mono" sx={{ color: 'var(--accent)', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', mb: 1 }}>
          {kicker}
        </Typography>
        <Typography
          component="h3"
          sx={{
            fontFamily: isBackend ? 'var(--font-mono)' : 'var(--font-display)',
            fontStyle: isBackend ? 'normal' : 'italic',
            fontSize: { xs: '1.8rem', md: '2.6rem' },
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          {title}
        </Typography>
      </Box>
      {subtitle && (
        <Typography className="mono" sx={{ color: 'text.secondary', fontSize: '0.62rem', maxWidth: '38ch', lineHeight: 1.6 }}>
          {subtitle}
        </Typography>
      )}
    </Stack>
  )
}

const Credentials = ({ track }: CredentialsProps) => {
  const { language } = usePreferences()
  const reduced = Boolean(useReducedMotion())
  const [gallery, setGallery] = useState<GalleryState | null>(null)
  const isBackend = track === 'backend'

  const openCredential = (item: Credential) => {
    setGallery({
      title: item.title[language],
      subtitle: item.issuer[language],
      images: item.images,
      link: item.links?.[0],
    })
  }

  const cardProps = (item: Credential) => ({
    track,
    language,
    reduced,
    onOpen: () => openCredential(item),
  })

  return (
    <Box
      component="section"
      id="credentials"
      className="section-anchor"
      sx={{ position: 'relative', zIndex: 1, px: { xs: 2.5, md: 6, lg: 9 }, py: { xs: 10, md: 14 } }}
    >
      <Box sx={{ maxWidth: 1440, mx: 'auto' }}>
        <Typography className="mono" sx={{ color: 'var(--accent)', fontSize: '0.64rem', letterSpacing: '0.16em', textTransform: 'uppercase', mb: 2 }}>
          {language === 'pt' ? '// credenciais' : '// credentials'}
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontFamily: isBackend ? 'var(--font-mono)' : 'var(--font-display)',
            fontStyle: isBackend ? 'normal' : 'italic',
            fontSize: { xs: '2rem', md: '3.4rem' },
            lineHeight: 0.98,
            letterSpacing: '-0.035em',
            maxWidth: 780,
          }}
        >
          {language === 'pt' ? 'Prêmios, certificados e estudos' : 'Awards, certificates and studies'}
        </Typography>

        <Box sx={{ mt: { xs: 6, md: 8 } }}>
          <SectionHeading
            track={track}
            kicker={language === 'pt' ? '// premiações' : '// awards'}
            title={language === 'pt' ? 'Pódio' : 'Podium'}
            subtitle={language === 'pt' ? 'Dois hackathons, dois lugares no pódio.' : 'Two hackathons, two podium finishes.'}
          />
          <Box sx={{ display: 'grid', gap: { xs: 2.4, md: 3 }, gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' } }}>
            {awards.map((award) => (
              <AwardCard key={award.slug} award={award} {...cardProps(award)} />
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 8, md: 11 } }}>
          <SectionHeading
            track={track}
            kicker={language === 'pt' ? '// certificados' : '// certificates'}
            title={language === 'pt' ? 'Formação contínua' : 'Continuous learning'}
            subtitle={language === 'pt' ? 'Clique em um certificado para ampliar.' : 'Click a certificate to enlarge.'}
          />
          <Box sx={{ display: 'grid', gap: { xs: 2, md: 2.4 }, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' } }}>
            {certificates.map((item) => (
              <CertificateCard key={item.slug} item={item} {...cardProps(item)} />
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 8, md: 11 } }}>
          <SectionHeading
            track={track}
            kicker={language === 'pt' ? '// estudos e laboratórios' : '// studies and labs'}
            title={language === 'pt' ? 'Pesquisa aplicada' : 'Applied research'}
            subtitle={language === 'pt' ? 'Entregas de pós e cursos que não são produto — ainda.' : 'Postgraduate deliverables that are not products — yet.'}
          />
          <Box sx={{ display: 'grid', gap: { xs: 2, md: 2.4 }, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' } }}>
            {studies.map((item) => (
              <StudyCard key={item.slug} item={item} {...cardProps(item)} />
            ))}
          </Box>
        </Box>
      </Box>

      <GalleryDialog
        open={Boolean(gallery)}
        title={gallery?.title ?? ''}
        subtitle={gallery?.subtitle}
        images={gallery?.images ?? []}
        link={gallery?.link}
        track={track}
        onClose={() => setGallery(null)}
      />
    </Box>
  )
}

export default Credentials
