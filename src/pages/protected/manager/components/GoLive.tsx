
import Icon from '../../../../components/Icon/Icon'
import styles from './pages.module.css'
const GoLive = () => {
  return (
    <div className={styles.container}>

        <button
         className={styles.live_button} type="submit"
        >
          <Icon category="GreenIndicator" width={20} height={20}/>
          <span>
             Go Live
          </span>
          <Icon category="SignIn" width={20} height={20}/>
        </button>
    </div>
  )
}

export default GoLive