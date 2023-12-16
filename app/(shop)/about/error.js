'use client' 

import Button from '@/components/userint/button'
import { useEffect } from 'react'

export default function Error({ error, reset }) {

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="container m-auto mt-6">
            <h2>Oops! Something went wrong. PLease try refreshing About Us</h2>
            <Button onClick={() => reset()}>Refresh</Button>
        </div>
    )
}