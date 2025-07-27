import React from "react";
import Tour from "../module/dashboard/my-tours/Tours";




function MyToursPage({ myTours, origins, destinations }) {
  return (
    <div className="border border-(--color-border)  rounded-[10px] p-4 space-y-4">
      {myTours.map((tour, index) => <Tour key={`${tour._id}-${index}`} index={index} tour={tour} origins={origins} destinations={destinations}/>)}
    </div>
  );
}

export default MyToursPage;
