import React from 'react';

/**
 * Renders the Terms and Conditions page.
 *
 * return (
 *   <Terms />
 * )
 */
const Terms = () => (
    <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Information</h2>
                <p className="text-gray-700">
                    At Sunflowers, we are committed to protecting our customers' personal information and data. We use advanced security measures to ensure that all transactions are conducted in a secure and confidential manner. We do not share or sell your information to third parties without your express consent.
                </p>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Prices and Shipping Costs</h2>
                <p className="text-gray-700">
                    The prices of our products are clearly indicated on the website and may be subject to change without notice. Shipping costs are calculated based on the delivery destination and will be displayed during the checkout process.
                </p>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Shipments</h2>
                <p className="text-gray-700">
                    We ship to various destinations using reliable courier services. Delivery times may vary depending on the recipient's location and the shipping method selected. Sunflowers is not responsible for delivery delays caused by the courier service or circumstances beyond our control.
                </p>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Intellectual Property</h2>
                <p className="text-gray-700">
                    Unless otherwise stated, Sunflowers and/or its licensors own the intellectual property rights for all material on Sunflowers. All intellectual property rights are reserved. You may access this from Sunflowers for your own personal use subjected to restrictions set in these terms and conditions.
                    <ul className="list-disc pl-6">
                        <li>Republish material from Sunflowers</li>
                        <li>Sell, rent or sub-license material from Sunflowers</li>
                        <li>Reproduce, duplicate or copy material from Sunflowers</li>
                        <li>Redistribute content from Sunflowers</li>
                    </ul>
                </p>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Comments</h2>
                <p className="text-gray-700">
                    Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Sunflowers does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Sunflowers, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Sunflowers shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
                    Sunflowers reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
                </p>
                <p className="text-gray-700">
                    You warrant and represent that:
                    <ul className="list-disc pl-6">
                        <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                        <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                        <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy;</li>
                        <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
                    </ul>
                    You hereby grant Sunflowers a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.
                </p>
            </div>
        </div>
    </div>
);

export default Terms;