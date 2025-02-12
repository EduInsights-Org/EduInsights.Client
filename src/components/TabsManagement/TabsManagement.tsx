import { useState } from "react";

interface TabsManagementProps {
  tabs: any;
}

function TabsManagement({ tabs }: TabsManagementProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div>
      <div className="mb-4 border-b border-light-borderGray dark:border-borderGray">
        <div className="flex items-center justify-between">
          <ul
            className="flex flex-wrap text-sm text-center gap-x-6"
            role="tablist"
          >
            {tabs.map((tab) => (
              <li key={tab.id} className="" role="presentation">
                <button
                  className={`inline-block py-4 px-1 border-b-2 rounded-t-lg text-xs text-light-font02 dark:text-font02 ${
                    activeTab === tab.id
                      ? "border-light-font02 dark:border-font02"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-2">
            {tabs.map(
              (tab) =>
                activeTab === tab.id &&
                tab.action && <div key={tab.id}>{tab.action}</div>
            )}
          </div>
        </div>
      </div>
      <div>
        {tabs.map(
          (tab) => activeTab === tab.id && <div key={tab.id}>{tab.content}</div>
        )}
      </div>
    </div>
  );
}

export default TabsManagement;
