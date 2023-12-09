import React from 'react'
import { Avatar, Box, Card, CardContent, Grid, Typography,Divider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

const NewDropBoxApplication = ({data}) => {
  return (
    <>
      <Card
        sx={{ height: '100%' }}

      >
        <CardContent>
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid item sx={{minWidth:"100%"}}>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="overline"
              >
                New DropBox Applications
              </Typography>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                {(data!==null) ? data : "---"}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: '#3F51B5',
                  height: 56,
                  width: 56
                }}
              >
                <EmailIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box sx={{ pt: 3 }}>
          <Divider sx={{ bgcolor: "#3F51B5" ,width:"100%",height:"3px"}} />
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default NewDropBoxApplication