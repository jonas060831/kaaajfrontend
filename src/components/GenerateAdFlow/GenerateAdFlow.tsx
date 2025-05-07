
import { useNavigate } from 'react-router'
import { useAuthContext } from '../../contexts/AuthContext'
import Button from '../Controls/buttons/Button'
import Icon from '../Icon/Icon'
import styles from './GenerateAdFlow.module.css'

const GenerateAdFlow = () => {

  const { user } = useAuthContext()
  const navigate = useNavigate()

  const steps = [
    { number : 1, content: 'Select a Location to Post Ad'},
    { number : 2, content: "Customize or Select an \n Ad Campaign"},
    { number: 3, content: 'Complete payment or connect \n with a marketing expert for \n tailored support.' },
    { number: null, content: <Button title='START' onClick={() =>  user ? navigate('/manager') : navigate('/signin?userRole=Industrialist&redirectUrl=/manager') } width='320px' icon={<Icon category='RightArrow' width={30} height={30}/>}/> }
  ]

  return (
    <div className={styles.container}>

          
          <div className={styles.header}>
            <p>Start Your campaign today</p>
          </div>

          
          <div className={styles.steps_and_map_container}>

            <div className={styles.steps_container}>
              {steps.map((step, index) => (
                <div key={index} className={styles.step_item}>

                  {step.number && <div className={styles.number_bullet} >{step.number}</div>}
                  
                  <div> {step.content}</div>

                </div>
              ))}
              
            </div>
            
            <div className={styles.map_location_finder_container}>
              <img
               className={styles.map_location_finder}
               src={undefined}
               alt=""
               />
            </div>

          </div>
    </div>
  )
}

export default GenerateAdFlow