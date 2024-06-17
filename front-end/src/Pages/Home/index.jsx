import { useContext } from 'react';
import HomeCarousel from '../../Components/HomeCarousel';
import HomeCollection from '../../Components/HomeCollection';
import Layout from '../../Components/Layout';
import Newsletter from '../../Components/Newsletter';
import PromoSection from '../../Components/PromoSection';
import SearchBar from '../../Components/SearchBar';
import { GlobalContext } from '../../Context';

/**
 * Renders the Home page.
 *
 * @returns {JSX.Element} The Home page component.
 */
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
      <div className="lg:hidden flex justify-center">
        <SearchBar className="max-w-md mb-4 mx-auto"/>
      </div>
      <HomeCarousel />
      <div className="mx-auto px-1 sm:px-2 lg:px-4 w-full">
        <HomeCollection category="women's clothing" categories={["female","clothing"]}/>
        <HomeCollection category="men's clothing" categories={["male", "clothing"]}/>
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
