import { getAllBoards } from "@/app/actions/board";
import { SideNavItem } from "./sideNavItem";
import Separator from "./sideNavSeparator";
import { auth } from "@/lib/auth";

const SideNav = async () => {
  const session = await auth();
  if (!session) return <></>;
  const boards = await getAllBoards();

  return (
    <div className="fixed w-full sm:w-[250px] mt-[60px] sidebar-bg h-[calc(100vh-57px)]">
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
