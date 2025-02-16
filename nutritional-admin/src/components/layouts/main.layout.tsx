import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../sidebar/Sidebar";

const MainLayout: React.FC = () => {
	return (
		<div className="flex">
			<Sidebar />
			<Outlet />
		</div>
	);
};

export default MainLayout;

