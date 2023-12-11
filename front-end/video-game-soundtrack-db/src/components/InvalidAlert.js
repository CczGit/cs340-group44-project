/*
  Create / Update Form Dialog Component
  All material UI components are implemented using code based heavily on
  the material UI documentation. Taken throughout different dates between November and December of 2023
  Link: https://mui.com/material-ui/getting-started/
*/

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
  message,
  dialogTitle,
  loadData,
  reload,
}) {
  const handleClose = () => {
    setDialogOpen(false);
    if (reload) {
      loadData();
    }
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
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
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
