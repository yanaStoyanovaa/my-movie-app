import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { MovieType } from '@/app/typings/movieType';
import { iconButtonStyles, toolTipStyles } from './MovieInfoStyles';

const MovieInfo =  ({ movie }: { movie: MovieType }):JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleTooltipOpen = ():void => {
    setOpen(true); 
  };

  const handleTooltipClose = ():void => {
    setOpen(false); 
  };

  const handleTooltipToggle = ():void => {
    setOpen((prev) => !prev); 
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <Tooltip
          title={movie.overview}
          open={open}
          onClose={handleTooltipClose}
          onOpen={handleTooltipOpen}
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
            onClick={handleTooltipToggle}
            onMouseEnter={handleTooltipOpen} 
            onMouseLeave={handleTooltipClose} 
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