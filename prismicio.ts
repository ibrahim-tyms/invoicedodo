import {
	createClient as baseCreateClient,
	type ClientConfig,
} from "@prismicio/client";
import prismicConfig from "./prismic.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
	process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT ||
	process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME ||
	prismicConfig.repositoryName;

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
/** Resolves a Prismic document link to its URL on this site. */
export const linkResolver = (doc: { type: string; uid?: string | null }) => {
	if (doc.type === "blog_post") return `/blog/${doc.uid}`;
	if (doc.type === "blog_category") return `/blog/category/${doc.uid}`;
	if (doc.type === "author") return `/blog/author/${doc.uid}`;
	return null;
};

export const createClient = (config: ClientConfig = {}) => {
	return baseCreateClient(repositoryName, {
		routes: prismicConfig.routes,
		accessToken: process.env.PRISMIC_ACCESS_TOKEN || undefined,
		...config,
	});
};