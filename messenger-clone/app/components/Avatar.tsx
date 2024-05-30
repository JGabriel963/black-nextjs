'use client'

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
    user?: User;
}

const Avatar: React.FC<AvatarProps> = ({
    user
}) => {
  return (
    <div className="relative">
        <div className="relative inline-block rounded-full overflow-hidden size-9 md:size-11">
            <Image alt="Avatar" src={user?.image || '/images/user.png'} fill />
        </div>
        <span className="absolute block rounded-full bg-gray-500 ring-2 ring-white top-0 right-0 size-2 md:size-3" />
    </div>
  )
}

export default Avatar