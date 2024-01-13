import React, { useEffect, useState } from "react";
import "./Feed.css";
import Tweetbox from "./Tweetbox";
import axios from "axios";
import Post from "./Post/Post";

function Feed() {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/post")
    .then((res)=>res.json())
    .then((data)=>{
      setposts(data)
    })
  }, [posts]);
  return (
    <div className="feed">
      <div className="feed_header">
        <h2>Home</h2>
      </div>
      <Tweetbox />
      {
        posts.map((p)=><Post key={p._id} p={p}/>)
      }
    </div>
  );
}

export default Feed;
