import { styled } from '@mui/material/styles';

const MenuContainer = styled('ul')(() => ({
  display: 'flex',
  background: '#000',
  flexDirection: 'column',
  padding: '8px',
}));

const DesktopMenuContainer = styled(MenuContainer)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-evenly',
}));
const MenuItem = styled('li')(() => ({
  padding: '4px',
  color: '#fff',
  listStyle: 'none',
}));

export function MenuDesktop() {
  return (
    <DesktopMenuContainer>
      <MenuItem>Home</MenuItem>
      <MenuItem>About</MenuItem>
      <MenuItem>Contact</MenuItem>
    </DesktopMenuContainer>
  );
}

const Bar = styled('div')(() => ({
  content: "''",
  width: '30px',
  border: '1px solid #00adb5',
  margin: '4px',
}));

export function MenuMobile() {
  return (
    <MenuContainer>
      <Bar />
      <Bar />
      <Bar />
    </MenuContainer>
  );
}
