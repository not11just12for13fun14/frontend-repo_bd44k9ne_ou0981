import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

export default function SplineScene({ scene, className, style }) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        </div>
      }
    >
      <Spline scene={scene} className={className} style={style} />
    </Suspense>
  )
}
