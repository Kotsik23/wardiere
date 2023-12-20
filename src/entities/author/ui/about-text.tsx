type AboutTextProps = {
	aboutText: string | undefined
}

export const AboutText = ({ aboutText }: AboutTextProps) => {
	return (
		<p className={"mx-auto max-w-4xl text-justify text-base font-medium md:text-lg lg:text-xl"}>
			{aboutText}
		</p>
	)
}
