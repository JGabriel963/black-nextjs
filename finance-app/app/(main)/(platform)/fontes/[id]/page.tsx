import React from 'react'

interface SourcePageProps {
    params: {
        id: string
    }
}

export default function SourcePage({ params }: SourcePageProps) {
  return (
    <div>

        {params.id}
    </div>
  )
}
