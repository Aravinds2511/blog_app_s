'use client'

import Input from "@/components/input/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface initialStateProps {
    email:string,
    password:string
}
    

const initialState = {
    email:'',
    password:''
}

export default function page() {

    const [state, setState] = useState(initialState)
    const router = useRouter()

    function handleChange(e:any) {
        setState({ ...state, [e.target.name]: e.target.value});
    }

    const onSubmit = (event:FormEvent) => {
        event.preventDefault()
        signIn('credentials', {
            ...state,
            redirect:false,
        })
        .then((callback) => {
            if(callback?.ok) {
                router.refresh()
            }
            if(callback?.error){
                throw new Error('Wrong Credentials')
            }
        })
        router.push('/')
    }
    return (
         <form className="text-center" onSubmit={onSubmit}>
            <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
                <Input placeholder="Email" name="email" id="email" type="email" onChange={handleChange} value={state.email} />
                <Input placeholder="Password" name="password" id="password" type="password" onChange={handleChange} value={state.password} />
                <button type="submit"></button>
            </div>
            <div>
                <div>Don't have an account...?<Link href='/register'>Register</Link></div>
            </div>
         </form>
    )
}