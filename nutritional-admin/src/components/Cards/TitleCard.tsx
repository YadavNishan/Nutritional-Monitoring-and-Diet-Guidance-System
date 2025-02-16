import { ReactNode } from "react"

const TitleCard: React.FC<{
	title: string
	children: ReactNode
}> = ({ title, children }) => {
	return (
		<div className="card w-full bg-base-100 p-6 shadow-xl">
			{/* Title for Card */}
			<div className="text-xl font-semibold">{title}</div>

			<div className="divider mt-2"></div>

			{/** Card Body */}
			<div className="h-full w-full bg-base-100 pb-6">{children}</div>
		</div>
	)
}

export default TitleCard

