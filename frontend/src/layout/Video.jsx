import React from 'react';
import YouTube from 'react-youtube';
import getYouTubeID from 'get-youtube-id';
import { Typography } from 'antd';

const Video = ({url, text}) => {

  const opts = {
    height: '250',
    width: '500',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const onPlayerReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  var id = getYouTubeID(`${url}`);
  console.log(id);

  return (
    <div>
      <YouTube videoId={id} opts={opts} onReady={onPlayerReady} />
      <Typography.Title level={4} style={{marginTop: -5, marginBottom: 25}}>{text}</Typography.Title>
    </div>
  );
};

export default Video;
