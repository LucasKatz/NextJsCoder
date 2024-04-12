import Link from "next/link";

export default function Language() {


    return (
        <>
 <Link href={"/productos/english"}><button className="text-white bg-red-600" > English</button></Link> 
 <Link href={"/productos/spanish"}><button className="text-white bg-blue-600">Spanish</button></Link>
 </>
    );
}