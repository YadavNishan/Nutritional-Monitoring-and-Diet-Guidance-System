import React, { useEffect, useRef } from "react"

type PUserAvatar = {
	name?: string
}

const UserAvatar: React.FC<PUserAvatar> = ({ name }) => {
	const parentRef = useRef<HTMLDivElement | null>(null)
	const textRef = useRef<HTMLDivElement | null>(null)

	const getUserIcon = ({ name }: { name: string }) => {
		const words = name.split(" ")
		let firstName = words[0]
		let lastName = words[1]

		return {
			firstNameFirstLetter: firstName[0],
			lastNameFirstLetter: lastName[0],
		}
	}

	const adjustFontSize = () => {
		if (parentRef.current && textRef.current) {
			const parentWidth = parentRef.current.offsetWidth
			textRef.current.style.fontSize = `${parentWidth * 0.5}px` // Adjust font size based on parent width
		}
	}

	useEffect(() => {
		adjustFontSize()
		window.addEventListener("resize", adjustFontSize)
		return () => {
			window.removeEventListener("resize", adjustFontSize)
		}
	}, [])

	const { firstNameFirstLetter, lastNameFirstLetter } = getUserIcon({
		name: name || "",
	})

	return (
		<div ref={parentRef} className="h-full w-full">
			<div
				ref={textRef}
				className={`font-dm-sans flex aspect-square select-none items-center justify-center rounded-full bg-neutral text-base text-secondary shadow-xl`}
			>
				{firstNameFirstLetter.toUpperCase()}
				{lastNameFirstLetter.toUpperCase()}
			</div>
		</div>
	)
}

export default UserAvatar

