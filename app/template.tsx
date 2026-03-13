'use client'

import { motion } from 'framer-motion'

/**
 * Page transition template — re-mounts on every navigation.
 * Uses a subtle fade + vertical slide for cinematic page changes.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
