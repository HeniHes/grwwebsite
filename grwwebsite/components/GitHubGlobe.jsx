import React, { useRef, useEffect } from 'react'
import { Canvas, useThree, extend } from '@react-three/fiber'
import ThreeGlobe from 'three-globe'
import { OrbitControls } from '@react-three/drei'
import { Color, Fog, MeshPhongMaterial } from 'three'
import countries from '../data/globe.json'
import { cn } from '../lib/utils'

// Register the ThreeGlobe element with R3F
extend({ ThreeGlobe })

// This component runs inside the Canvas
function GlobeScene({ globeColor, atmosphereColor, ringColor }) {
  const globeRef = useRef(null)
  const { scene, camera } = useThree()

  useEffect(() => {
    // Scene setup
    scene.fog = new Fog(new Color(0x000000), 200, 1000)
    camera.position.set(0, 0, 300)

    globeRef.current
      .globeImageUrl(null) // no default texture
      .globeMaterial(new MeshPhongMaterial({ color: new Color(globeColor) }))
      .showAtmosphere(true)
      .atmosphereColor(new Color(atmosphereColor))
      .atmosphereAltitude(0.25)
      .ringsData([{ startLat: 0, startLng: 0, color: ringColor, order: 1, arcAlt: 0.3 }])
      .ringColor(ringColor)
      .polygonsData(countries.features) // load GeoJSON
  }, [scene, camera, globeColor, atmosphereColor, ringColor])

  return <threeGlobe ref={globeRef} />
}

// Outer component: sets up the Canvas
export default function GitHubGlobe({
  className,
  globeColor = '#0023a3',
  atmosphereColor = '#ff3b31',
  ringColor = '#ff3b31',
}) {
  return (
    <Canvas className={cn('absolute inset-0', className)}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <GlobeScene
        globeColor={globeColor}
        atmosphereColor={atmosphereColor}
        ringColor={ringColor}
      />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
