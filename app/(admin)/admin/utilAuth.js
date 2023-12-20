/*import { getAuth, onAuthStateChanged } from 'firebase/auth';
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

  if (user.role !== 'admin') {
    console.log("Usuario no es admin. Redirigiendo a Unauthorized");
    return {
      redirect: {
        destination: '/unauthorized',  // Cambiar la ruta según tu estructura de archivos
        permanent: false,
      },
    };
  }

  // Si el usuario es admin, continuar con la carga de la página
  return {
    props: {},
  };
};*/
