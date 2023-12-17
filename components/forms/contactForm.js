"use client"
import Button from "@/components/userint/button";
import Swal from "sweetalert2";
import { useState } from "react"



const ContactForm = ({ completoDatos }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      Swal.fire({
        title: 'Fill in the blanks',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      });
    } else if (email !== checkEmail && email && checkEmail) {
      Swal.fire({
        title: 'Emails do not match',
        html: 'Please try again',
        buttons: true,
        dangerMode: true,
      });
    } else {
      try {

        const response = await fetch(`http://${process.env.VERCEL_URL}/components/userint/sendMail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            surname,
            phone,
            email,
            message,
          }),
        });

        if (response.ok) {
          Swal.fire({
            title: 'Message Sent!',
            icon: 'success',
            buttons: true,
          });

          completoDatos(name, surname,  phone, email);
        } else {
          Swal.fire({
            title: 'Your message was not sent, please try again',
            icon: 'error',
            buttons: true,
          });
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          title: 'Your message was not sent, please try again',
          icon: 'error',
          buttons: true,
        });
      }
    }
  };


    



    return (

      <form onSubmit={submit}>
        <div className=" mx-auto mt-6 py-5 h-fit">
                  <h1 className="text-center py-5 text-2xl w-full text-text-color-5 font-extrabold">Get in touch with us!</h1>
          <div className="form flex flex-col items-center  bg-bg-color-5  w-1/2 m-auto pt-9 p-5 rounded-md text-start h-fit">
            <label className="font-bold">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              pattern="[a-zA-Z ]{1,35}"
              className="form-input mb-4 w-2/3"
              placeholder="Name"
              required/>

            <label className="font-bold">Surname</label>
            <input
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              type="text"
              className="form-input mb-4 w-2/3"
              placeholder="Surname"
              required/>
            
            <label className="font-bold">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-input mb-4 w-2/3"
              placeholder="Email"
              required/>
            
            <label className="font-bold">Repeat Email</label>
            <input
              value={checkEmail}
              onChange={(e) => setCheckEmail(e.target.value)}
              type="email"
              className="form-input mb-4 w-2/3"
              placeholder="Repeat Email"
              required/>
            
            <label className="font-bold">Phone Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              className="form-input mb-4 w-2/3"
              placeholder="Phone Number"
              required/>

            <label className="font-bold">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Message"
              className="form-input w-2/3 h-24 mb-4"
              required
            />
  
            <Button>
              Submit
            </Button>
          </div>
        </div>
      </form>
      
)
}
          
export default ContactForm

