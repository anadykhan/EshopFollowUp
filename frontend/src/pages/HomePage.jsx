import Header from '../components/Layout/Header.jsx'
import Hero from '../components/Root/Hero/Hero'
import Categories from '../components/Root/Categories/Categories'
import BestDeals from '../components/Root/BestDeals/BestDeals'

const HomePage = () => {
  return (
    <div>
          <Header activeHeading={1}></Header>
          <Hero></Hero>
          <Categories></Categories>
          <BestDeals></BestDeals>
    </div>
  )
}
export default HomePage