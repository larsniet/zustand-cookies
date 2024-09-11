"use client";

import { useSidebarStore } from "@/providers/sidebar-store-provider";

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebarStore((state) => state);

  return (
    <aside
      className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
    >
      <div className="flex items-center relative justify-between p-4 border-b">
        <h1 className="text-xl font-bold">Sidebar</h1>
        <button
          className="text-xl absolute right-[-80px] bg-slate-300"
          onClick={toggleSidebar}
        >
          Toggle
        </button>
      </div>
      <div className="p-4">
        <p>Content</p>
      </div>
    </aside>
  );
}
