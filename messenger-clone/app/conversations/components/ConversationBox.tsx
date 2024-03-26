"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import { FullConverstionType } from "@/app/types";

interface ConversationBoxProps {
  data: FullConverstionType;
  selected: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  return (
    <div>
      <p></p>
    </div>
  );
};

export default ConversationBox;
