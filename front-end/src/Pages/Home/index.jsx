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
      <input
        className ='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
        type = 'text'
        placeholder = 'Search a product...'>
      </input>
      <div className="grid grid-cols-4 gap-4">
        {renderProducts()}
      </div>
    </Layout>
  )
}

export default Home;