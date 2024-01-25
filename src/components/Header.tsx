import {
  Input,
  Navbar,
  NavbarContent
} from "@nextui-org/react";

import HeaderAuth from "@/components/HeaderAuth";
import Link from "next/link";

const Header = () => {
  
  return (
    <Navbar className="bg-slate-700">
      <Link href="/">
        <p className="font-bold text-inherit">Reddit</p>
      </Link>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Input />
      </NavbarContent>
      <HeaderAuth/>
    </Navbar>
  );
};

export default Header;
