import { cronJobs } from "convex/server"
import { internal } from "./_generated/api"

const crons = cronJobs()

crons.interval("populate similar authors", { hours: 24 }, internal.authors.populateSimilarAuthors)

export default crons
