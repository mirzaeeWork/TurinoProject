import HomePage from "@/components/template/HomePage";
import { useState } from "react";
import { getFilteredTours } from "@/utils/crudModels/Tour";
import connectDB from "@/utils/connectDB";
import Destination from "@/models/destination";
import Origins from "@/models/origin";

export default function Home({ tours ,CITY_LIST,DESTINATION_LIST}) {
  const [allTours, setAllTours] = useState(tours);
  return <HomePage allTours={allTours} setAllTours={setAllTours} CITY_LIST={CITY_LIST} DESTINATION_LIST={DESTINATION_LIST}/>;
}

export async function getServerSideProps(context) {
  try {
    await connectDB();

    let tours = await getFilteredTours(context.query);
    tours = JSON.parse(JSON.stringify(tours));

    let destinations = await Destination.find();
    destinations = JSON.parse(JSON.stringify(destinations));

    let origins = await Origins.find();
    origins = JSON.parse(JSON.stringify(origins));

    return {
      props: { tours: JSON.parse(JSON.stringify(tours)),CITY_LIST: origins,DESTINATION_LIST:destinations},
    };
  } catch (err) {
    // console.log(err);

    return {
      redirect: {
        destination: `/error?code=${
          err?.response?.status || err?.status || 500
        }`,
        permanent: false,
      },
    };
  }
}
