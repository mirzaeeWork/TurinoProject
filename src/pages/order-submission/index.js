import OrderSubmissionPage from "@/components/template/OrderSubmissionPage";
import { checkBackAuth } from "@/utils/Auth";
import HeadManager from "@/components/element/HeadManager";
import { getUserBasket } from "@/utils/crudModels/Basket";
import { getUserProfile } from "@/utils/crudModels/User";

function OrderSubmission({ basket, profile }) {
  const title = basket?.title?.replace(/تور/g, "").trim();

  return (
    <>
      <HeadManager
        title={title ? `رزرو تور ${title} | تورینو` : ""}
        description={title ? `سفر به ${title} با بهترین قیمت از تورینو` : ""}
        keywords={title ? `تور ${title}, رزرو تور ${title}` : ""}
      />
      {/* // برای کلاینت ساید هست ولی چون لگ داره استفاده نکردم
    // <ProtectedRoute> */}
      <OrderSubmissionPage basket={basket} profile={profile} />
      {/* // </ProtectedRoute> */}
    </>
  );
}

export async function getServerSideProps(context) {
  // const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { req, res } = context;

  const auth = await checkBackAuth({ req, res });

  if ("redirect" in auth) return auth;
  try {
    const basketDoc = await getUserBasket(auth?.session?.user?.id);
    const basket = JSON.parse(JSON.stringify(basketDoc));

    const profileDoc = await getUserProfile(auth?.session?.user?.id);
    const profileData = JSON.parse(JSON.stringify(profileDoc));

    return { props: { basket, profile: profileData } };
  } catch (err) {
    // console.log("err :", err);
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

export default OrderSubmission;
