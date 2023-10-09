import ArrowCircleLeftSharpIcon from '@mui/icons-material/ArrowCircleLeftSharp';
import ArrowCircleRightSharpIcon from '@mui/icons-material/ArrowCircleRightSharp';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { IconButton, Stack } from '@mui/material';
import React, { useState } from 'react';
import image1 from '../assets/img/slider/slider1.jpg';
import image2 from '../assets/img/slider/slider2.jpg';
import image3 from '../assets/img/slider/slider3.jpg';
import image4 from '../assets/img/slider/slider4.jpg';
import image5 from '../assets/img/slider/slider5.jpg';
import '../styles/image-slider.css';
const IMAGES = [image1, image2, image3, image4, image5];

export const ImageSlider = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const showNextImage = () => {
    setImageIndex((index) => {
      if (index === IMAGES.length - 1) return 0;
      return index + 1;
    });
  };
  const showPrevImage = () => {
    setImageIndex((index) => {
      if (index === 0) return IMAGES.length - 1;
      return index - 1;
    });
  };
  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <Stack
        sx={{
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          overflow: 'hidden',
        }}
      >
        {IMAGES.map((url) => (
          <img
            key={url}
            src={url}
            style={{
              width: '100%',
              height: '100%',
              translate: `${-100 * imageIndex}%`,
              flexShrink: 0,
              transition: 'translate 300ms ease-in-out',
            }}
          />
        ))}
      </Stack>
      <IconButton
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          p: '1rem',
          '&:hover': {
            color: '#000',
          },
        }}
        onClick={showPrevImage}
      >
        <ArrowCircleLeftSharpIcon fontSize='large' />
      </IconButton>
      <IconButton
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          p: '1rem',
          '&:hover': {
            color: '#000',
          },
        }}
        onClick={showNextImage}
      >
        <ArrowCircleRightSharpIcon fontSize='large' />
      </IconButton>
      <Stack
        sx={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: '.5rem',
          left: '50%',
          translate: '-50%',
          color: '#000',
          gap: '.5rem',
        }}
      >
        {IMAGES.map((_, index) => (
          <button
            style={{
              all: 'unset',
            }}
            key={index}
            onClick={() => setImageIndex(index)}
          >
            {index === imageIndex ? (
              <IconButton>
                <RadioButtonCheckedIcon
                  sx={{
                    color: 'grey.500',
                    fontSize: '10px',
                    color: '#000',
                  }}
                />
              </IconButton>
            ) : (
              <IconButton>
                <RadioButtonUncheckedIcon
                  sx={{
                    color: '#000',
                    fontSize: '10px',
                  }}
                />
              </IconButton>
            )}
          </button>
        ))}
      </Stack>
    </Stack>
  );
};
