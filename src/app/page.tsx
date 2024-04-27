"use client";
import { Button } from "@/components/Button";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div>
      <Button onClick={signIn} label="Login" />
      <br />
      {status}
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
