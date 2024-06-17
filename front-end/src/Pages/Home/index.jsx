import { useContext } from 'react';
import HomeCarousel from '../../Components/HomeCarousel';
import HomeCollection from '../../Components/HomeCollection';
import Layout from '../../Components/Layout';
import Newsletter from '../../Components/Newsletter';
import PromoSection from '../../Components/PromoSection';
import { GlobalContext } from '../../Context';

function Home() {
  const context = useContext(GlobalContext);

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
      <div className="mx-auto px-1 sm:px-2 lg:px-4 w-full">
        <HomeCollection category="women's clothing" categories={["men", "clothing"]}/>
        <HomeCollection category="men's clothing" categories={["women","clothing"]}/>
      </div>
      <div className="my-4">
        <PromoSection />
      </div>
      <div className="my-4">
        <Newsletter />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-2 md:m-0">
        {/* {renderProducts()} */}
      </div>
    </Layout>
  );
}

export default Home;
