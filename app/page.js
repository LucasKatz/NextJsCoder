import Image from "next/image"



export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div>
      <Image
        src="/images/logo.jpeg"
        alt="Logo"
        width={250}
        height={270}
      />
      </div>
    </main>
  )
}
