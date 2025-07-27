import HeadManager from "@/components/element/HeadManager";
import DashboardLayout from "@/components/Layouts/DashboardLayout/DashboardLayout";
import MyToursPage from "@/components/template/MyToursPage";
import Destination from "@/models/destination";
import Origins from "@/models/origin";
import { checkBackAuth } from "@/utils/Auth";
import connectDB from "@/utils/connectDB";
import { fetchToursByOrders } from "@/utils/crudModels/User";
import React from "react";

function MyTours({ myTours, origins, destinations }) {
  return (
    <>
      <HeadManager
        title="رزروهای من | تورینو"
        description="لیست تورهای رزرو شده و اطلاعات سفرهای شما در تورینو"
      />
      <DashboardLayout>
        <MyToursPage
          myTours={myTours}
          origins={origins}
          destinations={destinations}
        />
      </DashboardLayout>
    </>
  );
}


export async function getServerSideProps(context) {
  const { req, res } = context;

  const auth = await checkBackAuth({ req, res });

  if ("redirect" in auth) return auth;

  try {
    await connectDB();

    let myTours = await fetchToursByOrders(auth?.session?.user?.id);
    myTours = JSON.parse(JSON.stringify(myTours));

    let destinations = await Destination.find();
    destinations = JSON.parse(JSON.stringify(destinations));

    let origins = await Origins.find();
    origins = JSON.parse(JSON.stringify(origins));

    return {
      props: {
        myTours,
        origins,
        destinations,
      },
    };
  } catch (err) {
    console.log("err :", err);
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

export default MyTours;
