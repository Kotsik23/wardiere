export { Card as AuthorCard } from "./ui/card.tsx"
export { CompletionButton } from "./ui/completion-button.tsx"
export { Brand } from "./ui/brand.tsx"
export { AboutText } from "./ui/about-text.tsx"
export { Photo as AuthorPhoto } from "./ui/photo.tsx"
export {
	useCreateAuthor,
	useUpdateAuthor,
	useGetAuthorById,
	useGetAuthorByUserId,
	useGetAuthors,
} from "./model/queries.ts"
export { useIsOwner } from "./model/use-is-owner.ts"
