export default function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4',
  }
  return (
    <div className="flex items-center justify-center p-8">
      <div className={`${sizes[size]} animate-spin rounded-full border-primary-800 border-t-transparent`} />
    </div>
  )
}