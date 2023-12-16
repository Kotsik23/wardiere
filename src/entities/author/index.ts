export { Card as AuthorCard } from "./ui/card.tsx"
export { Brand } from "./ui/brand.tsx"
export { AboutText } from "./ui/about-text.tsx"
export {
	useCreateAuthor,
	useUpdateAuthor,
	useRemoveAuthor,
	useGetAuthorById,
	useGetAuthorByUserId,
	useGetAuthors,
} from "./model/queries.ts"
export { useIsOwner } from "./model/use-is-owner.ts"
