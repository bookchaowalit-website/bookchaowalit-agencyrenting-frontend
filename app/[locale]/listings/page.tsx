"use client";

import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import PropertySearch from "@/components/PropertySearch";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { filterProperties, sortProperties, Property } from "@/lib/sampleData";
import {
    Grid,
    List,
    Map,
    SlidersHorizontal,
    ArrowUpDown,
    Building2,
    Home,
    MapPin,
    TrendingUp,
    AlertCircle,
} from "lucide-react";
import enMessages from "../../../messages/en.json";
import thMessages from "../../../messages/th.json";

const messageMap: Record<string, any> = {
    en: enMessages,
    th: thMessages,
};

interface PropertyFilters {
    keyword: string;
    location: string;
    type: string;
    priceMin: string;
    priceMax: string;
    bedrooms: string;
    bathrooms: string;
    size: string;
    saleType: string;
}

export default function Listings({ params }: { params: { locale: string } }) {
    const { locale } = params;
    const messages = messageMap[locale];

    if (!messages) {
        notFound();
    }

    const [properties, setProperties] = useState<Property[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>(
        [],
    );
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState<
        "date-new" | "price-asc" | "price-desc" | "size-desc"
    >("date-new");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/properties');
                if (response.ok) {
                    const data: Property[] = await response.json();
                    setProperties(data);
                    setFilteredProperties(data);
                } else {
                    setError(
                        `Failed to fetch properties: ${response.status} ${response.statusText}`,
                    );
                }
            } catch (error) {
                setError(
                    "Network error: Unable to connect to the server. Please check your connection and try again.",
                );
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const t = (key: string) => {
        const parts = key.split(".");
        let val = messages;
        for (const part of parts) {
            if (val && typeof val === "object" && part in val) {
                val = val[part];
            } else {
                return key;
            }
        }
        return val;
    };

    const translations = {
        en: {
            listings: "Property Listings",
            propertiesFound: "properties found",
            noProperties: "No properties found",
            noPropertiesDesc:
                "Try adjusting your search criteria to find more properties.",
            sortBy: "Sort by",
            viewMode: "View Mode",
            gridView: "Grid View",
            listView: "List View",
            mapView: "Map View",
            newest: "Newest First",
            priceLowHigh: "Price: Low to High",
            priceHighLow: "Price: High to Low",
            largest: "Largest First",
            loadMore: "Load More Properties",
            page: "Page",
            of: "of",
            showingResults: "Showing",
            to: "to",
            results: "results",
            featuredProperties: "Featured Properties",
            newListings: "New Listings",
            popularLocations: "Popular Locations",
            propertyTypes: "Property Types",
            forSale: "For Sale",
            forRent: "For Rent",
            condo: "Condominiums",
            house: "Houses",
            villa: "Villas",
            townhouse: "Townhouses",
            viewAll: "View All",
        },
        th: {
            listings: "รายการอสังหาริมทรัพย์",
            propertiesFound: "รายการที่พบ",
            noProperties: "ไม่พบรายการอสังหาริมทรัพย์",
            noPropertiesDesc:
                "ลองปรับเกณฑ์การค้นหาเพื่อหารายการอสังหาริมทรัพย์เพิ่มเติม",
            sortBy: "เรียงตาม",
            viewMode: "รูปแบบการแสดง",
            gridView: "แสดงเป็นตาราง",
            listView: "แสดงเป็นรายการ",
            mapView: "แสดงบนแผนที่",
            newest: "ใหม่ล่าสุด",
            priceLowHigh: "ราคา: ต่ำไปสูง",
            priceHighLow: "ราคา: สูงไปต่ำ",
            largest: "ขนาดใหญ่สุด",
            loadMore: "โหลดรายการเพิ่มเติม",
            page: "หน้า",
            of: "จาก",
            showingResults: "แสดง",
            to: "ถึง",
            results: "รายการ",
            featuredProperties: "อสังหาริมทรัพย์แนะนำ",
            newListings: "รายการใหม่",
            popularLocations: "ทำเลยอดนิยม",
            propertyTypes: "ประเภทอสังหาฯ",
            forSale: "ขาย",
            forRent: "เช่า",
            condo: "คอนโดมิเนียม",
            house: "บ้าน",
            villa: "วิลล่า",
            townhouse: "ทาวน์เฮ้าส์",
            viewAll: "ดูทั้งหมด",
        },
    };

    const tLocal = (key: string) => {
        return (translations[locale as "en" | "th"] as any)?.[key] || key;
    };

    const handleSearch = (filters: PropertyFilters) => {
        setLoading(true);
        setError(null);
        try {
            const filtered = filterProperties(properties, filters);
            const sorted = sortProperties(filtered, sortBy);
            setFilteredProperties(sorted);
            setCurrentPage(1);
        } catch (error) {
            setError("Error processing search filters. Please try again.");
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSortChange = (newSortBy: string) => {
        try {
            setSortBy(newSortBy as any);
            const sorted = sortProperties(filteredProperties, newSortBy as any);
            setFilteredProperties(sorted);
        } catch (error) {
            setError("Error sorting properties. Please try again.");
            console.error("Sort error:", error);
        }
    };

    const handleContact = (propertyId: string) => {
        // Handle contact logic
        console.log("Contact for property:", propertyId);
    };

    const handleFavorite = (propertyId: string) => {
        // Handle favorite logic
        console.log("Add to favorites:", propertyId);
    };

    const handleShare = (propertyId: string) => {
        // Handle share logic
        console.log("Share property:", propertyId);
    };

    // Pagination
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProperties = filteredProperties.slice(startIndex, endIndex);

    const retryFetch = () => {
        setError(null);
        window.location.reload();
    };

    // Quick stats
    const forSaleCount = properties.filter(
        (p) => p.price_type === "sale",
    ).length;
    const forRentCount = properties.filter(
        (p) => p.price_type === "rent",
    ).length;
    const condoCount = properties.filter(
        (p) => p.property_type === "condo",
    ).length;
    const houseCount = properties.filter(
        (p) => p.property_type === "house",
    ).length;

    return (
        <main className="min-h-screen bg-white">
            <div className="container-minimal py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        {tLocal("listings")}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {locale === "en"
                            ? "Find your perfect property from our curated collection"
                            : "ค้นหาอสังหาริมทรัพย์ที่สมบูรณ์แบบจากคอลเลกชันคัดสรรของเรา"}
                    </p>
                </div>

                {/* Error Display */}
                {error && (
                    <Card className="mb-8 border-red-200 bg-red-50">
                        <CardContent className="pt-6">
                            <div className="flex items-center">
                                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                                <p className="text-red-800">{error}</p>
                                <Button
                                    onClick={retryFetch}
                                    variant="outline"
                                    size="sm"
                                    className="ml-auto border-red-300 text-red-700 hover:bg-red-100"
                                >
                                    Retry
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Quick Stats */}
                {!error && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        <Card className="text-center border border-gray-200 hover:border-gray-900 transition-colors bg-white">
                            <CardHeader className="pb-2">
                                <Building2 className="w-8 h-8 text-gray-900 mx-auto mb-2" />
                                <CardTitle className="text-sm font-medium">
                                    {tLocal("forSale")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900">
                                    {forSaleCount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="text-center border border-gray-200 hover:border-gray-900 transition-colors bg-white">
                            <CardHeader className="pb-2">
                                <Home className="w-8 h-8 text-gray-900 mx-auto mb-2" />
                                <CardTitle className="text-sm font-medium">
                                    {tLocal("forRent")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900">
                                    {forRentCount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="text-center border border-gray-200 hover:border-gray-900 transition-colors bg-white">
                            <CardHeader className="pb-2">
                                <Building2 className="w-8 h-8 text-gray-900 mx-auto mb-2" />
                                <CardTitle className="text-sm font-medium">
                                    {tLocal("condo")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900">
                                    {condoCount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="text-center border border-gray-200 hover:border-gray-900 transition-colors bg-white">
                            <CardHeader className="pb-2">
                                <Home className="w-8 h-8 text-gray-900 mx-auto mb-2" />
                                <CardTitle className="text-sm font-medium">
                                    {tLocal("house")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900">
                                    {houseCount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Search Component */}
                <div className="mb-12">
                    <PropertySearch locale={locale} onSearch={handleSearch} />
                </div>

                {/* Results Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-semibold">
                            {filteredProperties.length
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                            {tLocal("propertiesFound")}
                        </h2>
                        {filteredProperties.length > 0 && (
                            <Badge variant="secondary" className="text-sm">
                                {tLocal("showingResults")} {startIndex + 1}{" "}
                                {tLocal("to")}{" "}
                                {Math.min(endIndex, filteredProperties.length)}{" "}
                                {tLocal("of")}{" "}
                                {filteredProperties.length
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Sort Selector */}
                        <div className="flex items-center gap-2">
                            <ArrowUpDown className="w-4 h-4 text-gray-600" />
                            <Select
                                value={sortBy}
                                onValueChange={handleSortChange}
                            >
                                <SelectTrigger className="w-48 border-gray-300 focus:border-gray-900">
                                    <SelectValue
                                        placeholder={tLocal("sortBy")}
                                    />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-200">
                                    <SelectItem value="date-new">
                                        {tLocal("newest")}
                                    </SelectItem>
                                    <SelectItem value="price-asc">
                                        {tLocal("priceLowHigh")}
                                    </SelectItem>
                                    <SelectItem value="price-desc">
                                        {tLocal("priceHighLow")}
                                    </SelectItem>
                                    <SelectItem value="size-desc">
                                        {tLocal("largest")}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <Button
                                variant={
                                    viewMode === "grid" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setViewMode("grid")}
                                className={`rounded-r-none ${
                                    viewMode === "grid"
                                        ? "bg-gray-900 text-white hover:bg-gray-800"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                }`}
                            >
                                <Grid className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={
                                    viewMode === "list" ? "default" : "ghost"
                                }
                                size="sm"
                                onClick={() => setViewMode("list")}
                                className={`rounded-none ${
                                    viewMode === "list"
                                        ? "bg-gray-900 text-white hover:bg-gray-800"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                }`}
                            >
                                <List className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-l-none text-gray-400"
                                disabled
                            >
                                <Map className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Properties Grid/List */}
                {loading ? (
                    <div className="space-y-6">
                        {/* Skeleton Loaders */}
                        {[...Array(6)].map((_, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden border border-gray-200"
                            >
                                <div className="aspect-video bg-gray-200 animate-pulse" />
                                <CardContent className="p-6">
                                    <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse" />
                                    <div className="h-4 bg-gray-200 rounded mb-4 animate-pulse w-3/4" />
                                    <div className="flex gap-4 mb-4">
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : error ? null : filteredProperties.length === 0 ? (
                    <Card className="text-center py-16 border border-gray-200 bg-white">
                        <CardContent>
                            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {tLocal("noProperties")}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {tLocal("noPropertiesDesc")}
                            </p>
                            <Button
                                onClick={() =>
                                    handleSearch({
                                        keyword: "",
                                        location: "",
                                        type: "",
                                        priceMin: "",
                                        priceMax: "",
                                        bedrooms: "",
                                        bathrooms: "",
                                        size: "",
                                        saleType: "sale",
                                    })
                                }
                                className="bg-gray-900 text-white hover:bg-gray-800"
                            >
                                {locale === "en"
                                    ? "Clear Filters"
                                    : "ล้างตัวกรอง"}
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <div
                            className={
                                viewMode === "grid"
                                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
                                    : "space-y-6 mb-8"
                            }
                        >
                            {currentProperties.map((property) => (
                                <PropertyCard
                                    key={property.id}
                                    property={property}
                                    locale={locale}
                                    onContact={handleContact}
                                    onFavorite={handleFavorite}
                                    onShare={handleShare}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setCurrentPage(
                                                Math.max(1, currentPage - 1),
                                            )
                                        }
                                        disabled={currentPage === 1}
                                        className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-900 disabled:text-gray-400 disabled:border-gray-200"
                                    >
                                        {locale === "en"
                                            ? "Previous"
                                            : "ก่อนหน้า"}
                                    </Button>

                                    <div className="flex items-center gap-2">
                                        {[...Array(totalPages)].map(
                                            (_, index) => {
                                                const page = index + 1;
                                                if (
                                                    page === 1 ||
                                                    page === totalPages ||
                                                    (page >= currentPage - 1 &&
                                                        page <= currentPage + 1)
                                                ) {
                                                    return (
                                                        <Button
                                                            key={page}
                                                            variant={
                                                                currentPage ===
                                                                page
                                                                    ? "default"
                                                                    : "outline"
                                                            }
                                                            size="sm"
                                                            onClick={() =>
                                                                setCurrentPage(
                                                                    page,
                                                                )
                                                            }
                                                            className={
                                                                currentPage ===
                                                                page
                                                                    ? "bg-gray-900 text-white hover:bg-gray-800"
                                                                    : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-900"
                                                            }
                                                        >
                                                            {page}
                                                        </Button>
                                                    );
                                                } else if (
                                                    page === currentPage - 2 ||
                                                    page === currentPage + 2
                                                ) {
                                                    return (
                                                        <span
                                                            key={page}
                                                            className="px-2"
                                                        >
                                                            ...
                                                        </span>
                                                    );
                                                }
                                                return null;
                                            },
                                        )}
                                    </div>

                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setCurrentPage(
                                                Math.min(
                                                    totalPages,
                                                    currentPage + 1,
                                                ),
                                            )
                                        }
                                        disabled={currentPage === totalPages}
                                        className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-900 disabled:text-gray-400 disabled:border-gray-200"
                                    >
                                        {locale === "en" ? "Next" : "ถัดไป"}
                                    </Button>
                                </div>

                                <div className="text-sm text-gray-600 font-medium">
                                    {tLocal("page")} {currentPage}{" "}
                                    {tLocal("of")} {totalPages}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Popular Locations */}
                {filteredProperties.length > 0 && (
                    <Card className="mt-16 border border-gray-200 bg-white">
                        <CardHeader>
                            <CardTitle className="flex items-center text-gray-900">
                                <MapPin className="w-5 h-5 mr-2" />
                                {tLocal("popularLocations")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {[
                                    "Bangkok",
                                    "Phuket",
                                    "Pattaya",
                                    "Chiang Mai",
                                    "Hua Hin",
                                    "Koh Samui",
                                ].map((location) => (
                                    <Button
                                        key={location}
                                        variant="outline"
                                        className="justify-start border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-900"
                                        onClick={() =>
                                            handleSearch({
                                                keyword: "",
                                                location:
                                                    location.toLowerCase(),
                                                type: "",
                                                priceMin: "",
                                                priceMax: "",
                                                bedrooms: "",
                                                bathrooms: "",
                                                size: "",
                                                saleType: "sale",
                                            })
                                        }
                                    >
                                        <MapPin className="w-4 h-4 mr-2" />
                                        {location}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </main>
    );
}
