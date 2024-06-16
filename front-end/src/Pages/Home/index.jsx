import { useContext } from 'react'
import Card from '../../Components/Card'
import HomeCarousel from '../../Components/HomeCarousel'
import Layout from '../../Components/Layout'
import { GlobalContext } from '../../Context'

function Home() {
  const context = useContext(GlobalContext)

  const renderProducts = () => {
    const items = context.items || [];
    return items.length > 0 
      ? items.map((item, index) => <Card key={index} data={item} />)
      : <p>Loading...</p>;
  }

  return (
    <Layout>
      <HomeCarousel />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4 md:m-0">
        {renderProducts()}
      </div>
    </Layout>
  )
}

export default Home;