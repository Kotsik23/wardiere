import { ReactNode } from "react"

import { QueryParamProvider as ReactQueryParamProvider } from "use-query-params"

import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6"

export const QueryParamProvider = ({ children }: { children: ReactNode }) => {
	return (
		<ReactQueryParamProvider adapter={ReactRouter6Adapter}>{children}</ReactQueryParamProvider>
	)
}
