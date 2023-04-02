import React, { useState } from "react";
import { NavLink,Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Box,
  InputBase,
  Divider,
  IconButton,
  Tooltip,
  Button,
  Avatar,
} from "@mui/material";
import routesConfig from "../config/routes.js";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import MessageIcon from "@mui/icons-material/Message";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../assets/css/index.css";
import NavItem from "./Header/NavItem.js";

function Header() {
  const [isActive, setIsActive] = useState(false);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography flex={2}> Megoo</Typography>
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            flex: 2,
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Hinted search text"
            inputProps={{ "aria-label": "Hinted search text" }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Box flex={3} align="end">
          <Tooltip title="Home" >
            <NavLink to={routesConfig.home} className={() => setIsActive(true)}>
              <IconButton
                type="button"
                sx={{ color: isActive ? "#000000" : "#ffffff", alignItems: "center" }}
              >
                <HomeIcon sx={{ fontSize: 40, paddingRight: 2 }} />
              </IconButton>
            </NavLink>
          </Tooltip>
          <Tooltip title="Stock">
            <IconButton
              type="button"
              sx={{ color: "#ffffff", alignItems: "center" }}
            >
              <WarehouseIcon sx={{ fontSize: 35, paddingRight: 2 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Message">
            <IconButton
              type="button"
              sx={{ color: "#ffffff", alignItems: "center" }}
            >
              <MessageIcon sx={{ fontSize: 34, paddingRight: 2 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Shopping">
            <IconButton
              type="button"
              sx={{ color: "#ffffff", alignItems: "center" }}
            >
              <ShoppingCartIcon sx={{ fontSize: 35, paddingRight: 2 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Account">
            <Button>
              {" "}
              <Avatar />{" "}
            </Button>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
