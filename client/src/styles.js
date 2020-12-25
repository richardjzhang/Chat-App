// @flow
export const colors = {
  // Primary Colors
  dodgerBlue: '#3B80FE',
  cloudBurst: '#21374D',
  honorNight: '#0C2426',

  // Palette
  sail: '#B7D8F9',
  iceCold: '#B7F9D8',
  dairyCream: '#F9D8B7',
  cupid: '#F9B7D8',

  // Greys
  athensGray: '#E7E7EF',
  grayChateau: '#A2AAB3',
  shuttleGray: '#616470',

  // Other
  white: '#FFF',
  black: '#000000',
};

// It doesn't fix all the possible issues on all browsers or devices, feel free to add rules
export const tappable = {
  cursor: 'pointer',
  userSelect: 'none', // to prevent the text selection (e.g. selecting text triggers the copy-paste popup menu on iOS and Android)
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', // to prevent the default tap highlight colour being applied
  WebkitTouchCallout: 'none', // to prevent the context menu from showing, at least on iOS for anchor elements
};

export const breakpoints = {
  tablet: 768,
};
