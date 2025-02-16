import React from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

export type IPagination = {
	currentPage: number
	pageSize: number
	totalPages: number
	totalRecords: number
}

type IPaginationProps = {
	pagination: {
		currentPage: number
		pageSize: number
		totalPages: number
		totalRecords: number
	}
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
	setPageSize: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: React.FC<IPaginationProps> = ({
	pagination,
	setCurrentPage,
	setPageSize,
}) => {
	const startRecord = (pagination?.currentPage - 1) * pagination?.pageSize + 1
	const endRecord = Math.min(
		pagination?.currentPage * pagination?.pageSize,
		pagination?.totalRecords
	)
	return (
		<div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
			<div className="flex flex-1 justify-between sm:hidden">
				<span
					className={`relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${pagination?.currentPage === 1 ? "cursor-not-allowed bg-gray-100" : "cursor-pointer bg-white"}`}
					onClick={() => {
						if (pagination?.currentPage > 1) {
							setCurrentPage(pagination?.currentPage - 1)
						}
					}}
				>
					Previous
				</span>
				<span
					className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${pagination?.currentPage === pagination?.totalPages ? "cursor-not-allowed bg-gray-100" : "cursor-pointer bg-white"}`}
					onClick={() => {
						if (pagination?.currentPage < pagination?.totalPages) {
							setCurrentPage(pagination?.currentPage + 1)
						}
					}}
				>
					Next
				</span>
			</div>
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p className="text-sm text-gray-400">
						Showing{" "}
						<span className="font-medium">{startRecord}</span> to{" "}
						<span className="font-medium">{endRecord}</span> of{" "}
						<span className="font-medium">
							{pagination?.totalRecords}
						</span>{" "}
						results
					</p>
				</div>
				<div className="flex items-center">
					<select
						id="pageSize"
						name="pageSize"
						className="me-2 h-9 rounded-md border border-gray-200 bg-gray-600 pl-3 pr-7 text-gray-200"
						onChange={(e) => setPageSize(Number(e.target.value))}
						defaultValue={10}
					>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="50">30</option>
					</select>
					<nav
						aria-label="Pagination"
						className="isolate inline-flex -space-x-px rounded-md shadow-sm"
					>
						<span
							className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-200 ring-1 ring-inset ring-gray-400 hover:bg-gray-500 focus:z-20 focus:outline-offset-0 ${pagination?.currentPage === 1 ? "cursor-not-allowed bg-gray-600" : "cursor-pointer bg-gray-700"}`}
							onClick={() => {
								if (pagination?.currentPage > 1) {
									setCurrentPage(pagination?.currentPage - 1)
								}
							}}
						>
							<span className="sr-only">Previous</span>
							<FaAngleLeft
								aria-hidden="true"
								className="h-5 w-5"
							/>
						</span>
						<span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-300 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
							{pagination?.currentPage}
						</span>
						<span
							className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-200 ring-1 ring-inset ring-gray-400 hover:bg-gray-500 focus:z-20 focus:outline-offset-0 ${pagination?.currentPage === pagination?.totalPages ? "cursor-not-allowed bg-gray-600" : "cursor-pointer bg-gray-700"}`}
							onClick={() => {
								if (
									pagination?.currentPage <
									pagination?.totalPages
								) {
									setCurrentPage(pagination?.currentPage + 1)
								}
							}}
						>
							<span className="sr-only">Next</span>
							<FaAngleRight
								aria-hidden="true"
								className="h-5 w-5"
							/>
						</span>
					</nav>
				</div>
			</div>
		</div>
	)
}

export default Pagination

