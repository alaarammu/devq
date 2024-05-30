import Header from "../components/header";
import Navbar from "../components/navbar";

export default function MainLayout({ children }) {
  const profileImage = "/images/logo-light.png"; // Provide the path to the profile image

  return (
    <div className="flex h-screen">
      <Navbar profileImage={profileImage} />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="flex-grow overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
