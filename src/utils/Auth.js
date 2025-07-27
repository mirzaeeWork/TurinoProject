import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export async function checkBackAuth({ res, req }) {
const session = await getServerSession(req, res, authOptions)
  // console.log(session)

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { session }
}