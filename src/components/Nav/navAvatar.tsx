"use client";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import * as Avatar from "@radix-ui/react-avatar";

const NavAvatar = () => {
  const { data: session, status } = useSession();
  const [showPopup, togglePopup] = useState(false);
  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated";
  return (
    <div className="relative sm:mr-3">
      {isLoading && (
        <Avatar.Root className="inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
          <Avatar.Fallback className="skeleton animate-pulse h-full w-full" />
        </Avatar.Root>
      )}
      {!isLoading && isLoggedIn && (
        <Avatar.Root className="inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
          <Avatar.Image
            className="h-full w-full rounded-[inherit] object-cover"
            src={
              session?.user?.image ||
              "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
            }
            alt="Profile Picture"
            data-testid="profile_picture"
            onClick={() => togglePopup(!showPopup)}
          />
          <Avatar.Fallback
            className="skeleton animate-pulse h-full w-full"
            data-testid="profile_shimmer"
          />
        </Avatar.Root>
      )}
      {!isLoggedIn && !isLoading && (
        <button
          className="cursor-pointer text-inverse button-brand p-2 rounded-sm"
          onClick={() => signIn()}
          data-testid="login_btn"
        >
          Login
        </button>
      )}
      {showPopup && (
        <button
          className="absolute cursor-pointer text-inverse button-brand top-full -right-2 p-2 rounded-sm"
          onClick={() => signOut()}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export { NavAvatar };
