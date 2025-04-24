
import Button from '../Controls/buttons/Button'
import Icon from '../Icon/Icon'
import styles from './GenerateAdFlow.module.css'

const GenerateAdFlow = () => {

  const steps = [
    { number : 1, content: 'Select a Location to Post Ad'},
    { number : 2, content: "Customize or Select an \n Ad Campaign"},
    { number: 3, content: 'Complete payment or connect \n with a marketing expert for \n tailored support.' },
    { number: null, content: <Button title='START' icon={<Icon category='RightArrow' width={24} height={24}/>}/> }
  ]

  return (
    <div className={styles.container}>

          {/* header */}
          <div className={styles.header}>
            <p>Start Your campaign today</p>
          </div>

          {/* 2 column */}
          <div className={styles.steps_and_map_container}>

            <div className={styles.steps_container}>
              {steps.map((step, index) => (
                <div key={index} className={styles.step_item}>

                  {step.number && <div className={styles.number_bullet} >{step.number}</div>}
                  
                  <p style={{ width: '250px', lineHeight: '2'}}> {step.content}</p>

                </div>
              ))}
              
            </div> {/*  steps */}
            
            <div style={{ width: '55%' }}>
              <img className={styles.map_location_finder} src="src/assets/images/map/map_darkmode.jpeg" alt="" style={{ height: '100%', width: '100%', objectFit: 'fill', borderTopLeftRadius: '18vw', borderBottomRightRadius: '10vw', filter: 'drop-shadow(1px 1px 6px orange) brightness(60%)' }}/>
            </div>

          </div>
    </div>
  )
}

export default GenerateAdFlow