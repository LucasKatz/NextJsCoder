"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [ 
    {
        label:"todos",
        href:"/products/todos"
    },
    {
    label:"Vocbulary",
    href:"/products/vocabulary"
    },
    {
    label:"Stories",
    href:"/products/stories"
    },
    {
    label:"Routines",
    href:"/products/routines"
    },
    {
    label:"Deco",
    href:"/products/deco"
    }
]


const CategoriesMenu = () => {

const pathname = usePathname()

return (
    <nav className="flex items-center justify-between p-4 w-full text-purple-900">

    <div className="hidden md:flex items-center justify-center flex-1 w-1/2">
{
links.map(link => (
    <Link key={link.label} href={link.href} className={`btn-nav ${pathname === link.href ? "font-extrabold" : ""}`}>
        {link.label}
    </Link>
))
}
    </div>
</nav>

)  
}

export default CategoriesMenu