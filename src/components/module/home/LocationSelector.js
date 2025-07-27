import { useState, useEffect, useRef } from "react";
import CityOption from "@/components/element/CityOption";
import useOutsideClick from "@/hooks/useOutsideClick";

function LocationSelector({
  title = "مبدا",
  icon,
  cityList = [],
  selected,
  onSelect,
  className = "",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showList, setShowList] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    if (selected?.faName && selected.faName !== searchTerm) {
      setSearchTerm(selected.faName);
    }
  }, [selected]);

  useOutsideClick([containerRef], () => setShowList(false));

  const filteredCities = searchTerm
    ? cityList.filter((city) => city.faName.includes(searchTerm))
    : cityList;

  const handleSelect = (city) => {
    onSelect(city);
    setSearchTerm(city.faName);
    setShowList(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className={className}>
        {icon}
        <input
          className="w-full focus:outline-none placeholder-[#2C2C2C] text-base sm:text-lg lg:text-xl text-[#2C2C2C]"
          placeholder={title}
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value || "");
            if (!value) onSelect(null);
            if (!showList) setShowList(true); 
          }}
          onFocus={() => {
            if (!showList) setShowList(true);
          }}
        />
      </div>

      {showList && (
        <ul className="absolute max-h-[186px] overflow-y-auto top-full right-0 w-full bg-white border border-[#e0e0e0] rounded-[8px] z-50 mt-1 sm:mt-3 shadow-box">
          <CityOption
            city="پرتردد"
            classStyle="bg-[#F8F8F8] text-[#282828B2] cursor-text"
            onSelect={() => {}}
          />
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <CityOption
                key={city._id}
                city={city.faName}
                icons={icon}
                onSelect={() => handleSelect(city)}
                classStyle="border-b border-b-[#0000001F]"
              />
            ))
          ) : (
            <li className="text-center py-2 text-sm text-gray-500">
              شهری یافت نشد
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default LocationSelector;
