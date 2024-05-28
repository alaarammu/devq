import Header from "../components/header";
import Navbar from "../components/navbar";


export default function MainLayout({ children }) {

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="flex-grow overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
