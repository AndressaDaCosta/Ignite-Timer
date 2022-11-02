import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

// apenas sobrescrever 
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
