
function CityOption({ city, onSelect,icons,classStyle }) {
  return (

    <li
      className={` flex justify-start items-center gap-1 ps-5 py-2 hover:bg-gray-100 text-sm text-(--color-text) cursor-pointer ${classStyle}`}
      onClick={() => onSelect(city)}
    >
      {icons}
      {city}
    </li>
  );
}

export default CityOption;
