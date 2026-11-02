
"use client";

import { useState } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

export default function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (tabs.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActiveTab(index)}
            className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === index
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="pt-5">{tabs[activeTab].content}</div>
    </div>
  );
}
