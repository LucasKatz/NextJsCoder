'use client' 

import Button from '@/components/userint/button'
import { useEffect } from 'react'

export default function Error({ error, reset }) {

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="container m-auto my-5 p-5 w-1/2 bg-bg-color-5 rounded-md text-center">
            <h2 className='m-auto py-12 text-2xl font-semibold text-purple-900'>Oops! Something went wrong. PLease try refreshing your profile page</h2>
            <Button onClick={() => reset()}>Refresh</Button>
        </div>
    )
}