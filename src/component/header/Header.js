import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  InputBase,
  Divider,
  IconButton,
  Box,
  Autocomplete,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { AiOutlineBars } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
// import { createAxios } from "../../http/createInstance.js";
import SockectIO from "../../http/socket.js";
import { toggleShowSidebar } from "../../redux/packageSlice";
import { loginSuccess } from "../../redux/authSlice";

import "../../assets/css/Header.scss";
import { Colors } from "../../config/Colors.js";
import { dataHeader2 } from "../../data/index.js";
import HeaderAvatar from "./HeaderAvatar.js";

import * as SB from "../Chat/SendBirdGroupChat.js";

const topSearch = [];

function Header() {
  const dispatch = useDispatch();

  let user = useSelector((state) => state?.auth.login?.currentUser);
  const channels = useSelector((state) => state?.user?.channel);
  const socket = SockectIO();

  let day = new Date();

  if (user !== null) {
    const decodedToken = jwtDecode(user?.accessToken);
    if (decodedToken.exp < day.getTime() / 1000) {
      dispatch(loginSuccess(null));
    }
  }

  const handleHeaderBars = () => {
    dispatch(toggleShowSidebar());
  };

  const inviteInGroupChannel = async (channel, user) => {
    await SB.inviteMember(channel, user);
  }

  useEffect(() => {
    const userConnectChat = async () => {
      await SB.connectSendBird(user?.data.userInfo._id);

      await SB.setupUser(
        user?.data.userInfo._id,
        user?.data.userInfo.name,
        user?.data.userInfo.avatar
      );
    };

    userConnectChat().catch(console.error);

    return () => {
      userConnectChat();
    };
  }, [user?.data.userInfo]);

  useEffect(() => {
    socket.connect();

    socket.on("joinGr", async (data) => {
      console.log("join group: ", data.user);
      for (let channel of channels) {
        if (channel._id === data._id) {
          console.log("join group");
          inviteInGroupChannel(channel.channel, data.user);
        }
      }
    });

    socket.on("zpCallback", (data) => {
      console.log("socket-io zpCallback: ", data);
      // setFlag(true);
      // clearTimeout(timeId);
    });

    return () => {
      socket.disconnect();
    };
  }, [channels, socket]);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: Colors.background,
      }}
      className="header"
    >
      <Toolbar>
        <Stack flex={{ xs: 2, sm: 1 }} className="app-bar">
          <Box display={{ xs: "block", sm: "none" }}>
            <IconButton onClick={handleHeaderBars}>
              <AiOutlineBars />
            </IconButton>
          </Box>
          <Typography sx={{ color: Colors.primary, fontWeight: 600 }}>
            Megoo
          </Typography>
        </Stack>
        <Box
          flex={{ xs: 3, sm: 2 }}
          sx={{
            backgroundColor: Colors.search,
          }}
          className="search-bar"
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={topSearch}
            fullWidth
            renderInput={(params) => (
              <InputBase
                fullWidth
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                autoFocus
                sx={{ flex: 1, color: Colors.text, paddingLeft: "10px" }}
                placeholder="Hinted search text"
              />
            )}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            type="button"
            sx={{ color: Colors.primary, p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Box>
        <Stack
          flex={3}
          sx={{ display: { xs: "none", sm: "flex" } }}
          direction="row"
          justifyContent="end"
          alignItems="center"
          spacing={{ xs: "5px", sm: "10px", md: "15px" }}
          className="nav-bar"
        >
          <HeaderAvatar data={dataHeader2} user={user} />
        </Stack>
      </Toolbar>
      <Toolbar sx={{ display: { xs: "flex", sm: "none" } }}>
        <Stack
          flex={1}
          sx={{ display: { xs: "flex", sm: "none" } }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={{ xs: "5px", sm: "10px", md: "15px" }}
        >
          <HeaderAvatar data={dataHeader2} user={user} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
