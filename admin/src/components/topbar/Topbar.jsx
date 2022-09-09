import {
  LanguageTwoTone,
  NotificationsNoneTwoTone,
  SettingsTwoTone,
} from "@material-ui/icons";
import React from "react";
import "./Topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">panela.</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNoneTwoTone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageTwoTone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <SettingsTwoTone />
          </div>
          <img
            src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            alt="avatar"
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
