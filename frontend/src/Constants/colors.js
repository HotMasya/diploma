const { freeze } = Object;

export const BLUE = freeze({
  _100: '#e9ecfe',
  _200: '#bdc5fc',
  _300: '#919ff9',
  _400: '#6578f7',
  _500: '#4f65f6',
  _600: '#3443a2',
  _700: '#27327a',
  _800: '#181f4c',
  _900: '#0c1026',
});

export const GREY = freeze({
  _100: '#f5f5f7',
  _200: '#e9e9eb',
  _300: '#e1e0e5',
  _400: '#d5d4db',
  _500: '#cac9d3',
  _600: '#aeadba',
  _700: '#898894',
  _800: '#5e5e66',
  _900: '#3f3e45',
});

export const RED = freeze({
  _100: '#fdf2f1',
  _200: '#fbdfdc',
  _300: '#f8bab4',
  _400: '#f58c7f',
  _500: '#f24a0a',
  _600: '#cc3800',
  _700: '#ab3001',
  _800: '#792201',
  _900: '#611b01',
});

export const YELLOW = freeze({
  _100: '#fef6ef',
  _200: '#fdefe1',
  _300: '#fbdfbf',
  _400: '#f9cd96',
  _500: '#f7b95c',
  _600: '#e8a422',
  _700: '#c98e1e',
  _800: '#9c6600',
  _900: '#6e4800',
});

export const GREEN = freeze({
  _100: '#e6fcef',
  _200: '#bae6ce',
  _300: '#88d4a5',
  _400: '#4bb873',
  _500: '#0ba142',
  _600: '#038532',
  _700: '#15763e',
  _800: '#186132',
  _900: '#054f24',
});

export const MAGENTA = freeze({
  _100: '#fdf2fb',
  _200: '#fbddf7',
  _300: '#f7b5ef',
  _400: '#f381e7',
  _500: '#ef1cdf',
  _600: '#ce18c1',
  _700: '#a8139d',
  _800: '#770e6f',
  _900: '#540a4e',
});

export const BG = freeze({
  primary: GREY._100,
  secondary: GREY._200,
  tertiary: GREY._300,
});

export const TEXT = freeze({
  default: BLUE._900,
  subdued: GREY._800,
  disabled: GREY._600,
});

export const MISC = freeze({
  white: '#ffffff',
});
