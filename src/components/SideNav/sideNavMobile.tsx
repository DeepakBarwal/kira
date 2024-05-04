"use client";
import { ReactNode, useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { Component1Icon } from "@radix-ui/react-icons";

interface SideNavMobileProps {
  children: ReactNode;
}

const SideNavMobile = (props: SideNavMobileProps) => {
  const { children } = props;
  const [open, setOpen] = useState(false);
  const { isDesktop } = useWindowDimensions();
  if (isDesktop) return <></>;
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <Component1Icon
        height={30}
        width={30}
        className="text-white absolute z-[2] left-3 top-3"
        onClick={openDrawer}
      />
      <Drawer
        open={open}
        onClose={closeDrawer}
        className="sidebar-bg"
        placement="bottom"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {children}
      </Drawer>
    </>
  );
};

export { SideNavMobile };
