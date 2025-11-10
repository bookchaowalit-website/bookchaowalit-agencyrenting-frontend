import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ArticleMetadata {
    title: string;
    description: string;
    date: string;
    author: string;
    image: string;
    tags: string[];
    slug: string;
}

export interface Article extends ArticleMetadata {
    content: string;
    excerpt: string;
    readTime: string;
}

const articlesDirectory = path.join(process.cwd(), 'content', 'articles');

export function getAllArticles(): Article[] {
    // Get all MDX files from the articles directory
    const fileNames = fs.readdirSync(articlesDirectory).filter(fileName => fileName.endsWith('.mdx'));

    const articles = fileNames.map(fileName => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(articlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Calculate read time (roughly 200 words per minute)
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200).toString();

        // Generate excerpt from content (first 150 characters)
        const excerpt = content.substring(0, 150).replace(/\n/g, ' ').trim() + '...';

        return {
            slug,
            title: data.title,
            description: data.description,
            date: data.date,
            author: data.author,
            image: data.image,
            tags: data.tags || [],
            content,
            excerpt,
            readTime,
        } as Article;
    });

    // Sort articles by date (newest first)
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): Article | null {
    try {
        const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200).toString();
        const excerpt = content.substring(0, 150).replace(/\n/g, ' ').trim() + '...';

        return {
            slug,
            title: data.title,
            description: data.description,
            date: data.date,
            author: data.author,
            image: data.image,
            tags: data.tags || [],
            content,
            excerpt,
            readTime,
        } as Article;
    } catch (error) {
        return null;
    }
}

export function getArticlesByTag(tag: string): Article[] {
    const allArticles = getAllArticles();
    return allArticles.filter(article => article.tags.includes(tag));
}

export function getAllTags(): string[] {
    const allArticles = getAllArticles();
    const tags = new Set<string>();
    allArticles.forEach(article => {
        article.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
}
