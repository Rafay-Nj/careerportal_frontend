import React from 'react'
import { Avatar, Box, Card, CardContent, Grid, Divider, Typography } from '@mui/material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const NoOfOpenJobs = ({data}) => {
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
                                Number Of Open Jobs
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
                                    backgroundColor: '#008080',
                                    height: 56,
                                    width: 56
                                }}
                            >
                                <FormatListNumberedIcon />
                            </Avatar>
                        </Grid>
                    </Grid>
                    <Box sx={{ pt: 3 }}>
                        <Divider sx={{ bgcolor: "#008080", width: "100%", height: "3px" }} />

                    </Box>
                </CardContent>
            </Card>
        </>
    )
}

export default NoOfOpenJobs