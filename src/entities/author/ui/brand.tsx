type BrandProps = {
	brand: string | undefined
}

export const Brand = ({ brand }: BrandProps) => {
	return (
		<h1
			className={
				"text-center text-3xl font-bold italic sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl"
			}
		>
			{brand}
		</h1>
	)
}
