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

<div className="flex flex-col md:flex-row items-center justify-center m-auto">
  <div className="m-auto mb-5 md:mb-0">
    <Image
      src="/images/logo.jpeg"
      alt="Logo"
      width={450}
      height={470}
      className="rounded-lg"
    />
  </div>

  <div className="m-auto">
    <section className="bg-bg-color-5 m-auto w-full md:w-[300px] md:h-[300px] font-semibold rounded-full flex items-center justify-center overflow-hidden relative">
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
</div>



</main>

  )
}
