// utils/auth.js
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Unauthorized from './@unauthorized/page';

export const getServerSidePropsForLayout = async (context) => {
  const auth = getAuth();
  const userPromise = new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user || null);
    });
  });

  const user = await userPromise;

  if (!user || !user.email) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  let redirectDestination = '/products/all';

  if (user.role === 'admin') {
    redirectDestination = context.resolvedUrl;
  } else {
    // Si el usuario no es admin, devolver Unauthorized
    return {
      props: {
        unauthorized: true,
      },
    };
  }

  return {
    redirect: {
      destination: redirectDestination,
      permanent: false,
    },
  };
};

