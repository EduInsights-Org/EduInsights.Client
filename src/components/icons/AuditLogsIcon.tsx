import { useTheme } from "@context/ThemeContext";

const AuditLogsIcon = ({ isActive }: { isActive?: boolean }) => {
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
        <path d="M444-432q35.47 0 59.73-24.27Q528-480.53 528-516t-24.27-59.73Q479.47-600 444-600t-59.73 24.27Q360-551.47 360-516t24.27 59.73Q408.53-432 444-432Zm177 144-95-96q-19 11-39.72 17.5t-41.9 6.5Q379-360 333.5-405.39T288-515.89q0-65.11 45.39-110.61t110.5-45.5q65.11 0 110.61 45.55T600-515.57q0 21.16-6.5 41.87Q587-453 576-434l96 95-51 51ZM216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-168h72v168h168v72H216Zm360 0v-72h168v-168h72v168q0 29.7-21.15 50.85Q773.7-144 744-144H576ZM144-576v-168q0-29.7 21.15-50.85Q186.3-816 216-816h168v72H216v168h-72Zm600 0v-168H576v-72h168q29.7 0 50.85 21.15Q816-773.7 816-744v168h-72Z" />
      </svg>
    </div>
  );
};

export default AuditLogsIcon;
