import Image from "next/image"




export default function Home() {

  return (
    <>
    <main className="flex min-h-screen flex-row items-center justify-between  ">
      <section className="m-auto w-1/2 ml-5">   
      <Image
        src="/images/logo.jpeg"
        alt="Logo"
        width={450}
        height={470}
      />
      </section>
      <section className=" bg-white m-auto w-1/2 mr-5 font-semibold">   
      <p className="text-purple-900">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
      </section>
    </main>
    </>
  )
}
