import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { MenuDesktop, MenuMobile } from './menu';

const AppContainer = styled('div')(() => ({
  minWidth: '600px',
  minHeight: '400px',
  border: '1px solid #777',
}));

export default function MyApp() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <AppContainer>
      {!matches && <MenuDesktop />}
      {matches && <MenuMobile />}
    </AppContainer>
  );
}
