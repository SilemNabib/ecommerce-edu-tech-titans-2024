import React from 'react';

/**
 * Renders the Privacy Policy page.
 *
 * @returns {JSX.Element} The Privacy Policy page component.
 */
const Privacy = () => (
    <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Security in e-commerce</h2>
                <p className="text-gray-700">
                    At Sunflowers, we prioritize the protection of your personal information and transaction data. We employ advanced security measures to ensure that all online transactions are conducted safely and confidentially. Your information is never shared or sold to third parties without your explicit consent.
                </p>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Access to sunflower content</h2>
                <p className="text-gray-700">
                    When you make a purchase from Sunflowers, you agree to our terms and conditions for content usage. Our content is protected by copyright laws, and any unauthorized reproduction, distribution, or usage is prohibited.
                </p>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Intellectual property</h2>
                <p className="text-gray-700">
                    All intellectual property rights, including copyrights, trademarks, and patents related to our products and services, belong to Sunflowers or their respective owners. Unauthorized use of any copyrighted material is not allowed.
                </p>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Information processing policy</h2>
                <p className="text-gray-700">
                    Sunflowers collects and processes personal data in compliance with current data protection legislation. This data is used solely for legitimate purposes, such as processing orders, sending information, and improving customer service. You have the right to access, rectify, or delete your personal data at any time.
                </p>
            </div>
        </div>
    </div>
);

export default Privacy;