
import styles from './slides.module.css'
export const slides = [
    <div
     className={styles.slide_container}
    >
        <div className={styles.slide1}>
          <p className={styles.title}>
            Pioneering <br />
            Next-Gen <br />
            Advertising <br />
          </p>
          <p style={{ color: 'rgb(100, 100, 100)', fontFamily: 'Raleway', fontWeight: '100', fontSize: '18px' }}>
          We fuse design, data and digital strategy <br />
          to elevate your brand in the new era.
          </p>
        </div>

        <div>
          <div className={styles.slide1_image}></div>
        </div>

    </div>,
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      456
    </div>,
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      789
    </div>
]