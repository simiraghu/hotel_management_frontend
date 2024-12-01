import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Slide,
  IconButton,
  Icon,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

// Animation for the popup
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SuccessPopUp = ({ show, onClose }) => {
  return (
    <Dialog
      open={show} // Show dialog based on `show` prop
      TransitionComponent={Transition}
      keepMounted
      PaperProps={{
        sx: {
          borderRadius: 2,
          textAlign: "center",
          padding: 2,
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Success</Typography>
        {/* Close Button */}
        <IconButton onClick={onClose} sx={{ color: "gray" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box textAlign="center">
          <Icon sx={{ fontSize: 60, color: "green" }}>
            <CheckCircleIcon fontSize="inherit" />
          </Icon>
          <Typography variant="h5" sx={{ marginY: 2 }}>
            Payment Successful!
          </Typography>
          <Typography variant="body1">Your Room was Booked successfully.</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessPopUp;
