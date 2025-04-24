
import Button from '../Controls/buttons/Button'
import Icon from '../Icon/Icon'
import styles from './GenerateAdFlow.module.css'

const GenerateAdFlow = () => {

  const steps = [
    { number : 1, content: 'Select a Location to Post Ad'},
    { number : 2, content: "Customize or Select an \n Ad Campaign"},
    { number: 3, content: 'Complete payment or connect \n with a marketing expert for \n tailored support.' },
    { number: null, content: <Button title='START' width='295%' icon={<Icon category='RightArrow' width={24} height={24}/>}/> }
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
                  
                  <div style={{ lineHeight: '2'}}> {step.content}</div>

                </div>
              ))}
              
            </div> {/*  steps */}
            
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