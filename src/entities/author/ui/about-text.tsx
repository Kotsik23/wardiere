type AboutTextProps = {
	aboutText: string | undefined
}

export const AboutText = ({ aboutText }: AboutTextProps) => {
	return (
		<p className={"my-2 text-center text-lg font-medium md:text-xl lg:text-2xl"}>{aboutText}</p>
	)
}
