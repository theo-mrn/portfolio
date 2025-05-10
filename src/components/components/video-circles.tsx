import type React from "react"
import { useRef, useEffect, useCallback } from "react"

interface VideoCirclesProps {
  dotsCount: number;
  videoSrc: string;
  onDotsCountChange?: (value: number) => void;
}

const VideoCircles: React.FC<VideoCirclesProps> = ({ dotsCount, videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | undefined>(undefined)

  const processImageData = (imageData: ImageData, ctx: CanvasRenderingContext2D) => {
    const { width, height, data } = imageData
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, width, height)

    // Calculer l'espacement en fonction de la largeur et du nombre de points souhaité
    const spacing = Math.floor(width / dotsCount)
    // La taille du cercle est proportionnelle à l'espacement
    const circleSize = spacing * 0.8

    for (let y = spacing/2; y < height; y += spacing) {
      for (let x = spacing/2; x < width; x += spacing) {
        // Calculer la moyenne des pixels dans la zone du point
        let avgBrightness = 0
        let count = 0
        
        // Échantillonner la zone autour du point
        for (let sy = -spacing/4; sy < spacing/4; sy++) {
          for (let sx = -spacing/4; sx < spacing/4; sx++) {
            const sampleX = Math.floor(x + sx)
            const sampleY = Math.floor(y + sy)
            if (sampleX >= 0 && sampleX < width && sampleY >= 0 && sampleY < height) {
              const i = (sampleY * width + sampleX) * 4
              const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3
              avgBrightness += brightness
              count++
            }
          }
        }
        
        avgBrightness = avgBrightness / count
        const radius = (avgBrightness / 255) * (circleSize / 2)

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = "white"
        ctx.fill()
      }
    }
  }

  const animate = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (video && canvas && video.readyState >= 4) {
      const { videoWidth, videoHeight } = video
      canvas.width = videoWidth
      canvas.height = videoHeight

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight)
        const imageData = ctx.getImageData(0, 0, videoWidth, videoHeight)
        processImageData(imageData, ctx)
      }
    }
    requestRef.current = requestAnimationFrame(animate)
  }, [dotsCount])

  useEffect(() => {
    const video = videoRef.current
    
    if (video) {
      const handleLoadedData = () => {
        animate()
      }

      video.addEventListener('loadeddata', handleLoadedData)
      
      if (video.readyState >= 4) {
        handleLoadedData()
      }

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData)
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current)
        }
      }
    }
  }, [animate])

  return (
    <div className="relative w-full h-[300px] md:h-[350px] max-w-full overflow-hidden rounded-lg">
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-0"
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
    </div>
  )
}

export default VideoCircles 