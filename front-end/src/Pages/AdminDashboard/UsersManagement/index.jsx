import Sidebar from "../../../Components/Sidebar";
import UsersList from "../../../Components/UsersList";

const UsersManagement = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex justify-center items-center p-4 md:p-8">
        <UsersList />
      </div>
    </div>
  );
};

export default UsersManagement;