import React from 'react';
import { Typography } from '@material-ui/core';

function CheckoutSuccess() {
  return (
    <React.Fragment>
      <Typography style={{fontSize: "18px", textAlign: "center", fontWeight: 600,}} >
        Thank you for your market.
      </Typography>
      <Typography style={{fontSize: "14px", textAlign: "center"}} >
        Your market number is #2001539. We have emailed your market confirmation,
        and will send you an update when your order has shipped.
      </Typography>
    </React.Fragment>
  );
}

export default CheckoutSuccess;
