import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import SalesData from '../../config/SalesData';

const IncomeSummary = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-4">
      <h2 className="text-lg font-semibold mb-4">Income Summary</h2>
      <div className="mb-4">
        <h3 className="font-medium mb-2">Monthly Sales:</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={SalesData.monthlySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="font-medium mb-2">Sales by Product:</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={SalesData.productSales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="unitsSold" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeSummary;