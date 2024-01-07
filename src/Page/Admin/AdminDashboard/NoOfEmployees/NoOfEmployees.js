import React from 'react'
import { Avatar, Box, Card, CardContent, Grid, Divider, Typography } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const NoOfEmployees = ({data}) => {
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
                Number Of Total Applications
              </Typography>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                {(data!==null) ? data.numTotalJobApps+data.numTotalDropboxApps : "---"}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: 'lightgreen',
                  height: 56,
                  width: 56
                }}
              >
                <PeopleAltIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box sx={{ pt: 3 }}>
            <Divider sx={{ bgcolor: "lightgreen", width: "100%", height: "3px" }} />

          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default NoOfEmployees