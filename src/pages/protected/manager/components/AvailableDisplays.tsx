
import { FC, useState, useEffect, useRef } from 'react'
import styles from './pages.module.css'

import displays, { IDisplays } from '../../../../datas/devices/displays'
import { Option, RadioInput } from '../../../../components/Controls/options/RadioInput'


type AvailableDisplaysProps = {
    handleForm: (func: any) => void
}

const AvailableDisplays:FC<AvailableDisplaysProps> = ({ handleForm }) => {
 
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null)

  const { displays: displaysArray } = displays

  const [selectedDisplay, setSelectedDisplay] = useState<IDisplays>(displaysArray[0])
  const [isInView, setIsInView] = useState(false)

  //pick the name and the id only
  const displayOptions: Option[] = displaysArray.map(display => ({
    id: display.id,
    label: display.name,
    disabled: display.disabled
  }))
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.3, // 30% of the element must be visible
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isInView) {
      videoRef.current?.play()
        if(videoRef.current) {
            videoRef.current.currentTime = 0 //Reset to beginning when its back on view
            videoRef.current.play()
        }
    } else {
      videoRef.current?.pause()
    }
  }, [isInView])

  useEffect(() => {
    handleForm(selectedDisplay)
  }, [])
  
  const handleSelection = (selectedDisplay: any) => {
    setSelectedDisplay(selectedDisplay)
    handleForm(selectedDisplay)
  }
  
  return (
    <div
     key="available-devices"
     className={styles.container}
     ref={containerRef}
    >
      <div style={{ textAlign: 'center' }}>
        Recommended Devices for Your Storefront 
      </div>

      <div className={styles.two_row_container}>
            
            {/* options for devices */}
            <div className={styles.available_devices}>

                <RadioInput
                 name='devices-option'
                 options={displayOptions}
                 setValue={handleSelection}
                />
            </div>

            {/* demo video */}
            <div className={styles.available_devices_preview}>
                <video 
                  src={selectedDisplay?.videos?.default} 
                  ref={videoRef}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  preload='auto' 
                />
            </div>
      </div>
    </div>
  )
}

export default AvailableDisplays