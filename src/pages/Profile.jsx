import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p className="text-center mt-10 text-red-500">Please log in to view your profile.</p>;
  }

  return (
    <>
    <Navbar />
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.displayName || "User"}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

     
    </div>
    <Footer />
    </>
  );
};

export default Profile;
