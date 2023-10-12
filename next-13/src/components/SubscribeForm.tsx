"use client"

import axios from "axios"
import { FormEvent, useState } from "react"

export default function SubscribeForm() {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const reponse = await axios.post("/api/subscribers", {
      email: email
    })

    console.log(reponse.data)

    if(reponse.data.created) {

      setEmail("")
      alert("Email cadastrado com sucesso!")
    } else {
      alert("Algo deu errado!")
    }
  }

  return (
    <form
      className="flex justify-center gap-4 p-4"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Seu e-mail principal"
        className="bg-slate-800 p-3 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="bg-sky-700 p-3 rounded">
        Se inscrever
      </button>
    </form>
  )
}