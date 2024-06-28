import { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { ApiConfig } from '../../config/ApiConfig';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await auth.authFetch(ApiConfig.all);
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, [auth]);

  return (
    <div className="container mx-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Users List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Fullname</th>
              <th className="py-3 px-6 text-left">Registration Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map((user) => (
              <tr key={user.email} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">{user.firstName} {user.lastName}</td>
                <td className="py-3 px-6 text-left">{new Date(user.registrationDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;