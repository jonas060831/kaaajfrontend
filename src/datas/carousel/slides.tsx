
import VideoOnView from '../../components/VideoOnView/VideoOnView'
import styles from './slides.module.css'
export const slides = [
    {
      content: (
        <div
        className={styles.slide_container}
        >
            <div className={styles.slide1}>
              <p className={styles.title}>
                Pioneering <br />
                Next-Gen <br />
                Advertising <br />
              </p>
              <p style={{ color: 'var(--font-color)', fontFamily: 'Raleway', fontWeight: '100', fontSize: '18px' }}>
              We fuse design, data and digital strategy <br />
              to elevate your brand in the new era.
              </p>
            </div>

            <div>
              <div className={styles.slide1_image}></div>
            </div>

        </div>
      ),
      interval: 5000  
    },
    {
      content: (
        <div className={styles.slide1} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <VideoOnView src='/videos/displays/flexible_tld.mp4' />
        </div>
      ),
      interval: 16000
    }, {
      content: (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          789
        </div>
      ),
      interval: 5000
    }
]