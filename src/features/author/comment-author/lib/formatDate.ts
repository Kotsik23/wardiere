export function formatTimeAgo(timestamp: number): string {
	const now = Date.now()
	const diffInSeconds = Math.round((now - timestamp) / 1000)

	const SECONDS_PER_MINUTE = 60
	const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60
	const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24
	const SECONDS_PER_WEEK = SECONDS_PER_DAY * 7

	if (Math.abs(diffInSeconds) < SECONDS_PER_WEEK) {
		const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

		if (Math.abs(diffInSeconds) < SECONDS_PER_MINUTE) {
			return rtf.format(-diffInSeconds, "second")
		} else if (Math.abs(diffInSeconds) < SECONDS_PER_HOUR) {
			return rtf.format(-Math.round(diffInSeconds / SECONDS_PER_MINUTE), "minute")
		} else if (Math.abs(diffInSeconds) < SECONDS_PER_DAY) {
			return rtf.format(-Math.round(diffInSeconds / SECONDS_PER_HOUR), "hour")
		} else {
			return rtf.format(-Math.round(diffInSeconds / SECONDS_PER_DAY), "day")
		}
	} else {
		const date = new Date(timestamp)
		return date.toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
			hour: "2-digit",
			minute: "2-digit",
		})
	}
}
