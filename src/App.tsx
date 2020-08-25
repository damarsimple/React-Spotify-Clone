import React from "react";
import BottomAppBar from "./components/BottomAppBar";
import MusicList from "./components/MusicList";
import { Musics, Music } from "./type/type";
import { Box, Grid } from "@material-ui/core";

interface AppData {
  title: string;
  artist: string;
  link: string;
  duration: number;
  currentTime: number;
  percentage: number;
  buffering: number;
  playing: boolean;
  volume: number;
  musics: Musics;
}

class App extends React.Component {
  state: AppData;
  audio: HTMLAudioElement;
  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      artist: "",
      link: "",
      playing: false,
      duration: 0,
      currentTime: 0,
      percentage: 0,
      buffering: 0,
      volume: 100,
      musics: [],
    };
    this.audio = new Audio();
    this.listenUpdate = this.listenUpdate.bind(this);
    this.listenProgress = this.listenProgress.bind(this);
  }
  async data() {
    return {
      title: "LALALALA",
      artist: "Y2K",
      link:
        "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_2MG.mp3",
    };
  }
  async setMusic(link: string | undefined) {
    this.pause();
    this.audio = new Audio("/musics/" + link);
  }
  changeMusic(e: Music) {
    this.pause();
    this.setMusic(e.link).then(() => {
      this.setState({
        link: "/musics/" + e.link,
        artist: e.artist,
        title: e.title,
        duration: this.audio.duration,
        currentTime: this.audio.currentTime,
      });
    });
    this.play();
  }
  componentDidMount() {
    fetch("/music.json").then((response) => {
      response.json().then((e) => this.setState({ musics: e }));
    });
    this.data().then((val) => {
      this.audio = new Audio(val.link);
      this.setState({ title: val.title, artist: val.artist, link: val.link });
    });
  }
  listenUpdate() {
    const cast = this.audio;
    this.setState({
      currentTime: cast.currentTime,
      percentage: (cast.currentTime * 100) / cast.duration,
    });
  }
  listenProgress() {
    const cast = this.audio;
    try {
      let buffered = cast.buffered.end(0) ? cast.buffered.end(0) : 0;
      let duration = cast.duration;
      this.setState({ buffering: (buffered * 100) / duration });
      console.log(cast.buffered.start(0) + cast.buffered.end(0));
    } catch (e) {}
  }
  play() {
    this.audio.play().then(() => {
      this.setState({ playing: true });
      this.setState({
        duration: this.audio.duration,
        currentTime: this.audio.currentTime,
        volume: this.audio.volume * 100,
      });
      this.audio.addEventListener("timeupdate", this.listenUpdate);
      this.audio.addEventListener("progress", this.listenProgress);
    });
  }
  pause() {
    this.audio.pause();
    this.setState({ playing: false });
    this.audio.removeEventListener("timeupdate", this.listenUpdate);
    this.audio.removeEventListener("progress", this.listenProgress);
  }
  async setVolume(value: number) {
    this.setState({ volume: value });
    this.audio.volume = value / 100;
  }
  render() {
    return (
      <>
        <Grid container>
          <Grid item xs={false} sm={2}></Grid>
          <Grid item xs={12} sm={8}>
            <MusicList
              data={this.state.musics}
              currentlyPlaying={this.state.title}
              playing={this.state.playing}
              changeMusic={this.changeMusic.bind(this)}
              play={this.play.bind(this)}
              pause={this.pause.bind(this)}
            />
          </Grid>
          <Grid item xs={false} sm={2}></Grid>
        </Grid>

        <BottomAppBar
          artist={this.state.artist}
          currentTime={this.state.currentTime}
          duration={this.state.duration}
          link={this.state.link}
          percentage={this.state.percentage}
          buffering={this.state.buffering}
          playing={this.state.playing}
          title={this.state.title}
          pause={this.pause.bind(this)}
          play={this.play.bind(this)}
          volume={this.state.volume}
          setVolume={this.setVolume.bind(this)}
        />
      </>
    );
  }
}

export default App;
