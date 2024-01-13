import React, { useState } from "react";
import "./Sidebar.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import SidebarOptions from "./SidebarOptions";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreIcon from "@mui/icons-material/More";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DoneIcon from "@mui/icons-material/Done";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import CustomLink from "./CustomLink";
import useLoggedInUser from "../../hooks/useLoggedInUser";
function Sidebar({ handleLogout, user }) {
  const [anchorEl, setanchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [loggedInUser] = useLoggedInUser();
  const userProfilePic = loggedInUser[0]?.profileImage
    ? loggedInUser[0]?.profileImage
    : "https://api.imgbb.com/1/upload?key=4e03c013581c0c5cc53d4d056dc3cc61";
  const handleClick = (e) => {
    setanchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setanchorEl(null);
  };
  const result = user[0]?.email.split("@")[0];
  return (
    <div className="Sidebar">
      <TwitterIcon className="Sidebar_twitterIcon" />
      <CustomLink to="/Home/feed">
        <SidebarOptions active Icon={HomeIcon} text="Home" />
      </CustomLink>
      <CustomLink to="/Home/explore">
        <SidebarOptions active Icon={SearchIcon} text="Explore" />
      </CustomLink>
      <CustomLink to="/Home/notifications">
        <SidebarOptions active Icon={NotificationsIcon} text="Notifications" />
      </CustomLink>
      <CustomLink to="/Home/messages">
        <SidebarOptions active Icon={MailOutlineIcon} text="Messages" />
      </CustomLink>
      <CustomLink to="/Home/bookmarks">
        <SidebarOptions active Icon={BookmarkBorderIcon} text="Bookmarks" />
      </CustomLink>
      <CustomLink to="/Home/lists">
        <SidebarOptions active Icon={ListAltIcon} text="Lists" />
      </CustomLink>
      <CustomLink to="/Home/profile">
        <SidebarOptions active Icon={PermIdentityIcon} text="Profile" />
      </CustomLink>
      <CustomLink to="/Home/more">
        <SidebarOptions active Icon={MoreIcon} text="More" />
      </CustomLink>
      <Button variant="outlined" className="Sidebar_tweet">
        Tweet
      </Button>
      <div className="Profile_info">
        <Avatar src={userProfilePic} />
        <div className="User_info">
          <h4>
            {loggedInUser[0]?.name
              ? loggedInUser[0]?.name
              : user && user[0]?.displayName}
          </h4>
          <h5>@{result}</h5>
        </div>
        <IconButton
          size="small"
          sx={{ ml: 2 }}
          aria-controls={openMenu ? "Basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="Basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClick={handleClose}
          onClose={handleClose}
        >
          <MenuItem className="Profile_info1">
            <Avatar src={userProfilePic} />
            <div className="User_info Subuser_info">
              <div>
                <h4>
                  {loggedInUser[0]?.name
                    ? loggedInUser[0]?.name
                    : user && user[0]?.displayName}
                </h4>
                <h5>@{result}</h5>
              </div>
              <ListItemIcon className="Done_icon">
                <DoneIcon />
              </ListItemIcon>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>Add an existing account</MenuItem>
          <MenuItem onClick={handleLogout}>Log out @{result}</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Sidebar;
