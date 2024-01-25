"use client";

import * as actions from "@/actions";
import {
  Avatar,
  Button,
  NavbarContent,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

const HeaderAuth = () => {
  const session = useSession(); // use session does not use cookie so it does not make home page a dynamic route
  // instead it makes a api call to next auth to tell wether the user is logged in or not.
  // ? so it makes home page a static route

  let authContent: React.ReactNode;

  if (session.status === "loading") {
    authContent = (
      <Avatar isBordered color="primary" />
    );
  } else if (session.data?.user) {
    authContent = (
      <>
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Avatar src={session.data?.user.image ?? undefined} isBordered color="primary" />
          </PopoverTrigger>
          <PopoverContent aria-label="Static Actions">
            <form action={actions.signOut}>
              <Button type="submit" variant="flat" color="primary">
                Sign Out
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </>
    );
  } else {
    authContent = (
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <form action={actions.signIn}>
            <Button type="submit" color="primary" variant="bordered">
              Sign in
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signOut}>
            <Button type="submit" variant="flat" color="primary">
              Sign Out
            </Button>
          </form>
        </NavbarItem>
      </NavbarContent>
    );
  }

  return authContent;
};

export default HeaderAuth;
