import { useTheme } from "../services/ThemeContext";

export default function ThemeToggleButton() {
  const {theme, toggleTheme} = useTheme();

  return (
      <div className="btn btn-primary z-3 position-absolute" style={{bottom:'10px', right:'10px'}} onClick={toggleTheme}>
        <div className="h4 material-symbols-outlined m-0 p-0">{theme == 'light' ? 'dark_mode' : 'light_mode'}</div>
      </div>
  )
}