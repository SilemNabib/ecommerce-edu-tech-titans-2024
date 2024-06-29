import React from 'react';

/**
 * Renders the Cookies page.
 *
 * @returns {JSX.Element} The rendered Cookies page.
 */
const Cookies = () => (
    <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Cookies</h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Why do we use cookies?</h2>
                <p className="text-gray-700">
                    We use cookies to enhance your browsing experience, analyze site traffic, and understand where our audience is coming from. This allows us to improve our website and provide a better service. By using our site, you consent to our use of cookies.
                </p>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Who is responsible for cookies?</h2>
                <p className="text-gray-700">
                    The responsibility for managing cookies lies with Sunflowers. We ensure that cookies are used in compliance with data protection regulations and are committed to protecting your privacy.
                </p>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">What is a cookie?</h2>
                <p className="text-gray-700">
                    A cookie is a small text file stored on your device when you visit a website. Cookies help websites remember your preferences and enhance your overall browsing experience. They can also be used for analytics and advertising purposes.
                </p>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">How to withdraw your cookie consent?</h2>
                <p className="text-gray-700">
                    If you wish to withdraw your consent for the use of cookies, you can do so by changing your browser settings to reject cookies. Additionally, you can delete cookies that have already been stored on your device. Please note that disabling cookies may affect the functionality of our website.
                </p>
            </div>
        </div>
    </div>
);

export default Cookies;
