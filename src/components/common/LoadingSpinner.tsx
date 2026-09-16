import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export default function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizes = {
    sm: 24,
    md: 40,
    lg: 64,
  }

  const px = sizes[size]

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative" style={{ width: px, height: px }}>
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-3 border-primary-100"
          style={{ borderWidth: 3 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        {/* Inner dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div
            className="bg-primary-800 rounded-full"
            style={{ width: px * 0.4, height: px * 0.4 }}
          />
        </motion.div>
      </div>
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-slate-500 animate-pulse"
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

export function SkeletonLoader() {
  return (
    <div className="card p-6 space-y-4">
      <div className="skeleton h-6 w-3/4 rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-5/6 rounded" />
      <div className="skeleton h-32 w-full rounded" />
    </div>
  )
}