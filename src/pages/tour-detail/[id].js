import TourDetailPage from "@/components/template/TourDetailPage";
import HeadManager from "@/components/element/HeadManager";
import Origin from "@/models/origin";
import { getByIdTours } from "@/utils/crudModels/Tour";
import connectDB from "@/utils/connectDB";

function TourDetail({ tour, origin }) {
  const title = tour?.title?.replace(/تور/g, "").trim();

  return (
    <>
      <HeadManager
        title={title ? `رزرو تور ${title} | تورینو` : ""}
        description={title ? `سفر به ${title} با بهترین قیمت از تورینو` : ""}
        keywords={title ? `تور ${title}, رزرو تور ${title}` : ""}
      />

      <TourDetailPage tour={tour} origin={origin} />
    </>
  );
}


export async function getServerSideProps(context) {

  try {
    await connectDB();
    const { id } = context.params;
    
    const tour = await getByIdTours({ id });
    const origin = await Origin.findById(tour?.originId);

    return {
      props: {
        tour: JSON.parse(JSON.stringify(tour)),
        origin: origin ? JSON.parse(JSON.stringify(origin)) : null,
      },
    };
  } catch (err) {
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

export default TourDetail;
