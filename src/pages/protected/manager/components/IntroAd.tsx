import { FC } from "react"
import CircleButton from "../../../../components/Controls/buttons/CircleButton"
import Icon from "../../../../components/Icon/Icon"


import styles from './pages.module.css'
type IntroAdProps = {
    beginAd: () => void
}

const IntroAd:FC<IntroAdProps> = ({beginAd}) => {
  return (
    <div className={styles.container} key="create-first-ad">
      <h3>Get Started with Your First Ad</h3>
      <CircleButton
        onClick={beginAd}
        icon={<Icon category="Plus" width={24} height={24} />}
      />
    </div>
  )
}

export default IntroAd