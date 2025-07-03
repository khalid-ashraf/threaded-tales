import { memo, type PropsWithChildren } from "react";
import { Link } from "@tanstack/react-router";

interface Props {
  to: string;
}

const NavLink = ({ to, children }: PropsWithChildren<Props>) => {
  return (
    <Link to={to} activeProps={{ className: "text-red-300" }} className='hover:text-red-300'>
      {children}
    </Link>
  );
};

NavLink.displayName = "NavLink";

export default memo(NavLink);
