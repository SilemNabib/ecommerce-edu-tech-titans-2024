import React from 'react';

const Company = () => {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">About Sunflowers</h1>

            {/* Our Origin Section */}
            <div className="mb-16 bg-gray-100 p-8 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row items-center md:items-center">
                    <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4 flex justify-center">
                        <img src='/bootcamp-tech-titans-2024_ecommerce/assets/company1.jpeg' alt="Sunflowers" className="max-w-full max-h-full object-contain rounded-lg" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">OUR ORIGIN</h2>
                        <p className="text-gray-700 leading-relaxed">
                            The Sunflowers company was born in 2024, inspired by the love of nature and the passion for sustainable design. Founded by a group of entrepreneurial friends with the vision of creating clothing that not only looks good, but is also environmentally friendly.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our History Section */}
            <div className="mb-16 bg-gray-100 p-8 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row items-center md:items-center">
                    <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4 flex justify-center md:order-last">
                        <img src="/bootcamp-tech-titans-2024_ecommerce/assets/company2.jpg" alt="Our History" className="w-full h-auto md:w-4/5 md:h-auto object-contain rounded-lg" />
                    </div>
                    <div className="w-full md:w-1/2 md:order-1">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">OUR HISTORY</h2>
                        <p className="text-gray-700 leading-relaxed">
                            From our humble beginnings in a small workshop, we have grown to become an internationally recognized brand. Our commitment to sustainability and quality has allowed us to stand out in a competitive market. Each Sunflowers garment is a combination of modern style and eco-friendly practices.
                        </p>
                    </div>
                </div>
            </div>

            {/* We Love What We Do Section */}
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">WE LOVE WHAT WE DO</h2>
                <p className="text-lg">
                    At Sunflowers, we believe that fashion should be both beautiful and responsible. We are dedicated to creating premium quality clothing that suits your style and respects the planet. Shop now and feel amazing every day with our sustainable garments!
                </p>
                <div className="flex justify-center mt-4">
                    <img src='/bootcamp-tech-titans-2024_ecommerce/assets/sunflower.svg' alt="We Love What We Do" className="max-w-full h-80 object-contain" />
                </div>
            </div>
        </div>
    );
};

export default Company;