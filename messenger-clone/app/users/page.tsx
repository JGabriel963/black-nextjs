"use client";

import { signOut } from "next-auth/react";

const Users = () => {
  return (
    <button onClick={() => signOut()}>
      <p>Hello Users!</p>
    </button>
  );
};

export default Users;
