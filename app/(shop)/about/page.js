import Image from "next/image";

export async function generateMetadata({params, searchParams}, parent) {
  console.log(params)

  return {
      title: `Night Owl - Instrucciones`,
  }
}

export default function About() {
  return (
    <main className="overflow-hidden">
      <h1 className="text-center  my-7 text-text-color-5 font-extrabold text-2xl">Instrucciones de Compra</h1>
      <section className="flex flex-col md:flex-row items-center justify-between min-h-screen">

        <div className="flex w-full md:w-1/2 mb-5 md:mr-5 ">
          <Image
            alt={""}
            src={`/images/Lucy's%20new%20pencil-case.jpg`}
            width={"660"}
            height={"1240"}
            className="mx-2 p-8"
          />
        </div>

        <div className="flex w-full md:w-1/2 text-text-color-5 font-lobster text-xl text-center p-3 ">
          <p>
            In the heart of the educational landscape, an innovative venture emerged from the passion of an English teacher. Fueled by the vision to redefine teaching, this entrepreneur set out to create a haven for educators. Recognizing the need for high-quality, tailored teaching resources, the venture was born, aiming to empower teachers in making every lesson extraordinary. The founder&apos;s journey, inspired by personal classroom experiences, resulted in a collection of thoughtfully designed materials dedicated to simplifying lesson planning and enriching the educational experience. Today, this entrepreneurial endeavor stands as a testament to the transformative power of education, offering support to teachers worldwide as they strive to create impactful and memorable learning adventures.
          </p>
        </div>
      </section>
    </main>
  );
}

  

