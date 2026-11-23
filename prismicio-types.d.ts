import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

/**
 * Content for Author documents
 */
interface AuthorDocumentData {
	/**
	 * Name field in *Author*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: author.name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Role or title field in *Author*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g. Founder, CPA, Freelance designer
	 * - **API ID Path**: author.role
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	role: prismic.KeyTextField;
	
	/**
	 * Photo field in *Author*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: author.avatar
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	avatar: prismic.ImageField<never>;
	
	/**
	 * Bio field in *Author*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: author.bio
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	bio: prismic.RichTextField;
	
	/**
	 * Expertise (comma separated) field in *Author*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: invoicing, freelance taxes, cash flow
	 * - **API ID Path**: author.expertise
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	expertise: prismic.KeyTextField;
	
	/**
	 * LinkedIn field in *Author*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: author.linkedin
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	linkedin: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * X (Twitter) field in *Author*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: author.x
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	x: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Website field in *Author*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: author.website
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	website: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Author document from Prismic
 *
 * - **API ID**: `author`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type AuthorDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<AuthorDocumentData>, "author", Lang>;

/**
 * Content for Blog Category documents
 */
interface BlogCategoryDocumentData {
	/**
	 * Name field in *Blog Category*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_category.name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Description field in *Blog Category*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_category.description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	description: prismic.KeyTextField;/**
	 * Meta title field in *Blog Category*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_category.meta_title
	 * - **Tab**: SEO
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta description field in *Blog Category*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_category.meta_description
	 * - **Tab**: SEO
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
}

/**
 * Blog Category document from Prismic
 *
 * - **API ID**: `blog_category`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlogCategoryDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<BlogCategoryDocumentData>, "blog_category", Lang>;

/**
 * Item in *Blog Post → Key takeaways (the short answer)*
 */
export interface BlogPostDocumentDataKeyTakeawaysItem {
	/**
	 * Takeaway field in *Blog Post → Key takeaways (the short answer)*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.key_takeaways[].point
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	point: prismic.KeyTextField;
}

/**
 * Item in *Blog Post → FAQs (8 to 10 People Also Ask questions)*
 */
export interface BlogPostDocumentDataFaqsItem {
	/**
	 * Question field in *Blog Post → FAQs (8 to 10 People Also Ask questions)*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.faqs[].question
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	question: prismic.KeyTextField;
	
	/**
	 * Answer field in *Blog Post → FAQs (8 to 10 People Also Ask questions)*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.faqs[].answer
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	answer: prismic.RichTextField;
}

/**
 * Item in *Blog Post → References (sources cited in the article)*
 */
export interface BlogPostDocumentDataReferencesItem {
	/**
	 * Source field in *Blog Post → References (sources cited in the article)*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.references[].source
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	source: ContentRelationshipFieldWithData<[{"fields":["title","publisher","url","year"],"id":"source"}]>;
}

/**
 * Item in *Blog Post → Related posts (optional, otherwise automatic)*
 */
export interface BlogPostDocumentDataRelatedPostsItem {
	/**
	 * Post field in *Blog Post → Related posts (optional, otherwise automatic)*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.related_posts[].post
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	post: prismic.ContentRelationshipField<"blog_post">;
}

type BlogPostDocumentDataSlicesSlice = RichTextSlice | CalloutSlice | FigureSlice | DataTableSlice | QuoteSlice | StatsSlice | ProsConsSlice | CtaSlice | VideoSlice

/**
 * Content for Blog Post documents
 */
interface BlogPostDocumentData {
	/**
	 * Title (H1) field in *Blog Post*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Excerpt (150 to 200 characters) field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: State the reader pain and what they will get
	 * - **API ID Path**: blog_post.excerpt
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	excerpt: prismic.KeyTextField;
	
	/**
	 * Cover image (2400x1350) field in *Blog Post*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.featured_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	featured_image: prismic.ImageField<never>;
	
	/**
	 * Primary category field in *Blog Post*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.category
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	category: ContentRelationshipFieldWithData<[{"fields":["name"],"id":"blog_category"}]>;
	
	/**
	 * Author field in *Blog Post*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.author
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	author: ContentRelationshipFieldWithData<[{"fields":["name","role","avatar"],"id":"author"}]>;
	
	/**
	 * Fact-checked or reviewed by field in *Blog Post*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.reviewer
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	reviewer: ContentRelationshipFieldWithData<[{"fields":["name","role"],"id":"author"}]>;
	
	/**
	 * Published date field in *Blog Post*
	 *
	 * - **Field Type**: Date
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.published_date
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/date
	 */
	published_date: prismic.DateField;
	
	/**
	 * Last meaningful update field in *Blog Post*
	 *
	 * - **Field Type**: Date
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.updated_date
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/date
	 */
	updated_date: prismic.DateField;
	
	/**
	 * Key takeaways (the short answer) field in *Blog Post*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.key_takeaways[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	key_takeaways: prismic.GroupField<Simplify<BlogPostDocumentDataKeyTakeawaysItem>>;
	
	/**
	 * FAQs (8 to 10 People Also Ask questions) field in *Blog Post*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.faqs[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	faqs: prismic.GroupField<Simplify<BlogPostDocumentDataFaqsItem>>;
	
	/**
	 * References (sources cited in the article) field in *Blog Post*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.references[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	references: prismic.GroupField<Simplify<BlogPostDocumentDataReferencesItem>>;
	
	/**
	 * Related posts (optional, otherwise automatic) field in *Blog Post*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.related_posts[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	related_posts: prismic.GroupField<Simplify<BlogPostDocumentDataRelatedPostsItem>>;
	
	/**
	 * Slice Zone field in *Blog Post*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<BlogPostDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: blog_post.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: blog_post.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Blog Post*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
	
	/**
	 * Canonical URL (only if first published elsewhere) field in *Blog Post*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.canonical_url
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	canonical_url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Hide from search engines field in *Blog Post*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: blog_post.noindex
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	noindex: prismic.BooleanField;
}

/**
 * Blog Post document from Prismic
 *
 * - **API ID**: `blog_post`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlogPostDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<BlogPostDocumentData>, "blog_post", Lang>;

/**
 * Content for Source documents
 */
interface SourceDocumentData {
	/**
	 * Title of the page or report field in *Source*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: source.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Publisher field in *Source*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g. Federal Reserve, IRS, Stripe
	 * - **API ID Path**: source.publisher
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	publisher: prismic.KeyTextField;
	
	/**
	 * URL field in *Source*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: source.url
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Year published field in *Source*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: *None*
	 * - **API ID Path**: source.year
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	year: prismic.NumberField;
	
	/**
	 * Date checked field in *Source*
	 *
	 * - **Field Type**: Date
	 * - **Placeholder**: *None*
	 * - **API ID Path**: source.accessed
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/date
	 */
	accessed: prismic.DateField;
}

/**
 * Source document from Prismic
 *
 * - **API ID**: `source`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SourceDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<SourceDocumentData>, "source", Lang>;

export type AllDocumentTypes = AuthorDocument | BlogCategoryDocument | BlogPostDocument | SourceDocument;

/**
 * Primary content in *Callout → Default → Primary*
 */
export interface CalloutSliceDefaultPrimary {
	/**
	 * Tone field in *Callout → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: tip
	 * - **API ID Path**: callout.default.primary.tone
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	tone: prismic.SelectField<"tip" | "note" | "warning", "filled">;
	
	/**
	 * Heading (optional) field in *Callout → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: callout.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	heading: prismic.KeyTextField;
	
	/**
	 * Body field in *Callout → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: callout.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
}

/**
 * Default variation for Callout Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CalloutSliceDefault = prismic.SharedSliceVariation<"default", Simplify<CalloutSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Callout*
 */
type CalloutSliceVariation = CalloutSliceDefault

/**
 * Callout Shared Slice
 *
 * - **API ID**: `callout`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CalloutSlice = prismic.SharedSlice<"callout", CalloutSliceVariation>;

/**
 * Primary content in *Call to Action → Default → Primary*
 */
export interface CtaSliceDefaultPrimary {
	/**
	 * Heading field in *Call to Action → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Never chase a client again.
	 * - **API ID Path**: cta.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	heading: prismic.KeyTextField;
	
	/**
	 * Body field in *Call to Action → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cta.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	body: prismic.KeyTextField;
}

/**
 * Default variation for Call to Action Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CtaSliceDefault = prismic.SharedSliceVariation<"default", Simplify<CtaSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Call to Action*
 */
type CtaSliceVariation = CtaSliceDefault

/**
 * Call to Action Shared Slice
 *
 * - **API ID**: `cta`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CtaSlice = prismic.SharedSlice<"cta", CtaSliceVariation>;

/**
 * Primary content in *Data Table → Default → Primary*
 */
export interface DataTableSliceDefaultPrimary {
	/**
	 * Table (first row is the header) field in *Data Table → Default → Primary*
	 *
	 * - **Field Type**: Table
	 * - **Placeholder**: *None*
	 * - **API ID Path**: data_table.default.primary.table
	 * - **Documentation**: https://prismic.io/docs/fields/table
	 */
	table: prismic.TableField;
	
	/**
	 * Caption, e.g. Prices checked on vendor pages, Month YYYY field in *Data Table → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: data_table.default.primary.caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
}

/**
 * Default variation for Data Table Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type DataTableSliceDefault = prismic.SharedSliceVariation<"default", Simplify<DataTableSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Data Table*
 */
type DataTableSliceVariation = DataTableSliceDefault

/**
 * Data Table Shared Slice
 *
 * - **API ID**: `data_table`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type DataTableSlice = prismic.SharedSlice<"data_table", DataTableSliceVariation>;

/**
 * Primary content in *Figure → Default → Primary*
 */
export interface FigureSliceDefaultPrimary {
	/**
	 * Image or chart (2400x1350) field in *Figure → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: figure.default.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Caption (name the data source) field in *Figure → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: figure.default.primary.caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
}

/**
 * Default variation for Figure Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FigureSliceDefault = prismic.SharedSliceVariation<"default", Simplify<FigureSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Figure*
 */
type FigureSliceVariation = FigureSliceDefault

/**
 * Figure Shared Slice
 *
 * - **API ID**: `figure`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FigureSlice = prismic.SharedSlice<"figure", FigureSliceVariation>;

/**
 * Item in *Pros and Cons → Default → Primary → Pros*
 */
export interface ProsConsSliceDefaultPrimaryProsItem {
	/**
	 * Pro field in *Pros and Cons → Default → Primary → Pros*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pros_cons.default.primary.pros[].text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	text: prismic.KeyTextField;
}

/**
 * Item in *Pros and Cons → Default → Primary → Cons*
 */
export interface ProsConsSliceDefaultPrimaryConsItem {
	/**
	 * Con field in *Pros and Cons → Default → Primary → Cons*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pros_cons.default.primary.cons[].text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	text: prismic.KeyTextField;
}

/**
 * Primary content in *Pros and Cons → Default → Primary*
 */
export interface ProsConsSliceDefaultPrimary {
	/**
	 * Heading (optional) field in *Pros and Cons → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pros_cons.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	heading: prismic.KeyTextField;
	
	/**
	 * Pros field in *Pros and Cons → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pros_cons.default.primary.pros[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	pros: prismic.GroupField<Simplify<ProsConsSliceDefaultPrimaryProsItem>>;
	
	/**
	 * Cons field in *Pros and Cons → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pros_cons.default.primary.cons[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	cons: prismic.GroupField<Simplify<ProsConsSliceDefaultPrimaryConsItem>>;
}

/**
 * Default variation for Pros and Cons Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ProsConsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ProsConsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Pros and Cons*
 */
type ProsConsSliceVariation = ProsConsSliceDefault

/**
 * Pros and Cons Shared Slice
 *
 * - **API ID**: `pros_cons`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ProsConsSlice = prismic.SharedSlice<"pros_cons", ProsConsSliceVariation>;

/**
 * Primary content in *Quote → Default → Primary*
 */
export interface QuoteSliceDefaultPrimary {
	/**
	 * Quote or Short on time? summary field in *Quote → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: quote.default.primary.quote
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	quote: prismic.RichTextField;
	
	/**
	 * Attribution (optional) field in *Quote → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: quote.default.primary.cite
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cite: prismic.KeyTextField;
}

/**
 * Default variation for Quote Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type QuoteSliceDefault = prismic.SharedSliceVariation<"default", Simplify<QuoteSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Quote*
 */
type QuoteSliceVariation = QuoteSliceDefault

/**
 * Quote Shared Slice
 *
 * - **API ID**: `quote`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type QuoteSlice = prismic.SharedSlice<"quote", QuoteSliceVariation>;

/**
 * Primary content in *Rich Text → Default → Primary*
 */
export interface RichTextSliceDefaultPrimary {
	/**
	 * Content field in *Rich Text → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: rich_text.default.primary.content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	content: prismic.RichTextField;
}

/**
 * Default variation for Rich Text Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type RichTextSliceDefault = prismic.SharedSliceVariation<"default", Simplify<RichTextSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Rich Text*
 */
type RichTextSliceVariation = RichTextSliceDefault

/**
 * Rich Text Shared Slice
 *
 * - **API ID**: `rich_text`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type RichTextSlice = prismic.SharedSlice<"rich_text", RichTextSliceVariation>;

/**
 * Item in *Stats → Default → Primary → Stats*
 */
export interface StatsSliceDefaultPrimaryItemsItem {
	/**
	 * Value, e.g. 85% field in *Stats → Default → Primary → Stats*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: stats.default.primary.items[].value
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	value: prismic.KeyTextField;
	
	/**
	 * Label field in *Stats → Default → Primary → Stats*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: stats.default.primary.items[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Source field in *Stats → Default → Primary → Stats*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: stats.default.primary.items[].source
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	source: ContentRelationshipFieldWithData<[{"fields":["title","publisher","url","year"],"id":"source"}]>;
}

/**
 * Primary content in *Stats → Default → Primary*
 */
export interface StatsSliceDefaultPrimary {
	/**
	 * Stats field in *Stats → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: stats.default.primary.items[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	items: prismic.GroupField<Simplify<StatsSliceDefaultPrimaryItemsItem>>;
}

/**
 * Default variation for Stats Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type StatsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<StatsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Stats*
 */
type StatsSliceVariation = StatsSliceDefault

/**
 * Stats Shared Slice
 *
 * - **API ID**: `stats`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type StatsSlice = prismic.SharedSlice<"stats", StatsSliceVariation>;

/**
 * Primary content in *Video → Default → Primary*
 */
export interface VideoSliceDefaultPrimary {
	/**
	 * YouTube or Vimeo URL field in *Video → Default → Primary*
	 *
	 * - **Field Type**: Embed
	 * - **Placeholder**: *None*
	 * - **API ID Path**: video.default.primary.embed
	 * - **Documentation**: https://prismic.io/docs/fields/embed
	 */
	embed: prismic.EmbedField
	
	/**
	 * Caption field in *Video → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: video.default.primary.caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
}

/**
 * Default variation for Video Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type VideoSliceDefault = prismic.SharedSliceVariation<"default", Simplify<VideoSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Video*
 */
type VideoSliceVariation = VideoSliceDefault

/**
 * Video Shared Slice
 *
 * - **API ID**: `video`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type VideoSlice = prismic.SharedSlice<"video", VideoSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			AuthorDocument,
			AuthorDocumentData,
			BlogCategoryDocument,
			BlogCategoryDocumentData,
			BlogPostDocument,
			BlogPostDocumentData,
			BlogPostDocumentDataKeyTakeawaysItem,
			BlogPostDocumentDataFaqsItem,
			BlogPostDocumentDataReferencesItem,
			BlogPostDocumentDataRelatedPostsItem,
			BlogPostDocumentDataSlicesSlice,
			SourceDocument,
			SourceDocumentData,
			AllDocumentTypes,
			CalloutSlice,
			CalloutSliceDefaultPrimary,
			CalloutSliceVariation,
			CalloutSliceDefault,
			CtaSlice,
			CtaSliceDefaultPrimary,
			CtaSliceVariation,
			CtaSliceDefault,
			DataTableSlice,
			DataTableSliceDefaultPrimary,
			DataTableSliceVariation,
			DataTableSliceDefault,
			FigureSlice,
			FigureSliceDefaultPrimary,
			FigureSliceVariation,
			FigureSliceDefault,
			ProsConsSlice,
			ProsConsSliceDefaultPrimaryProsItem,
			ProsConsSliceDefaultPrimaryConsItem,
			ProsConsSliceDefaultPrimary,
			ProsConsSliceVariation,
			ProsConsSliceDefault,
			QuoteSlice,
			QuoteSliceDefaultPrimary,
			QuoteSliceVariation,
			QuoteSliceDefault,
			RichTextSlice,
			RichTextSliceDefaultPrimary,
			RichTextSliceVariation,
			RichTextSliceDefault,
			StatsSlice,
			StatsSliceDefaultPrimaryItemsItem,
			StatsSliceDefaultPrimary,
			StatsSliceVariation,
			StatsSliceDefault,
			VideoSlice,
			VideoSliceDefaultPrimary,
			VideoSliceVariation,
			VideoSliceDefault
		}
	}
}