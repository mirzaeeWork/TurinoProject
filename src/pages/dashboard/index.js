import { checkBackAuth } from "@/utils/Auth";
import HeadManager from "@/components/element/HeadManager";
import MyProfilePage from "@/components/template/MyProfilePage";
import DashboardLayout from "@/components/Layouts/DashboardLayout/DashboardLayout";
import { getUserProfile } from "@/utils/crudModels/User";

function MyProfile({ profile }) {
  return (
    <>
      <HeadManager
        title="پروفایل کاربر | تورینو"
        description="مدیریت اطلاعات حساب کاربری در آژانس تورینو"
      />
      <DashboardLayout>
        <MyProfilePage dataPProfile={profile} />
      </DashboardLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;

  const auth = await checkBackAuth({ req, res });

  if ("redirect" in auth) return auth;

  try {
    const profileDoc = await getUserProfile(auth?.session?.user?.id);
    const profileData = JSON.parse(JSON.stringify(profileDoc));

    return { props: { profile: profileData } };
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

export default MyProfile;
