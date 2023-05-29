import React, { useState } from "react";
import {
  Box,
  TextField,
  Stack,
  Typography,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";

import { usersInvitePeople } from "../../redux/userRequest";
import { createAxios } from "../../http/createInstance";
import { loginSuccess } from "../../redux/authSlice";
import "../../assets/css/Group.scss";
import * as CustomComponent from "../../component/custom/CustomComponents.js";
import { Colors } from "../../config/Colors";
import PackageGroup from "./PackageGroup";

function PackagesGroup({ data }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.login?.currentUser);

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const [openInvite, setOpenInvite] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [email, setEmail] = useState("");

  const handleClickOpenInvite = () => {
    setOpenInvite(true);
  };

  const handleCloseInvite = () => {
    setOpenInvite(false);
  };

  const handleButtonSave = () => {
    let newArray = selectedPeople;
    newArray.push(email);

    setSelectedPeople(newArray);
    setEmail("");
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      handleButtonSave();
    }
  };

  const handleButtonClear = (e, name) => {
    let newArray = [];
    newArray = [...selectedPeople.filter((data) => !(data === name))];

    setSelectedPeople(newArray);
  };

  const handleButtonInvitePeople = async () => {
    let formData = {
      grId: data._id,
      emails: selectedPeople,
      feUrl: "http://localhost:8080/pkg-mgmt/gr/join"
    }
    console.log(formData);
    const res = await usersInvitePeople(user?.accessToken, formData, axiosJWT);

    console.log(res);
  }

  // const [linkInvite, setLinkInvite] = useState("");

  // const handleButtonInvite = async () => {
  //   const res = await usersInvitePeople(user?.accessToken, data._id, axiosJWT);
  //   let link = "http://localhost:8080";
  //   link += res.data;
  //   setLinkInvite(link);
  // };
  return (
    <Stack spacing={3}>
      {data.packages.map((route, index) =>
        route ? <PackageGroup item={route} id={data._id} key={index} /> : null
      )}
      <Stack
        spacing={1}
        sx={{
          width: "100%",
          bgcolor: Colors.background,
          borderRadius: "10px",
          boxShadow: "2px 2px 5px #8c8c8c",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingX: "20px",
            paddingTop: "10px",
          }}
        >
          <Typography variant="h5" color={Colors.textPrimary}>
            Thành viên trong nhóm
          </Typography>
          <CustomComponent.Button1
            sx={{ marginBottom: "10px" }}
            onClick={handleClickOpenInvite}
          >
            Mời thành viên
          </CustomComponent.Button1>
        </Box>
        {data.members.map((route) =>
          route ? (
            <Box
              key={route.user.user._id}
              className="package-group"
              sx={{ paddingBottom: "10px" }}
            >
              <Avatar src={route.user.user.avatar} />
              <Typography sx={{ paddingLeft: "10px" }}>
                {route.user.user.name}
              </Typography>
            </Box>
          ) : null
        )}
        <Dialog
          open={openInvite}
          onClose={handleCloseInvite}
          fullWidth
          sx={{ width: "50%", paddingLeft: "30%" }}
        >
          <DialogTitle> Thêm thành viên vào nhóm </DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  paddingTop: "5px",
                }}
              >
                <TextField
                  autoFocus
                  id="name"
                  label="Nhập địa chỉ mail"
                  type="email"
                  color="success"
                  fullWidth
                  value={email}
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  sx={{ marginLeft: "10px" }}
                  variant="contained"
                  color="success"
                  onClick={handleButtonSave}
                >
                  Chọn
                </Button>
              </Box>

              {selectedPeople.map((person, idx) =>
                person ? (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingX: "10px",
                      bgcolor: "#e6f7ff",
                    }}
                  >
                    <Typography> {person} </Typography>
                    <IconButton
                      onClick={(event) => handleButtonClear(event, person)}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Box>
                ) : null
              )}

              {selectedPeople.length > 0 ? (
                <CustomComponent.Button1 onClick={handleButtonInvitePeople}> Mời người </CustomComponent.Button1>
              ) : null}
            </Stack>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </Stack>
    </Stack>
  );
}

export default PackagesGroup;
