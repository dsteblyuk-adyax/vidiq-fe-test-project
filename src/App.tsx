import Keywords from './modules/Keywords/Keywords';
import { ThemeProvider } from '@mui/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const App = () => (
    <ThemeProvider theme={theme}>
        <Keywords/>
    </ThemeProvider>
);

export default App;
