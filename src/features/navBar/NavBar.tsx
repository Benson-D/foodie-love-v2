import Link from 'next/link';

import MenuIcon from "@mui/icons-material/Menu";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { LockOpen } from "@mui/icons-material";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

import useToggle from "../../hooks/useToggle";
import SideModal from '~/components/SideModal';
import ListItems from "./components/ListItem";

import { useUser, UserButton } from '@clerk/nextjs';

const navItems = [
  {
    title: "Login",
    link: "/login",
    icon: <LockOpen />,
  },
];

const navItemsAuth = [
  {
    title: "Recipes",
    link: "/recipes",
    icon: <RestaurantMenuIcon />,
  },
];

function MobileNavBar({
  navItems,
}: {
  navItems: { title: string; link: string; icon: JSX.Element }[];
}) {
  const [value, toggleValue] = useToggle();

  return (
    <>
      <StorefrontIcon sx={{ display: { xs: "flex", sm: "none" }, mr: 1 }} />
      <Link href="/">
        <Typography
          variant="h5"
          noWrap
          sx={{
          display: { xs: "flex", sm: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          color: "inherit",
          letterSpacing: ".15rem",
          textDecoration: "none",
          textAlign: "center",
          }}
        >
          Foodie Love
        </Typography>
      </Link>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => toggleValue()}
        sx={{ display: { sm: "none" }, ml: "auto" }}
      >
        <MenuIcon />
      </IconButton>
      <SideModal modalOpen={value} handleToggle={() => toggleValue()}>
        <ListItems handleToggle={() => toggleValue()} listItems={navItems} />
      </SideModal>
    </>
  );
}

export default function NavBar() {
  const { isSignedIn, user, isLoaded } = useUser();

  console.log(isSignedIn, user, isLoaded, "<=== nav checking clerk");

  const navItemsDisplayed = user !== null ? navItemsAuth : navItems;

  return (
    <AppBar position="static" sx={{ backgroundColor: "#04b597" }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <StorefrontIcon sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }} />
		  <Link href="/">
        <Typography
          variant="h6"
          noWrap
          sx={{
          display: { xs: "none", sm: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          color: "inherit",
          letterSpacing: ".15rem",
          textDecoration: "none",
          }}
        >
				  Foodie Love
			  </Typography>
		  </Link>
      <Box
          sx={{
            flexGrow: 1,
            justifyContent: "end",
            display: { xs: "none", sm: "flex" },
          }}
        >
          {navItemsDisplayed.map((item, idx) => (
          <Link key={idx} href={item.link}>
            <Button sx={{ color: "#fff", ml: 1 }}>
              {item.title}
            </Button>
          </Link>))}
      </Box>
          {user && (
            <Box sx={{ display: "flex", flexGrow: { xs: 1, sm: 0 } }}>
              <UserButton/>
            </Box>
          )}
          <MobileNavBar navItems={navItemsDisplayed} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}