import React from 'react'
import { Avatar, Box, Card, CardContent, Grid, Divider, Typography } from '@mui/material';
import BallotIcon from '@mui/icons-material/Ballot';

const NewJobApplication = ({ data }) => {
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
                New Job Applications
              </Typography>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                {(data !== null) ? data : "---"}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: 'darkgrey',
                  height: 56,
                  width: 56
                }}
              >
                <BallotIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box sx={{ pt: 3 }}>
            <Divider sx={{ bgcolor: "darkgrey", width: "100%", height: "3px" }} />
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default NewJobApplication