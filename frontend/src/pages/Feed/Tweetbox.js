import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "./TweetBox.css";
import axios from "axios";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

function Tweetbox() {
  const [post, setpost] = useState("");
  const [imageURL, setimageURL] = useState("");
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [isLoading, setisLoading] = useState("");
  const [ loggedInUser ] = useLoggedInUser();
  //console.log(loggedInUser);
  const [ user ]=useAuthState(auth);
  const email = user?.email;

  const userProfilePic = loggedInUser[0]?.profileImage
    ? loggedInUser[0]?.profileImage
    : "https://api.imgbb.com/1/upload?key=4e03c013581c0c5cc53d4d056dc3cc61";
  const handleUploadImage = (e) => {
    setisLoading(true);
    const image = e.target.files[0];
    //console.log(image);
    const formData = new FormData();
    formData.set("image", image);

    axios
      .post(
        "https://api.imgbb.com/1/upload?key=4e03c013581c0c5cc53d4d056dc3cc61",
        formData
      )
      .then((res) => {
        setimageURL(res.data.data.display_url);
        //console.log(res.data.data.display_url);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setisLoading(false);
      });
  };
  const handleTweet = (e) => {
    e.preventDefault();
    if(user.providerData[0].providerId==="password"){
      fetch(`http://localhost:5000/loggedInUser?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setname(data[0]?.name);
        setusername(data[0]?.username)
      });
    } else{
      setname(user?.displayName)
      setusername(email?.split("@")[0])
    }
    //if(user?providerData[0]?.provider){}
    if (name) {
      //console.log(post);
      const userPost = {
        profilePhoto: userProfilePic,
        post: post,
        photo: imageURL,
        username: username,
        name: name,
        email: email

      };
      //console.log(userPost);
      setpost("");
      setimageURL("");
      fetch("http://localhost:5000/post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userPost),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };
  return (
    <div className="tweetBox">
      <form onSubmit={handleTweet}>
        <div className="tweetBox_input">
          <Avatar src={userProfilePic} />
          <input
            type="text"
            placeholder="What's happening"
            onChange={(e) => setpost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="imageIcon_tweetButton">
          <label htmlFor="image" className="imageIcon">
            {isLoading ? (
              <p>Uploading image</p>
            ) : (
              <p>{imageURL ? "image uploaded" : <AddPhotoAlternateIcon />}</p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="imageInput"
            onChange={handleUploadImage}
          />
          <Button className="tweetBox_tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Tweetbox;
