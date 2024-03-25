"use client";

import { Conversation } from "@prisma/client";

interface ConversationListProps {
  initialItem: Conversation[];
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItem }) => {
  return (
    <div>
      <p>ConverstaionList</p>
    </div>
  );
};

export default ConversationList;
