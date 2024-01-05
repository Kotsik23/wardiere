export function formatBigNumber(number: number): string {
	if (number >= 1000) {
		return (Math.round(number / 1000) + "K").toString()
	} else {
		return number.toString()
	}
}
