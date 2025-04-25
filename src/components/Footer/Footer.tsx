import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import Button from '../Controls/buttons/Button';
import Icon from '../Icon/Icon';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>

        {/* Sitemap */}
        <div>
          <h4 className={styles.heading}>Sitemap</h4>
          <ul className={styles.ul}>
            <li><Link to="/" className={styles.link}>Home</Link></li>
            <li><Link to="/services" className={styles.link}>Services</Link></li>
            <li><Link to="/careers" className={styles.link}>Careers</Link></li>
            <li><Link to="/about" className={styles.link}>About</Link></li>
            <li><Link to="/contact" className={styles.link}>Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className={styles.heading}>Legal</h4>
          <ul className={styles.ul}>
            <li><Link to="/privacy-policy" className={styles.link}>Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className={styles.link}>Terms of Service</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className={styles.heading}>Follow Us</h4>
          <ul className={styles.ul}>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.link}>Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.link}>Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.link}>Instagram</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
        <h4 className={styles.heading}>Resources</h4>
        <ul className={styles.ul}>
          <li><Link to="/developers" className={styles.link}>Developers</Link></li>
          <li><Link to="/hivemap" className={styles.link}>HiveMap™ Insights</Link></li>
          <li><Link to="/faq" className={styles.link}>FAQs</Link></li>
        </ul>

        </div>

        {/* Newsletter */}
        <div>
          <h4 className={styles.heading}>Subscribe</h4>
          <form onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              className={styles.input}
              required
            />
            <Button
             type="submit"
             title='Subscribe'
             icon={
              <Icon
               category='Bell'
               width={24}
               height={24}
              />
             }
             width='100%'
            />
          </form>
        </div>

      </div>

      <p className={styles.copyRight}>
        &copy; {new Date().getFullYear()} KAAAJ Advertisement. All rights reserved.
      </p>
    </footer>
  );
}