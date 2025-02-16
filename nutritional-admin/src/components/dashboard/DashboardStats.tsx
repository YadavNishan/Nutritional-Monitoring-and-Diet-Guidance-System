import { Link } from "react-router"

const DashboardStats: React.FC<{
	title: string
	icon: JSX.Element
	value: string
	description: string
	link: string
}> = ({ title, icon, value, description, link }) => {
	return (
		<div className="stats shadow hover:outline hover:outline-white/10">
			<Link to={link} className="stat cursor-pointer">
				<div className="stat-figure dark:text-primary">{icon}</div>
				<div className="stat-title dark:text-slate-300">{title}</div>
				<div className="stat-value dark:text-primary">{value}</div>
				<div>{description}</div>
			</Link>
		</div>
	)
}

export default DashboardStats

