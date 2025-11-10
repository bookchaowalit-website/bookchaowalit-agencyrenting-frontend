"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import enMessages from "../../../messages/en.json";
import thMessages from "../../../messages/th.json";

const messageMap: Record<string, Record<string, unknown>> = {
    en: enMessages,
    th: thMessages,
};

interface ArticleItem {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    slug: string;
    publishedAt: string;
    author: string;
    tags: string[];
    readTime: number;
    featured: boolean;
}

interface ArticlesPageProps {
    params: {
        locale: string;
    };
}

export default function ArticlesPage({ params }: ArticlesPageProps) {
    const [articles, setArticles] = useState<ArticleItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const messages = messageMap[params.locale as keyof typeof messageMap] || messageMap.en;
    const articlesMessages = messages.articles as any;

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('/api/articles');
                if (!response.ok) {
                    throw new Error('Failed to fetch articles');
                }
                const data = await response.json();
                setArticles(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">Loading articles...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-red-500">Error: {error}</div>
            </div>
        );
    }

    const featuredArticles = articles.filter(article => article.featured);
    const latestArticles = articles.filter(article => !article.featured).slice(0, 6);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{articlesMessages?.title || "Articles"}</h1>
                <p className="text-lg text-muted-foreground">
                    {articlesMessages?.description || "Discover insights and guides about real estate"}
                </p>
            </div>

            {featuredArticles.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">{articlesMessages?.featured || "Featured Articles"}</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {featuredArticles.map((article) => (
                            <Card key={article.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(article.publishedAt).toLocaleDateString()}
                                        <Clock className="h-4 w-4 ml-2" />
                                        {article.readTime} min read
                                    </div>
                                    <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                                    <CardDescription className="line-clamp-3">
                                        {article.excerpt}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            <span className="text-sm">{article.author}</span>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            {articlesMessages?.readMore || "Read More"}
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </div>
                                    {article.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {article.tags.slice(0, 3).map((tag) => (
                                                <Badge key={tag} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            )}

            <section>
                <h2 className="text-2xl font-semibold mb-6">{articlesMessages?.latest || "Latest Articles"}</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {latestArticles.map((article) => (
                        <Card key={article.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(article.publishedAt).toLocaleDateString()}
                                    <Clock className="h-4 w-4 ml-2" />
                                    {article.readTime} min read
                                </div>
                                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                                <CardDescription className="line-clamp-3">
                                    {article.excerpt}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        <span className="text-sm">{article.author}</span>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        {articlesMessages?.readMore || "Read More"}
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </div>
                                {article.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {article.tags.slice(0, 3).map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
