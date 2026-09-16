import { useState } from 'react'
import { Star, MessageSquare } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import ReviewCard from '../../components/business/ReviewCard'

export default function DealerReviews() {
  const reviews = [
    {
      id: '1',
      userName: 'Ramesh Kumar',
      rating: 5,
      comment: 'Excellent quality Basmati rice. Fast delivery and good packaging.',
      date: '2 days ago',
    },
    {
      id: '2',
      userName: 'Suresh Sharma',
      rating: 4,
      comment: 'Good quality PVC pipes at competitive prices. Will order again.',
      date: '1 week ago',
    },
    {
      id: '3',
      userName: 'Priya Singh',
      rating: 5,
      comment: 'Best LED bulbs I have found. Customer service is excellent.',
      date: '2 weeks ago',
    },
  ]

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Reviews</h1>
        <p className="text-slate-600">Reviews you've written for products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 text-center">
          <div className="text-4xl font-bold text-primary-800 mb-1">4.7</div>
          <div className="flex justify-center mb-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={18} className={s <= 4.7 ? 'fill-accent-500 text-accent-500' : 'text-slate-300'} />
            ))}
          </div>
          <div className="text-sm text-slate-500">Average Rating</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-4xl font-bold text-primary-800 mb-1">{reviews.length}</div>
          <div className="text-sm text-slate-500">Total Reviews</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-4xl font-bold text-primary-800 mb-1">12</div>
          <div className="text-sm text-slate-500">Pending Reviews</div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </DashboardLayout>
  )
}