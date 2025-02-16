import React from "react"
import { TUser } from "../../types/user"
import UserAvatar from "../userInfo/userAvatar"

type PUserListView = {
	users: TUser[] | null
}

const UserListView: React.FC<PUserListView> = ({ users }) => {
	const mapRows = () => {
		if (!users || users.length === 0) {
			return (
				<tr>
					<td colSpan={10} className="h-16 text-center">
						No users found.
					</td>
				</tr>
			)
		}
		return users.map((user, index) => (
			<tr key={index} className="border-b border-[#191e24]">
				<td>{index + 1}</td>
				<td>
					<div className="flex items-center space-x-3">
						<div className="avatar">
							<div className="mask mask-squircle h-12 w-12">
								<UserAvatar name={user.name} />
							</div>
						</div>
						<div className="flex flex-col">
							<div className="font-bold">{user.name}</div>
							<div>{user.email}</div>
						</div>
					</div>
				</td>
				<td>{user.age}</td>
				<td>{user.gender}</td>
				<td>{user.weight}</td>
				<td>{user.height}</td>
				<td>{user.calorieGoal}</td>
			</tr>
		))
	}

	return (
		<div className="w-full overflow-x-auto">
			<table className="table w-full">
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Age</th>
						<th>Gender</th>
						<th>Weight</th>
						<th>Height</th>
						<th>Calorie Goal</th>
					</tr>
				</thead>
				<tbody>{mapRows()}</tbody>
			</table>
		</div>
	)
}

export default UserListView

