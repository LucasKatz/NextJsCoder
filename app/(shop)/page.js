import Image from "next/image"


export async function generateMetadata({params, searchParams}, parent) {
  console.log(params)

  return {
      title: `Night Owl - Home`,
  }
}

export default function Home() {

  return (
<main className="flex min-h-screen flex-row items-center justify-between my-6 md:flex-row">

<div className="m-auto w-full md:w-1/2 md:ml-5">
  <Image
    src="/images/logo.jpeg"
    alt="Logo"
    width={450}
    height={470}
  />
</div>

<div className="m-auto mt-5 md:mt-0">
  <section className="bg-bg-color-5 m-auto mt-20 w-full md:w-[300px] md:h-[300px] md:mr-5 mb-5 font-semibold rounded-full flex items-center justify-center overflow-hidden">
    <p className="text-text-color-1 text-center text-3xl font-lobster hidden md:block">
      Night Owl Resources, making out of classrooms a more enjoyable place
    </p>
    <p className="text-text-color-1 text-center text-md font-lobster p-5 md:p-10 md:hidden">
      Night Owl Resources, <br/>
      making out of classrooms <br/> 
      a more enjoyable place
    </p>
  </section>
</div>



</main>

  )
}
