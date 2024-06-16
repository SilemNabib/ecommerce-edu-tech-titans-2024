import { useContext } from 'react'
import HomeCarousel from '../../Components/HomeCarousel'
import HomeSection from '../../Components/HomeSection'
import Layout from '../../Components/Layout'
import Newsletter from '../../Components/Newsletter'
import { GlobalContext } from '../../Context'

function Home() {
  const context = useContext(GlobalContext)

  /*
  const renderProducts = () => {
    const items = context.items || [];
    return items.length > 0 
      ? items.map((item, index) => <Card key={index} data={item} />)
      : <p>Loading...</p>;
  }
  */

  return (
    <Layout>
      <HomeCarousel />
      <HomeSection category="women's clothing" />
      <HomeSection category="men's clothing" />
      <Newsletter />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4 md:m-0">
        {/* {renderProducts()} */}
      </div>
    </Layout>
  )
}

export default Home;