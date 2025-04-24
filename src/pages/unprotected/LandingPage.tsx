import Carousel from "../../components/Carousel/Carousel"

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
    </>
  )
}

export default LandingPage