import React, { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { MovieType } from '@/app/typings/movieType';
import { iconButtonStyles, toolTipStyles } from './MovieInfoStyles';

const MovieInfo =  ({ movie }: { movie: MovieType }):JSX.Element => {
  const [open, setOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const handleTouchStart = () => setIsTouchDevice(true);
    window.addEventListener('touchstart', handleTouchStart, { once: true });
    return () => window.removeEventListener('touchstart', handleTouchStart);
  }, []);
  

  const handleTooltip = (state?: boolean): void => {
    setOpen((prev) => (typeof state === 'boolean' ? state : !prev));
  };
  

  return (
    <ClickAwayListener onClickAway={() => handleTooltip(false)}>
      <div>
        <Tooltip
          title={movie.overview}
          open={open}
          onClose={() => handleTooltip(false)}
          onOpen={() => handleTooltip(true)}
          placement="top"
          slotProps={{
            tooltip: {
              sx: toolTipStyles,
            },
          }}
          disableFocusListener 
          disableTouchListener 
        >
          <IconButton
            size="small"
            onClick={() => handleTooltip()}
            onMouseEnter={!isTouchDevice ? () => handleTooltip(open) : undefined} 
            onMouseLeave={!isTouchDevice ? () => handleTooltip(false) : undefined} 
            sx={iconButtonStyles}
          >
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
}

export default MovieInfo;
