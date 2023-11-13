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
      <div className="m-auto">
      <section className="bg-bg-color-5 m-auto w-[300px] h-[300px] mr-5 font-semibold rounded-full flex items-center justify-center">
  <p className="text-text-color-1 text-center text-4xl font-lobster">
    Night Owl Resources, making out of classrooms a more enjoyable place
  </p>
</section>
</div>


    </main>
    </>
  )
}
