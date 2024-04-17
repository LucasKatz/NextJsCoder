import Link from "next/link";

export default function Language() {


    return (
        <>
                <h1 className="m-auto w-full my-20 text-center text-text-color-5 font-lobster text-3xl font-bold">Elige el Idioma de tu Catalogo</h1>

            <section className="flex flex-row justify-center items-center my-32 mx-auto">


                <div className="flex flex-col items-center mx-auto">
                    <div className="mx-auto bg-white h-64 w-64" style={{ backgroundSize: 'cover'}}>
                    </div>
                    <Link href={"/productos/english"}>
                        <button className="text-text-color-5 bg-bg-color-3 font-lobster text-xl text-center mt-4 p-3 rounded-md">English</button>
                    </Link>
                </div>
                <div className="flex flex-col items-center mx-auto">
                    <div className="mx-auto bg-white h-64 w-64" style={{ backgroundSize: 'cover', backgroundPosition:"center"}}>
                    </div>
                    <Link href={"/productos/spanish"}>
                        <button className="text-text-color-5 bg-bg-color-3 font-lobster text-xl text-center mt-4 p-3 rounded-md">Español</button>
                    </Link>
                </div>
            </section>
        </>
    );
    }    