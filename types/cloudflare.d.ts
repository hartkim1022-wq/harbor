// Runtime interface is supplied by Cloudflare; Drizzle validates its concrete use.
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface D1Database {}
interface Fetcher { fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> }
declare module "cloudflare:workers" { export const env: { DB?: D1Database } }
