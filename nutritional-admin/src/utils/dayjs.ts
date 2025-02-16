import dayjs from "dayjs"

export const monthYearFormat = (date: string) => {
	return dayjs(date).format("MMMM YYYY")
}

export const dateTimeFormat = (date: string) => {
	return dayjs(date).format("DD MMM YYYY, h:mm A")
}

export const monthDayYearFormat = (date: string) => {
	return dayjs(date).format("DD MMM, YYYY")
}

export const monthDayYearTimeFormat = (date: string) => {
	return dayjs(date).format(" DD MMM, YYYY, h:mm a")
}
