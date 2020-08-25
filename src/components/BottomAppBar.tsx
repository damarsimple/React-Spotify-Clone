import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import {
  Grid,
  IconButton,
  LinearProgress,
  Typography,
  Box,
  Slider,
  Button,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
interface MusicBar {
  title: string;
  artist: string;
  link: string;
  duration: number;
  currentTime: number;
  percentage: number;
  playing: boolean;
  volume: number;
  buffering: number;
  play: () => void;
  pause: () => void;
  setVolume: (event: any) => void;
}
export default (props: MusicBar) => {
  const [mute, setMute] = useState<boolean>(false);
  const handleChangeVolume = (event: any, newValue: number | number[]) => {
    props.setVolume(newValue);
  };
  const handleChangeMuteState = () => {
    setMute(!mute);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        style={{
          top: "auto",
          bottom: 0,
        }}
      >
        <LinearProgress
          variant="buffer"
          value={props.percentage}
          valueBuffer={props.buffering}
        />
        <Toolbar>
          <Grid container justify="flex-start">
            <Grid item>
              <img width="65" src="/logo512.png" alt="Album" />
            </Grid>
            <Grid item>
              <Box ml={1} mr={1}>
                <Typography
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "20rem",
                  }}
                  noWrap
                  variant="h6"
                >
                  {props.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {props.artist}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <IconButton aria-label="play/pause">
                <SkipPreviousIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                onClick={props.playing ? props.pause : props.play}
                aria-label="play/pause"
              >
                {props.playing ? <Pause /> : <PlayArrowIcon />}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton aria-label="play/pause">
                <SkipNextIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Box width={500}>
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={handleChangeMuteState}>
                  {!mute ? <VolumeUp /> : <VolumeOffIcon />}
                </Button>
              </Grid>
              <Grid item xs>
                <Slider
                  value={props.volume}
                  onChange={handleChangeVolume}
                  aria-labelledby="continuous-slider"
                />
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
