import * as React from "react";
import "./EditProfile.css";
import { Box, Button, IconButton, Modal, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 8,
};
function EditChild({ dob, setdob }) {
  const [open, setopen] = React.useState(false);
  const handleOpen = () => {
    setopen(true);
  };
  const handleClose = () => {
    setopen(false);
  };

  return (
    <React.Fragment>
      <div className="birthdate-section" onClick={handleOpen}>
        <text>Edit</text>
      </div>
      <Modal
        open={open}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        hideBackdrop
        onClose={handleClose}
      >
        <Box sx={{ ...style, width: 300, height: 400 }}>
          <div className="text">
            <h2>Edit date of birth ?</h2>
            <p>
              This can only be changed a few times. <hr />
              Make sure you enter the age of the <br />
              person using account
            </p>
            <input type="date" onChange={(e) => setdob(e.target.value)} />
            <Button
              className="e-button"
              onClick={() => {
                setopen(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
function EditProfile({ user, loggedInUser }) {
  const [open, setopen] = React.useState(false);
  const [name, setname] = React.useState(false);
  const [bio, setbio] = React.useState(false);
  const [location, setlocation] = React.useState(false);
  const [website, setwebsite] = React.useState(false);
  const [dob, setdob] = React.useState(false);
  const handleSave = async () => {
    const editedInfo = {
      name,
      bio,
      location,
      website,
      dob
    }
    if(editedInfo){
      await axios.patch(`http://localhost:5000/userUpdates/${user?.email}`, editedInfo)
      setopen(false);
      //console.log("saving");
    }
    
  };
  return (
    <div>
      <button className="Edit-profile-btn" onClick={() => setopen(true)}>
        Edit Profile
      </button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal">
          <div className="header">
            <IconButton
              onClick={() => {
                setopen(false);
              }}
            >
              <CloseIcon />
            </IconButton>
            <h2 className="header-title">Edit Profile</h2>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          </div>
          <form className="fill-content">
            <TextField
              className="text-field"
              fullWidth
              label="Name"
              id="fullWidth"
              variant="filled"
              onChange={(e) => setname(e.target.value)}
              defaultValue={loggedInUser[0]?.name ? loggedInUser[0]?.name : ""}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Bio"
              id="fullWidth"
              variant="filled"
              onChange={(e) => setbio(e.target.value)}
              defaultValue={loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ""}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Location"
              id="fullWidth"
              variant="filled"
              onChange={(e) => setlocation(e.target.value)}
              defaultValue={
                loggedInUser[0]?.location ? loggedInUser[0]?.location : ""
              }
            />
            <TextField
              className="text-field"
              fullWidth
              label="Website"
              id="fullWidth"
              variant="filled"
              onChange={(e) => setwebsite(e.target.value)}
              defaultValue={
                loggedInUser[0]?.website ? loggedInUser[0]?.website : ""
              }
            />
          </form>
          <div className="birthdate-section">
            <p>Birth Date</p>
            <p>.</p>
            <EditChild dob={dob} setdob={setdob} />
          </div>
          <div className="last-section">
            {loggedInUser[0]?.dob ? (
              <h2>{loggedInUser[0]?.dob}</h2>
            ) : (
              <h2>{dob ? dob : "Add your date of birth"}</h2>
            )}
            <div className="last-btn">
              <h2>Switch to professional</h2>
              <ChevronRightIcon />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default EditProfile;
