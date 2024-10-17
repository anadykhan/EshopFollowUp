import Header from '../components/Layout/Header.jsx'
import Hero from '../components/Root/Hero/Hero'
import Categories from '../components/Root/Categories/Categories'
import BestDeals from '../components/Root/BestDeals/BestDeals'
import FeaturedProducts from '../components/Root/FeaturedProducts/FeaturedProducts'
import Events from '../components/Events/Events'

const HomePage = () => {
  return (
    <div>
          <Header activeHeading={1}></Header>
          <Hero></Hero>
          <Categories></Categories>
          <BestDeals></BestDeals>
          <Events></Events>
          <FeaturedProducts></FeaturedProducts>
    </div>
  )
}
export default HomePage