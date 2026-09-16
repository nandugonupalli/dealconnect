import { Star } from 'lucide-react'
import { getInitials } from '../../lib/utils'

interface Review {
  id: string
  userName: string
  rating: number
  comment: string
  date: string
}

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="card p-5">
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
          {getInitials(review.userName)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="font-semibold">{review.userName}</div>
            <div className="text-xs text-slate-500">{review.date}</div>
          </div>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < review.rating ? 'fill-accent-500 text-accent-500' : 'text-slate-300'}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-600">{review.comment}</p>
    </div>
  )
}