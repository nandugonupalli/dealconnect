import { motion } from 'framer-motion'
import { Order, OrderStatus } from '../../types'
import { ORDER_STATUS_CONFIG } from '../../data/mockOrders'
import { formatDateTime } from '../../lib/utils'
import { CheckCircle, Circle } from 'lucide-react'

const WORKFLOW_STEPS: OrderStatus[] = [
  'placed',
  'team-notified',
  'call-pending',
  'call-done',
  'confirmed',
  'sent-to-manufacturer',
  'at-hub',
  'quality-checked',
  'out-for-delivery',
  'delivered',
]

export default function OrderTimeline({ order }: { order: Order }) {
  const currentIndex = WORKFLOW_STEPS.indexOf(order.status)
  const isCancelled = order.status === 'cancelled' || order.status === 'rejected'

  return (
    <div className="space-y-4">
      {WORKFLOW_STEPS.map((step, index) => {
        const config = ORDER_STATUS_CONFIG[step]
        const isCompleted = index <= currentIndex
        const isCurrent = index === currentIndex
        const timelineItem = order.timeline.find((t) => t.status === step)

        if (isCancelled && index > 0) return null

        return (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start space-x-3"
          >
            <div className="flex flex-col items-center">
              <motion.div
                animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1.5, repeat: isCurrent ? Infinity : 0 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCompleted
                    ? 'bg-primary-800 text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {isCompleted ? <CheckCircle size={16} /> : <Circle size={16} />}
              </motion.div>
              {index < WORKFLOW_STEPS.length - 1 && (
                <div
                  className={`w-0.5 h-12 ${
                    isCompleted && index < currentIndex
                      ? 'bg-primary-800'
                      : 'bg-slate-200'
                  }`}
                />
              )}
            </div>

            <div className="flex-1 pb-4">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-lg">{config.icon}</span>
                <span
                  className={`font-semibold ${
                    isCompleted ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {config.label}
                </span>
                {isCurrent && (
                  <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary-800 rounded-full font-medium animate-pulse">
                    Current
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500">{config.description}</p>

              {timelineItem && (
                <div className="mt-2 text-xs text-slate-400">
                  <div>{formatDateTime(timelineItem.timestamp)}</div>
                  {timelineItem.note && (
                    <div className="mt-1 text-slate-600 italic">"{timelineItem.note}"</div>
                  )}
                  {timelineItem.by && (
                    <div className="mt-0.5">by {timelineItem.by}</div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}