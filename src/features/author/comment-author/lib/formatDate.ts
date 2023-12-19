export function formatTimeAgo(timestamp: number): string {
	const now = Date.now()
	const diffInSeconds = Math.round((now - timestamp) / 1000)

	const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

	const SECONDS_PER_MINUTE = 60
	const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60
	const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24
	const SECONDS_PER_MONTH = SECONDS_PER_DAY * 30
	const SECONDS_PER_YEAR = SECONDS_PER_DAY * 365

	if (Math.abs(diffInSeconds) < SECONDS_PER_MINUTE) {
		return rtf.format(-diffInSeconds, "second")
	} else if (Math.abs(diffInSeconds) < SECONDS_PER_HOUR) {
		return rtf.format(-Math.round(diffInSeconds / SECONDS_PER_MINUTE), "minute")
	} else if (Math.abs(diffInSeconds) < SECONDS_PER_DAY) {
		return rtf.format(-Math.round(diffInSeconds / SECONDS_PER_HOUR), "hour")
	} else if (Math.abs(diffInSeconds) < SECONDS_PER_MONTH) {
		return rtf.format(-Math.round(diffInSeconds / SECONDS_PER_DAY), "day")
	} else if (Math.abs(diffInSeconds) < SECONDS_PER_YEAR) {
		return rtf.format(-Math.round(diffInSeconds / SECONDS_PER_MONTH), "month")
	} else {
		return rtf.format(-Math.round(diffInSeconds / SECONDS_PER_YEAR), "year")
	}
}
