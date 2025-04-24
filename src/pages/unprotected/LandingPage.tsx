import Carousel from "../../components/Carousel/Carousel"
import GenerateAdFlow from "../../components/GenerateAdFlow/GenerateAdFlow"
import ServiceOverview from "../../components/ServiceOverview/ServiceOverview"

import { slides } from "../../datas/carousel/slides"
const LandingPage = () => {

  
  return (
    <>
      <header style={{ width: '100vw', margin: '0 auto' }}>
        <Carousel
         slides={slides}
         height="75vh"
         autoPlay={false}
         interval={8000}
        />
      </header>

      <main>
        <ServiceOverview />

        <GenerateAdFlow />
      </main>
    </>
  )
}

export default LandingPage