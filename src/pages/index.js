import HomePage from "@/components/template/HomePage";
import { useState } from "react";
import { getFilteredTours } from "@/utils/crudModels/Tour";

export default function Home({ tours }) {
  const [allTours, setAllTours] = useState(tours);
  return (
    <HomePage  allTours={allTours} setAllTours={setAllTours} />
  );
}

export async function getServerSideProps(context) {
  try {
   
    const tours = await getFilteredTours(context.query);
    return {
      props: { tours: JSON.parse(JSON.stringify(tours)) },
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
