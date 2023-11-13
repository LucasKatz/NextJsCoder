import Image from "next/image";

export async function generateMetadata({params, searchParams}, parent) {
  console.log(params)

  return {
      title: `Night Owl - About Us`,
  }
}

export default function About() {
  return (
    <>
      <h1 className="text-center my-7  text-text-color-5 font-extrabold text-2xl">About Night Owl Resources</h1>
    <main className="flex min-h-screen flex-row items-center justify-between">
    
      <div className="flex w-1/2 p-auto mr-5">
      <Image
            alt={""}
            src={`/images/about.webp`}
            width={"860"}
            height={"1240"}
            className="mx-2 p-8"
        />
      </div>
      <div className="flex w-1/2 text-text-color-5 font-lobster text-3xl">
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </main>
    </>
  );
}
