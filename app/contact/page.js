"use client"
import Button from "@/components/userint/button";
import Swal from "sweetalert2";
import { useState, createContext } from "react"

export const FormData = createContext({
    name:"",
    surname:"",
    address:"",
    phone:"",
    email:""
})


const ClientForm = ({completoDatos}) => {
    
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [checkEmail, setCheckEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");




const submit = (e) => {
    e.preventDefault ();
    if (!name || !email || !phone || !address)
        {
            Swal.fire({
                title: "Completa tus datos",
                icon: "warning",
                buttons: true,
                dangerMode: true,
        
            })
        }
        else if (email != checkEmail && email && checkEmail) {
            Swal.fire({
            title: "Los emails no coinciden",
            html: "Por favor, intente nuevamente",
            buttons: true,
            dangerMode: true,
        })
    }

    else {
        Swal.fire({
            title: "Datos Guardados",
            icon: "success",
            buttons: true,
        })
    completoDatos(
        name,
        surname,
        address,
        phone,
        email
    )
    }
    }



    return (


<div className="bg-orange-300   mx-auto py-5 h-fit">
    <h1 className="text-center py-5  w-full text-purple-900 font-extrabold">Get in touch with us!</h1>
  <div className="form flex flex-col items-center h-fit">
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      type="text"
      pattern="[a-zA-Z ]{1,35}"
      className="form-input mb-4 w-2/3"
      placeholder="Name"
      required
    />
    <input
      value={surname}
      onChange={(e) => setSurname(e.target.value)}
      type="text"
      className="form-input mb-4 w-2/3"
      placeholder="Surname"
      required
    />
    <input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      type="email"
      className="form-input mb-4 w-2/3"
      placeholder="Email"
      required
    />
    <input
      value={checkEmail}
      onChange={(e) => setCheckEmail(e.target.value)}
      type="email"
      className="form-input mb-4 w-2/3"
      placeholder="Confirme Email"
      required
    />
    <input
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      type="number"
      className="form-input mb-4 w-2/3"
      placeholder="Phone Number"
      required
    />
    <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      type="text"
      className="form-input w-2/3 mb-4 h-24 "
      placeholder="Message"
      required
    />
    <Button>
      Submit
    </Button>
  </div>
</div>


        
)
}

            
export default ClientForm