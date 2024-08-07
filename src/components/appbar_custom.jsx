import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate } from "react-router-dom";
import PaymentPopup from "./payment";
import { fetchProfile } from "../api/profileHelpers";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function AppBarCus({
  showMenuIcon = false,
  onMenuIconClick = () => {},
  fixed = false,
  isclickable = true,
  iswallet = true
}) {
  const navigate = useNavigate();
  const [isPaymentPopupOpen, setPaymentPopupOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogoClick = () => {
    navigate("/");
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenPaymentPopup = () => {
    setPaymentPopupOpen(true);
  };

  const handleClosePaymentPopup = async () => {
    setPaymentPopupOpen(false);
    await updateWalletBalance();
  };

  const updateWalletBalance = async () => {
    setLoading(true);
    const response = await fetchProfile();
    if (response && response.length > 0 && response[0].wallet_balance) {
      setWalletBalance(response[0].wallet_balance);
    }
    setLoading(false);
  };

  useEffect(() => {
    updateWalletBalance();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position={fixed ? "fixed" : "static"} color="primary">
        <Toolbar sx={{ justifyContent: "space-between", marginLeft: isMobile ? 0 : '100px' }}>
          {/* Menu Icon */}
          {showMenuIcon && isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={onMenuIconClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Box sx={{ flexGrow: 1, textAlign: "center" }}>
            <div onClick={isclickable ? handleLogoClick : null} style={{ cursor: isclickable ? "pointer" : "default" }}>
              <img
                src="logo.png"
                alt="Logo"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "100px",
                  height: "auto",
                }}
              />
            </div>
          </Box>

          {/* Payment Button */}
          {iswallet && (
            <Button
              color="inherit"
              onClick={handleOpenPaymentPopup}
              startIcon={<AccountBalanceWalletIcon />}
              sx={{
                textTransform: "none",
                display: "flex",
                alignItems: "center"
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                `Wallet: ₹${walletBalance}`
              )}
            </Button>
          )}

          {/* Notification Button */}
        </Toolbar>
      </AppBar>

      {/* Payment Popup */}
      <PaymentPopup
        open={isPaymentPopupOpen}
        onClose={handleClosePaymentPopup}
        onUpdateWallet={updateWalletBalance}
      />
    </Box>
  );
}
