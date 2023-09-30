'use client'

import Input from "@/components/input/Input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface initialStateProps {
    name:string,
    email:string,
    password:string
}
    

const initialState = {
    name:'',
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
        axios.post('/api/register',state)
        .then(() => {
            router.refresh()
        })
        .then(() => {
            setTimeout(() => {
                router.push('/login')
            },2500)
        })
        .catch((err:any) => {

        })
    }
    return (
         <form className="text-center" onSubmit={onSubmit}>
            <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
                <Input placeholder="Name" name= "name" id="name" type="text" onChange={handleChange} value={state.name} />
                <Input placeholder="Email" name="email" id="email" type="email" onChange={handleChange} value={state.email} />
                <Input placeholder="Password" name="password" id="password" type="password" onChange={handleChange} value={state.password} />
                <button type="submit"></button>
            </div>
            <div>
                <div>Do you have an account...? <Link href='/login'>Sign in</Link></div>
            </div>
         </form>
    )
}