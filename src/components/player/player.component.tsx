import React, { useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import { Container, Button, Overlay, Inner, Close } from './player.style';


interface IPlayer {
  children?: JSX.Element | JSX.Element[] | string,
  [ restProps: string ]: any
}

interface IContextState {
  showPlayer: boolean,
  setShowPlayer: React.Dispatch<React.SetStateAction<boolean>>
}


export const PlayerContext = createContext<Partial<IContextState>>({});

function Player({ children, ...restProps }: IPlayer) {
  const [ showPlayer, setShowPlayer ] = useState(false);

  return (
    <PlayerContext.Provider value={{ showPlayer, setShowPlayer }}>
      <Container { ...restProps }>{ children }</Container>
    </PlayerContext.Provider>
  );
}

Player.Video = function PlayerVideo({ src, ...restProps }: IPlayer) {
  const { showPlayer, setShowPlayer } = useContext(PlayerContext);

  return showPlayer
    ? ReactDOM.createPortal(
        <Overlay onClick={ () => setShowPlayer!(false) } data-testid="player">
          <Inner>
            <video id="netflix-player" controls>
              <source src={ process.env.PUBLIC_URL + src } type="video/mp4" />
            </video>
            <Close />
          </Inner>
        </Overlay>,
        document.body
      )
    : null;
};

Player.Button = function PlayerButton({ ...restProps }: IPlayer) {
  const { showPlayer, setShowPlayer } = useContext(PlayerContext);

  return (
    <Button onClick={ () => setShowPlayer!(!showPlayer) } { ...restProps }>
      Play
    </Button>
  );
};


export default Player;
