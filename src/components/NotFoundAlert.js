import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NotFoundAlert({
  dialogOpen,
  setDialogOpen,
  removeSearch,
}) {
  const handleClose = () => {
    setDialogOpen(false);
    removeSearch();
  };

  return (
    <React.Fragment>
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiPaper-root": {
            background: "linear-gradient(to right, #0062ff50, #60efff50)",
            boxShadow: "0px 0px 10px 10px #0000005d",
            borderRadius: "10px",
            color: "aliceblue",
          },
          background: "#000000d5",
        }}
      >
        <DialogTitle id="alert-dialog-title">{"No Matches Found"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            There were no matches for your search, please try again. Remember
            that the search is case specific!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <p id="ok">Ok</p>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
