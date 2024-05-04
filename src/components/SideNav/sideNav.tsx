import cx from "classnames";
import { getAllBoards } from "@/app/actions/board";
import { SideNavItem } from "./sideNavItem";
import Separator from "./sideNavSeparator";
import { auth } from "@/lib/auth";

interface SideNavProps {
  isMobileView?: boolean;
}

const SideNav = async (props: SideNavProps) => {
  const { isMobileView = false } = props;

  const session = await auth();
  if (!session) return <></>;
  const boards = await getAllBoards();

  return (
    <div
      className={cx("w-full sm:w-[250px] sidebar-bg", {
        ["hidden sm:block fixed mt-[60px] h-[calc(100vh-57px)]"]: !isMobileView,
      })}
    >
      {boards?.map((board) => (
        <>
          <SideNavItem key={board.id} id={board.id} title={board.title} />
          <Separator />
        </>
      ))}
    </div>
  );
};

export { SideNav };
