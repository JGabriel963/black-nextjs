import React from "react"

export default function Layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h2>Layout da página Sobre</h2>
      {children}
    </div>
  )
}