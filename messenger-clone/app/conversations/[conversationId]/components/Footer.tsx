'use client'

import userConversation from "@/app/hooks/useConversation"

const Footer = () => {
    const { conversationId } = userConversation();
  return (
    <div>Footer</div>
  )
}

export default Footer