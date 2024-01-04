import React from "react";
import "./MobileNavBar.css";
import logo from "../../assets/logo.png";
// import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import Link from "@mui/material/Link";

const MobileNavBar = () => {

  const [state, setState] = React.useState({
    right: false,
  });
  let anchor = "right"

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ backgroundColor: "white" }}>
        <ListItem disablePadding>
          <div className="MobileNavBar__head">
            <img className="mobile__header__logo2" src={logo} alt="logo" />
            <div
              className="mobile__header__close"
              onClick={toggleDrawer(anchor, false)}
            >
              <CloseIcon fontSize="large" style={{ color: "#2ea7c5" }} />
            </div>
          </div>
        </ListItem>
      </List>
      <List>
        <Link
          target="_blank"
          href="https://lca.mulphico.pk/"
          underline="none"
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText style={{ color: "white" }} primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <Divider sx={{ width: "100%" }} />
      <List>
        <Link
          target="_blank"
          href="https://lca.mulphico.pk/about-us/"
          underline="none"
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText style={{ color: "white" }} primary="About Us" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider sx={{ width: "100%" }} />
      <List>
        <Link
          target="_blank"
          href="https://lca.mulphico.pk/updates/"
          underline="none"
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText style={{ color: "white" }} primary="Updates" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider sx={{ width: "100%" }} />
      <List>
        <Link
          target="_blank"
          href="https://lca.mulphico.pk/gallery/"
          underline="none"
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText style={{ color: "white" }} primary="Gallery" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider sx={{ width: "100%" }} />
      <List>
        <Link
          target="_blank"
          href="https://lca.mulphico.pk/contact-us/"
          underline="none"
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText style={{ color: "white" }} primary="Contact Us" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <Divider sx={{ width: "100%" }} />
    </Box>
  );
  return (
    <div className="MobileNavBar">
      <div className="MobileNavBar__box">
        <div className="MobileNavBar__left">
          <div className="MobileNavBar__left__logo">
            <a
            target="_blank"
              href={"https://mulphico.pk"}
              rel="noreferrer"
            >
              <img className="mobile__header__logo" src={logo} alt="logo" />
            </a>
          </div>
        </div>
        <div className="MobileNavBar__right">

          {/* <div onClick={toggleDrawer("right", true)} className="MobileNavBar__right__btn">

            <MenuIcon sx={{ fontSize: 30, }} style={{ color: "#2ea7c5" }} />
          </div>
          <Drawer

            PaperProps={{
              sx: {
                backgroundColor: "#2ea7c5",
              },
            }}

            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer> */}
        </div>
      </div>


    </div>
  );
};

export default MobileNavBar;
