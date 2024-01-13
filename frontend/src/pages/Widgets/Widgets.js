import React from "react";
import "./Widgets.css";
import SearchIcon from "@mui/icons-material/Search";
import { TwitterTimelineEmbed, TwitterTweetEmbed } from "react-twitter-embed"
function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets_input">
        <SearchIcon className="widgets_searchIcon" />
        <input type="text" placeholder="SearchTwitter" />
      </div>
      <div className="widgets_widgetContainer">
        <h2>What's happening</h2>
      </div>
      <TwitterTweetEmbed tweetId={"1557187138352861186"} />
      <TwitterTimelineEmbed sourceType="profile" screenName="ElonMusk" options={{ height: 400 }}/>
    </div>
  );
}

export default Widgets;
