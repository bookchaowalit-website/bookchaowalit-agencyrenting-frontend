"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Bed,
    Bath,
    Square,
    MapPin,
    Heart,
    Share2,
    Phone,
    Eye,
    Car,
    Calendar,
    Star,
} from "lucide-react";

interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    price_type: string;
    location: string;
    property_type: string;
    bedrooms: number;
    bathrooms: number;
    size: number;
    images: string[];
    created_at: string;
    updated_at: string;
    features?: string[];
    agent?: {
        name: string;
        phone: string;
        image?: string;
    };
    isNew?: boolean;
    isFeatured?: boolean;
    views?: number;
    listedDate?: string;
    parking?: number;
    floor?: number;
    rating?: number;
}

interface PropertyCardProps {
    property: Property;
    locale: string;
    onContact?: (propertyId: string) => void;
    onFavorite?: (propertyId: string) => void;
    onShare?: (propertyId: string) => void;
}

export default function PropertyCard({
    property,
    locale,
    onContact,
    onFavorite,
    onShare,
}: PropertyCardProps) {
    const t = (key: string) => {
        const translations: Record<string, Record<string, string>> = {
            en: {
                bedrooms: "Bedrooms",
                bathrooms: "Bathrooms",
                sqm: "sqm",
                contact: "Contact",
                viewDetails: "View Details",
                favorite: "Add to Favorites",
                share: "Share",
                new: "New",
                featured: "Featured",
                views: "views",
                parking: "Parking",
                floor: "Floor",
                listedOn: "Listed on",
                thb: "THB",
                perMonth: "/month",
                forSale: "For Sale",
                forRent: "For Rent",
                condo: "Condominium",
                house: "House",
                townhouse: "Townhouse",
                villa: "Villa",
                apartment: "Apartment",
                land: "Land",
                commercial: "Commercial",
            },
            th: {
                bedrooms: "ห้องนอน",
                bathrooms: "ห้องน้ำ",
                sqm: "ตร.ม.",
                contact: "ติดต่อ",
                viewDetails: "ดูรายละเอียด",
                favorite: "เพิ่มในรายการโปรด",
                share: "แชร์",
                new: "ใหม่",
                featured: "แนะนำ",
                views: "ครั้งที่ดู",
                parking: "ที่จอดรถ",
                floor: "ชั้น",
                listedOn: "ลงประกาศ",
                thb: "บาท",
                perMonth: "/เดือน",
                forSale: "ขาย",
                forRent: "เช่า",
                condo: "คอนโดมิเนียม",
                house: "บ้าน",
                townhouse: "ทาวน์เฮ้าส์",
                villa: "วิลล่า",
                apartment: "อพาร์ทเมนต์",
                land: "ที่ดิน",
                commercial: "พาณิชย์",
            },
        };
        return translations[locale]?.[key] || key;
    };

    const formatPrice = (price: number, type: string) => {
        // Simple number formatting with commas
        const formatted = price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const suffix = type === "rent" ? t("perMonth") : "";
        return `${formatted} ${t("thb")}${suffix}`;
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;

        // Simple date formatting: DD/MM/YYYY
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatNumber = (num: number) => {
        // Simple number formatting with commas
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleContact = () => {
        if (onContact) {
            onContact(property.id);
        }
    };

    const handleFavorite = () => {
        if (onFavorite) {
            onFavorite(property.id);
        }
    };

    const handleShare = () => {
        if (onShare) {
            onShare(property.id);
        }
    };

    return (
        <Card className="group overflow-hidden border border-gray-200 hover:border-gray-900 transition-all duration-300 bg-white">
            {/* Image Section */}
            <div className="relative overflow-hidden">
                <div className="aspect-video relative">
                    <img
                        src={property.images[0] || "/api/placeholder/400/250"}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {property.isNew && (
                        <Badge className="text-xs font-semibold bg-white text-gray-900 hover:bg-gray-100">
                            {t("new")}
                        </Badge>
                    )}
                    {property.isFeatured && (
                        <Badge className="text-xs font-semibold bg-gray-900 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            {t("featured")}
                        </Badge>
                    )}
                    <Badge className="text-xs font-semibold bg-gray-100 text-gray-900">
                        {t(
                            property.price_type === "sale"
                                ? "forSale"
                                : "forRent",
                        )}
                    </Badge>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0 rounded-full bg-white hover:bg-gray-100 border border-gray-200"
                        onClick={handleFavorite}
                    >
                        <Heart className="w-4 h-4" />
                    </Button>
                    <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0 rounded-full bg-white hover:bg-gray-100 border border-gray-200"
                        onClick={handleShare}
                    >
                        <Share2 className="w-4 h-4" />
                    </Button>
                </div>

                {/* Views Counter */}
                {property.views && property.views > 0 && (
                    <div className="absolute bottom-4 left-4 flex items-center text-white text-xs bg-black/50 px-2 py-1 rounded">
                        <Eye className="w-3 h-3 mr-1" />
                        {formatNumber(property.views)} {t("views")}
                    </div>
                )}

                {/* Price Overlay */}
                <div className="absolute bottom-4 right-4">
                    <div className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-lg">
                        {formatPrice(property.price, property.price_type)}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <CardContent className="p-6">
                {/* Property Type & Rating */}
                <div className="flex justify-between items-start mb-3">
                    <Badge
                        variant="outline"
                        className="text-xs border-gray-300 text-gray-600"
                    >
                        {t(property.property_type)}
                    </Badge>
                    {property.rating && (
                        <div className="flex items-center text-sm text-gray-900">
                            <Star className="w-4 h-4 fill-current mr-1" />
                            {property.rating.toFixed(1)}
                        </div>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {property.title}
                </h3>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm truncate">
                        {property.location}
                    </span>
                </div>

                {/* Property Details */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                    {property.bedrooms > 0 && (
                        <div className="flex items-center">
                            <Bed className="w-4 h-4 mr-1" />
                            <span>
                                {property.bedrooms} {t("bedrooms")}
                            </span>
                        </div>
                    )}
                    {property.bathrooms > 0 && (
                        <div className="flex items-center">
                            <Bath className="w-4 h-4 mr-1" />
                            <span>
                                {property.bathrooms} {t("bathrooms")}
                            </span>
                        </div>
                    )}
                    {property.size > 0 && (
                        <div className="flex items-center">
                            <Square className="w-4 h-4 mr-1" />
                            <span>
                                {formatNumber(property.size)} {t("sqm")}
                            </span>
                        </div>
                    )}
                    {property.parking && property.parking > 0 && (
                        <div className="flex items-center">
                            <Car className="w-4 h-4 mr-1" />
                            <span>{property.parking}</span>
                        </div>
                    )}
                </div>

                {/* Additional Info */}
                <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                    {property.floor && (
                        <span>
                            {t("floor")} {property.floor}
                        </span>
                    )}
                    {property.created_at && (
                        <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {t("listedOn")} {formatDate(property.created_at)}
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {property.description}
                </p>

                {/* Features */}
                {property.features && property.features.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                        {property.features.slice(0, 3).map((feature, index) => (
                            <Badge
                                key={index}
                                className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
                            >
                                {feature}
                            </Badge>
                        ))}
                        {property.features.length > 3 && (
                            <Badge className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200">
                                +{property.features.length - 3}
                            </Badge>
                        )}
                    </div>
                )}

                {/* Agent Info */}
                {property.agent && (
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                            {property.agent.image ? (
                                <img
                                    src={property.agent.image}
                                    alt={property.agent.name}
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                            ) : (
                                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                                    <span className="text-xs font-medium text-gray-900">
                                        {property.agent.name.charAt(0)}
                                    </span>
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-medium">
                                    {property.agent.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {property.agent.phone}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>

            {/* Footer Actions */}
            <CardFooter className="p-6 pt-0 gap-3">
                <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-900"
                >
                    <Link href={`/${locale}/listings/${property.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        {t("viewDetails")}
                    </Link>
                </Button>
                <Button
                    onClick={handleContact}
                    className="flex-1 bg-gray-900 text-white hover:bg-gray-800"
                >
                    <Phone className="w-4 h-4 mr-2" />
                    {t("contact")}
                </Button>
            </CardFooter>
        </Card>
    );
}
