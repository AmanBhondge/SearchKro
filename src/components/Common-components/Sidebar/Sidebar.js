import { useState } from "react";
import categoryIcon from '../../../Assets/category-2.png';
import dashboardIcon from '../../../Assets/Dashboard.png'
import reportIcon from '../../../Assets/Report.png'
import policyIcon from '../../../Assets/Policy.png'
import LocationIcons from '../../../Assets/location.png'
import RatingIcon from '../../../Assets/Review.png'
import LogoutIcon from '../../../Assets/Logoutbig.png'
import Logo from '../../../Assets/Logo.png'

const Sidebar = () => {
  const [active, setActive] = useState("Categories");
  
  const menuItems = [
    { name: 'Dashboard', imageSrc: dashboardIcon },
    { name: 'Categories', imageSrc: categoryIcon },
    { name: 'Reports', imageSrc: reportIcon },
    { name: 'Legal Policy', imageSrc: policyIcon },
    { name: 'Location', imageSrc: LocationIcons },
    { name: 'Rating', imageSrc: RatingIcon }
  ];

  return (
    <div className="h-screen w-[240px] bg-[#191919] text-white flex flex-col p-4">
      <div className="mt-[48px] ml-[31px] flex items-center gap-[4px]">
        <span style={{fontWeight:"700"}} className="text-[26px]">Searchkro</span>
      </div>
      <nav className="flex-1 mt-6">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
              active === item.name ? "bg-[#06C4D9]" : "hover:bg-gray-700"
            }`}
            onClick={() => setActive(item.name)}
          >
            <img 
              src={item.imageSrc} 
              alt={`${item.name} icon`} 
              className="w-5 h-5"
            />
            <span>{item.name}</span>
          </div>
        ))}
      </nav>
      <div className="mt-auto px-4 py-3 bg-gray-800 rounded-lg cursor-pointer flex items-center space-x-3 hover:bg-gray-700">
        <img 
          src={LogoutIcon}
          alt="Logout icon" 
          className="w-5 h-5"
        />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;