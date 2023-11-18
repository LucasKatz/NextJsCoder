import Image from "next/image";     

const Loader = () => {

return (   <div className="flex items-center justify-center m-auto  w-full">

    <Image
        src="/images/logo.jpeg"
        alt="Night Owl Logo"
        width={190}
        height={210}
        className="animate-pulse m-auto py-14"
    />

</div>
)

}

export default Loader