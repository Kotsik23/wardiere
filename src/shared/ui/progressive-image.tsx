import { ImgHTMLAttributes, useEffect, useState } from "react"
import { cn } from "./util.ts"

type ProgressiveImageProps = {
	src: string
	placeholder: string
	alt: string
} & ImgHTMLAttributes<HTMLImageElement>

export const ProgressiveImage = ({
	src,
	placeholder,
	alt,
	className,
	...props
}: ProgressiveImageProps) => {
	const [imageSrc, setImageSrc] = useState(placeholder)

	const isLoaded = placeholder !== imageSrc

	useEffect(() => {
		const img = new Image()
		img.src = src
		img.onload = () => {
			setImageSrc(src)
		}
	}, [src])

	return (
		<img
			src={imageSrc}
			alt={alt}
			className={cn("blur-md transition-all duration-500", isLoaded && "blur-none", className)}
			{...props}
		/>
	)
}
