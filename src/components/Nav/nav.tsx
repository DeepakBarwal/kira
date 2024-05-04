"use client";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import customHook from "@/hooks/index";
import { NavAvatar } from "./navAvatar";
import ThemeToggle from "./themeToggle";
import { NavDataType } from "./nav.type";
import { useSession } from "next-auth/react";

interface Composition {
  children: ReactNode;
}

const NavContainer = (props: Composition) => {
  const { children } = props;
  const { useWindowDimensions } = customHook;
  const { isDesktop } = useWindowDimensions();
  const [showNav, toggleNav] = useState(false);

  // const [domLoaded, setDomLoaded] = useState(false);

  // useEffect(() => {
  //   setDomLoaded(true);
  // }, []);

  useEffect(() => {
    toggleNav(isDesktop);
  }, [isDesktop]);

  // if (domLoaded)
  return (
    <div className="bg-navBg fixed w-full">
      {!isDesktop && (
        <HamburgerMenuIcon
          onClick={() => toggleNav(!showNav)}
          height={30}
          width={30}
          className="ml-auto my-3 mr-3 text-white cursor-pointer"
          data-testid="hamburger_icon"
        />
      )}
      {showNav && children}
    </div>
  );
  // return null;
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

const NavLogo = (props: Composition) => {
  const { children } = props;
  return <div className="text-white sm:ml-3">{children}</div>;
};

interface NavItemProps extends Composition {
  authOnly?: boolean;
}

const NavItem = (props: NavItemProps) => {
  const { status } = useSession();
  const { children, authOnly = false } = props;

  if (authOnly && status !== "authenticated") {
    return <></>;
  }

  return (
    <div className="background-nav text-white sm:mr-3 p-2 border rounded font-semibold border-none">
      {children}
    </div>
  );
};

interface NavbarInterface {
  externalNavData?: null | NavDataType;
}

const Navbar = (props: NavbarInterface) => {
  const { externalNavData = null } = props;

  const navItemMap = {
    logo: NavLogo,
    item: NavItem,
    avatar: NavAvatar,
    themeToggle: ThemeToggle,
  };

  const [navbarData, setNavbarData] = useState<NavDataType>([]);

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await fetch("/api/config");
      const { data } = await response.json();
      const navData = data.navData as NavDataType;
      setNavbarData(navData);
    };

    if (!externalNavData) {
      fetchConfig();
    } else {
      setNavbarData(externalNavData);
    }
  }, [externalNavData]);

  return (
    <NavContainer>
      <NavRenderer>
        {navbarData?.map((navGroup, index) => {
          return (
            <NavGroup key={index}>
              {navGroup?.items?.map((navItem) => {
                const Item = navItemMap[navItem?.type] || <></>;
                return (
                  <Item key={navItem.id} authOnly={navItem?.authOnly}>
                    {navItem?.content}
                  </Item>
                );
              })}
            </NavGroup>
          );
        })}
      </NavRenderer>
    </NavContainer>
  );
};

export { Navbar, NavLogo, NavItem, NavAvatar };
