'use client'

import MaxWContainer from "@/components/MaxWContainer"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import Image from "next/image"

export default function SignIn() {
    return (
        <MaxWContainer classes="border rounded shadow-md py-24 mt-8">
            <h1 className="text-2xl font-bold text-center">Welcome to EZRental</h1>
            <hr />
            <div className="flex flex-col items-center w-full space-y-2 py-8">
                <Button className="shadow-sm" variant='outline'
                onClick={async ()=>signIn('google', {
                    callbackUrl: `${window.location.origin}`
                })}>
                    <Image width={20} height={20} src='/google-logo.svg' alt='google logo' className="mr-2"/>
                    Sign in with Google
                </Button>
                <Button className="shadow-sm" variant='outline'
                onClick={async ()=>{
                    console.log('clicked');
                    signIn('facebook', {
                    callbackUrl: `${window.location.origin}`
                })}}>
                    <Image width={20} height={20} src='/facebook-logo.svg' alt='facebook logo' className="mr-2"/>
                    Sign in with Facebook
                </Button>
            </div>

        </MaxWContainer>
    )
}