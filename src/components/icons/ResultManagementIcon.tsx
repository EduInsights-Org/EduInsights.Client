import { useTheme } from "@context/ThemeContext";

const ResultManagementIcon = ({ isActive }: { isActive?: boolean }) => {
    const { isDarkMode } = useTheme();
  
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="15px"
        viewBox="0 -960 960 960"
        width="15px"
        fill={isActive ? (isDarkMode ? "#d4d4d4" : "#37352f") : "#9e9e9e"}
      >
        <path d="M168-144q-29.7 0-50.85-21.15Q96-186.3 96-216v-528q0-29.7 21.15-50.85Q138.3-816 168-816h624q29.7 0 50.85 21.15Q864-773.7 864-744v528q0 29.7-21.15 50.85Q821.7-144 792-144H168Zm0-72h624v-528H168v528Zm43-71h192v-72H211v72Zm371-73 170-170-51-51-119 119-51-51-51 51 102 102Zm-371-84h192v-72H211v72Zm0-156h192v-72H211v72Zm-43 384v-528 528Z" />
      </svg>
    </div>
  );
};

export default ResultManagementIcon;
