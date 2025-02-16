import React from "react"
import UserAvatar from "./userAvatar"

type TUserInfoForListProps = {
	user: {
		id: string
		email: string
		name: string
	}
}

const UserInfoForList: React.FC<TUserInfoForListProps> = ({ user }) => {
	return (
		<div
			className="flex h-full w-full min-w-60 flex-row items-center gap-2"
			title={user.email}
		>
			<div className="list-avatar">
				<UserAvatar name={user.name} />
			</div>
			<div className="flex flex-col leading-[22px]">
				<p className="w-60 truncate text-[16px] font-bold">
					{user.name}
				</p>
				<p className="w-60 truncate text-[14px] text-[#333333]/50">
					{user.email}
				</p>
			</div>
		</div>
	)
}

export default UserInfoForList

