import { useEffect, useRef } from 'react'

const PolygonBackground = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animationId
        let points = []

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initPoints()
        }

        const initPoints = () => {
            points = []
            const spacing = 80
            const cols = Math.ceil(canvas.width / spacing) + 2
            const rows = Math.ceil(canvas.height / spacing) + 2
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    points.push({
                        x: i * spacing + (Math.random() - 0.5) * 40,
                        y: j * spacing + (Math.random() - 0.5) * 40,
                        ox: i * spacing,
                        oy: j * spacing,
                        vx: (Math.random() - 0.5) * 0.3,
                        vy: (Math.random() - 0.5) * 0.3,
                    })
                }
            }
        }

        const drawLine = (p1, p2, dist) => {
            const maxDist = 120
            if (dist > maxDist) return
            const alpha = (1 - dist / maxDist) * 0.25
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 43, 43, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update points
            for (const p of points) {
                p.x += p.vx
                p.y += p.vy
                const dx = p.x - p.ox
                const dy = p.y - p.oy
                if (Math.abs(dx) > 30) p.vx *= -1
                if (Math.abs(dy) > 30) p.vy *= -1
            }

            // Draw connections
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x
                    const dy = points[i].y - points[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    drawLine(points[i], points[j], dist)
                }
            }

            // Draw points
            for (const p of points) {
                ctx.beginPath()
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(255, 43, 43, 0.4)'
                ctx.fill()
            }

            animationId = requestAnimationFrame(animate)
        }

        resize()
        animate()
        window.addEventListener('resize', resize)

        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animationId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ opacity: 0.6 }}
        />
    )
}

export default PolygonBackground
