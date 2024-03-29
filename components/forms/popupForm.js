import { useState } from 'react';
import Swal from 'sweetalert2';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';


const PasswordResetPopup = ({ onClose }) => { // Recibe la función onClose como una prop
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: 'success',
        title: 'Email enviado',
        text: 'Revise su casilla de mail',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al reestablecer contraseña',
        text: error.message,
      });
    }
  };

  const handleClose = () => {
    onClose(); // Llama a la función onClose proporcionada por el padre para cerrar el pop-up
  };

  return (
    <div className='bg-white m-auto flex flex-col text-center'>
      <p>Ingrese su email para recuperar su contraseña</p>
      <input
        className='bg-red w-1/2 '
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleResetPassword}>Recuperar Contraseña</button>
      <button onClick={handleClose}>Cerrar</button> {/* Llama a handleClose cuando se hace clic en el botón "Cerrar" */}
    </div>
  );
};

export default PasswordResetPopup;
