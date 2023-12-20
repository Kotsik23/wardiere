export const formatFileSize = (size: number, fractionDigits: number = 2): string => {
	const units = ["B", "KB", "MB", "GB"]

	let unitIndex = 0
	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024
		unitIndex++
	}

	return `${size.toFixed(fractionDigits)} ${units[unitIndex]}`
}
