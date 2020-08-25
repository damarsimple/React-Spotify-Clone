import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Musics, Music } from "../type/type";
import { Button, Box } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
interface MusicList {
  data: Musics;
  currentlyPlaying: string;
  playing: boolean;
  changeMusic: (e: Music) => void;
  play: () => void;
  pause: () => void;
}
export default function MusicList(props: MusicList) {
  const changeMusic = (music: Music) => {
    props.changeMusic(music);
  };
  return (
    <Box height="100%" width="100%">
      <Paper>
        <TableContainer>
          <Table stickyHeader={true} aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Button>PLAY</Button>
                </TableCell>
                <TableCell>TITLE</TableCell>
                <TableCell>ARTIST</TableCell>
                <TableCell>DURATION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.map((e, index) => {
                return (
                  <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                    <TableCell>
                      {e.title == props.currentlyPlaying && props.playing ? (
                        <Button onClick={props.pause}>
                          <Pause />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            changeMusic(e);
                          }}
                        >
                          <PlayArrowIcon />
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>{e.title}</TableCell>
                    <TableCell>{e.artist}</TableCell>
                    <TableCell>{e.duration ? e.duration : 1.37}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
