import React, { useEffect, useRef, useState } from 'react';
import styles from './ServiceOverview.module.css';
import Icon from '../Icon/Icon';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const ServiceOverview: React.FC = () => {
  const linkRef = useRef<HTMLDivElement>(null);
  const [shakeClass, setShakeClass] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShakeClass(styles.shake);
          setTimeout(() => setShakeClass(''), 700); // allow for re-trigger
        }
      },
      { threshold: 0.5 }
    );

    const el = linkRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>
        <Typewriter
          words={['Modern Display', 'Smarter Result']}
          loop={false}
          cursor
          cursorStyle="_"
          typeSpeed={65}
          deleteSpeed={40}
          delaySpeed={1000}
        />
      </h2>

      <div className={styles.servicesGrid}>
        <div className={styles.card}>
          <h3>🧠 Immersive LED Storytelling</h3>
          <p>We craft interactive, cinematic visuals that blend digital artistry with next-gen LED technology—tailored for attention-grabbing storefronts and immersive brand activations.</p>
        </div>

        <div className={styles.card}>
          <h3>📡 Live Campaign Intelligence</h3>
          <p>Gain insights on engagement, optimize in real-time, and track performance across devices. We turn your display into a smart data-driven experience.</p>
        </div>

        <div className={styles.card}>
          <h3>🔁 Adaptive Visual Synchronization</h3>
          <p>Seamlessly sync your Transparent LED content with mobile, social, and web campaigns. Every screen tells the same story—your story—everywhere.</p>
        </div>
      </div>

      <div ref={linkRef} className={`${styles.linkWrapper} ${shakeClass}`}>
        <Link to="/services" className={styles.link}>
          Explore All Services <Icon category="RightArrow" width={24} height={24} />
        </Link>
      </div>
    </section>
  );
};

export default ServiceOverview;
