import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { Close } from "@mui/icons-material";
import { 
  Alert,
  Collapse,
  IconButton,
  useMediaQuery
} from "@mui/material";


export const AlertBar = (props) => {
  const screenLg = useMediaQuery('(min-width:768px)');

  const [showAlert, setShowAlert] = useState(false)
  const [alertContent, setAlertContent] = useState('')

  const show = props.showAlert
  const content = props.alertContent
  
  useEffect(() => {
    setShowAlert(show)
    setAlertContent(content)
  }, [show, content])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3, height: 5 }}>
      <Box sx={{ width: screenLg ? '25%' : '80%' }}>
        <Collapse in={showAlert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setShowAlert(false)
                  setAlertContent('')
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {alertContent}
          </Alert>
        </Collapse>
      </Box>
    </Box>
  )
}