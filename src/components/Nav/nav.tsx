"use client";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { NavAvatar } from "./navAvatar";
import ThemeToggle from "./themeToggle";

interface Composition {
  children: ReactNode;
}

const NavContainer = (props: Composition) => {
  const { children } = props;
  const { isDesktop } = useWindowDimensions();
  const [showNav, toggleNav] = useState(false);

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    toggleNav(isDesktop);
  }, [isDesktop]);

  if (domLoaded)
    return (
      <div className="bg-navBg fixed w-full">
        {!isDesktop && (
          <HamburgerMenuIcon
            onClick={() => toggleNav(!showNav)}
            height={30}
            width={30}
            className="ml-auto my-3 mr-3 text-white cursor-pointer"
          />
        )}
        {showNav && children}
      </div>
    );
  return null;
};

const NavGroup = (props: Composition) => {
  const { children } = props;
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-center">
      {children}
    </div>
  );
};

const NavRenderer = (props: Composition) => {
  const { children } = props;
  return (
    <div className="h-screen sm:h-[60px] flex flex-col items-center sm:flex-row sm:justify-between border-b border-base">
      {children}
    </div>
  );
};

const NavLogo = () => {
  return <div className="text-white sm:ml-3">KIRA</div>;
};

const NavItem = (props: Composition) => {
  const { children } = props;
  return (
    <div className="background-nav text-white sm:mr-3 p-2 border rounded font-semibold border-none">
      {children}
    </div>
  );
};

const Navbar = () => {
  return (
    <NavContainer>
      <NavRenderer>
        <NavGroup>
          <NavLogo />
        </NavGroup>

        <NavGroup>
          <NavItem>Your Work</NavItem>
          <NavItem>Projects</NavItem>
          <NavItem>Filters</NavItem>
        </NavGroup>

        <NavGroup>
          <NavAvatar />
          <ThemeToggle />
        </NavGroup>
      </NavRenderer>
    </NavContainer>
  );
};

export { Navbar };
