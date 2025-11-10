"use client";

import React from "react";
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
import Link from "next/link";
import {
    Building,
    MapPin,
    Phone,
    Mail,
    ArrowRight,
    Star,
    Search,
    Users,
    Award,
    Clock,
    CheckCircle,
    Eye,
    Heart,
    Share2,
    Shield,
    TrendingUp,
} from "lucide-react";
import { getFeaturedProperties } from "@/lib/sampleData";
import enMessages from "../../messages/en.json";
import thMessages from "../../messages/th.json";

const messageMap: Record<string, any> = {
    en: enMessages,
    th: thMessages,
};

export default function Home({ params }: { params: { locale: string } }) {
    const { locale } = params;

    const messages = messageMap[locale];
    if (!messages) {
        notFound();
    }

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

    const featuredProperties = getFeaturedProperties(3);

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section - Minimal Black & White */}
            <section className="relative bg-white border-b border-gray-100">
                <div className="container-minimal py-24 lg:py-32">
                    <div className="text-center max-w-4xl mx-auto">
                        <Badge
                            variant="outline"
                            className="mb-8 px-4 py-2 text-sm font-medium border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
                        >
                            <Star className="w-4 h-4 mr-2" />
                            {locale === "en"
                                ? "Thailand's Premium Property Platform"
                                : "แพลตฟอร์มอสังหาฯ พรีเมียมของไทย"}
                        </Badge>

                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
                            {t("home.title")}
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                            {t("home.description")}
                        </p>

                        {/* CTA Buttons - Minimal Style */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <Button
                                asChild
                                size="lg"
                                className="h-14 px-8 text-lg bg-gray-900 text-white hover:bg-gray-800 rounded-lg font-medium"
                            >
                                <Link href={`/${locale}/listings`}>
                                    <Search className="mr-2 h-5 w-5" />
                                    {locale === "en"
                                        ? "Explore Properties"
                                        : "ดูอสังหาริมทรัพย์"}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="h-14 px-8 text-lg border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-lg font-medium"
                            >
                                <Link href={`/${locale}/contact`}>
                                    <Phone className="mr-2 h-5 w-5" />
                                    {locale === "en"
                                        ? "Get Expert Help"
                                        : "ปรึกษาผู้เชี่ยวชาญ"}
                                </Link>
                            </Button>
                        </div>

                        {/* Search Bar - Minimal */}
                        <Card className="max-w-2xl mx-auto border border-gray-200 shadow-sm">
                            <CardContent className="p-2">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder={
                                            locale === "en"
                                                ? "Search location, property, or project..."
                                                : "ค้นหาทำเล อสังหาฯ หรือโครงการ..."
                                        }
                                        className="flex-1 px-4 py-3 border-none bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none text-base"
                                    />
                                    <Button className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 rounded-md">
                                        <Search className="w-5 h-5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Stats Section - Clean & Minimal */}
            <section className="py-20 bg-gray-50 border-b border-gray-100">
                <div className="container-minimal">
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                number: "500+",
                                label:
                                    locale === "en"
                                        ? "Properties"
                                        : "อสังหาริมทรัพย์",
                            },
                            {
                                number: "1,000+",
                                label:
                                    locale === "en"
                                        ? "Happy Clients"
                                        : "ลูกค้าพึงพอใจ",
                            },
                            {
                                number: "15+",
                                label:
                                    locale === "en"
                                        ? "Years Experience"
                                        : "ปีประสบการณ์",
                            },
                            {
                                number: "24/7",
                                label: locale === "en" ? "Support" : "บริการ",
                            },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl font-bold text-gray-900 mb-2">
                                    {stat.number}
                                </div>
                                <p className="text-gray-600 font-medium">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Properties - Minimal Cards */}
            <section className="py-24 bg-white">
                <div className="container-minimal">
                    <div className="text-center mb-16">
                        <Badge
                            variant="outline"
                            className="mb-6 border-gray-900 text-gray-900"
                        >
                            <Star className="w-4 h-4 mr-2" />
                            {locale === "en"
                                ? "Featured Properties"
                                : "อสังหาฯ แนะนำ"}
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                            {locale === "en"
                                ? "Exceptional Properties"
                                : "อสังหาฯ ที่พิเศษ"}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {locale === "en"
                                ? "Discover our curated selection of premium properties in prime locations"
                                : "ค้นพบคอลเลกชันอสังหาฯ พรีเมียมในทำเลยอดนิยม"}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {featuredProperties.map((property) => (
                            <Card
                                key={property.id}
                                className="group overflow-hidden border border-gray-200 hover:border-gray-900 transition-all duration-300 bg-white"
                            >
                                <div className="relative">
                                    <img
                                        src={property.images[0]}
                                        alt={property.title}
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <Badge className="bg-white text-gray-900 hover:bg-gray-100">
                                            {property.price_type === "sale"
                                                ? locale === "en"
                                                    ? "For Sale"
                                                    : "ขาย"
                                                : locale === "en"
                                                  ? "For Rent"
                                                  : "เช่า"}
                                        </Badge>
                                        {property.isFeatured && (
                                            <Badge className="bg-gray-900 text-white">
                                                <Star className="w-3 h-3 mr-1 fill-current" />
                                                {locale === "en"
                                                    ? "Featured"
                                                    : "แนะนำ"}
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="h-8 w-8 p-0 bg-white hover:bg-gray-100"
                                        >
                                            <Heart className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="h-8 w-8 p-0 bg-white hover:bg-gray-100"
                                        >
                                            <Share2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="absolute bottom-4 right-4">
                                        <div className="bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold">
                                            ฿
                                            {property.price
                                                .toString()
                                                .replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    ",",
                                                )}
                                            {property.price_type === "rent" &&
                                                (locale === "en"
                                                    ? "/mo"
                                                    : "/ด.")}
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                                        {property.title}
                                    </h3>
                                    <div className="flex items-center text-gray-600 mb-4">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        <span className="text-sm">
                                            {property.location}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                                        <span>
                                            {property.bedrooms}{" "}
                                            {locale === "en"
                                                ? "beds"
                                                : "ห้องนอน"}
                                        </span>
                                        <span>
                                            {property.bathrooms}{" "}
                                            {locale === "en"
                                                ? "baths"
                                                : "ห้องน้ำ"}
                                        </span>
                                        <span>
                                            {property.size}{" "}
                                            {locale === "en" ? "sqm" : "ตร.ม."}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                                        >
                                            <Link
                                                href={`/${locale}/listings/${property.id}`}
                                            >
                                                <Eye className="w-4 h-4 mr-1" />
                                                {locale === "en"
                                                    ? "View"
                                                    : "ดู"}
                                            </Link>
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="flex-1 bg-gray-900 text-white hover:bg-gray-800"
                                        >
                                            <Phone className="w-4 h-4 mr-1" />
                                            {locale === "en"
                                                ? "Contact"
                                                : "ติดต่อ"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center">
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="h-12 px-8 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                        >
                            <Link href={`/${locale}/listings`}>
                                {locale === "en"
                                    ? "View All Properties"
                                    : "ดูทั้งหมด"}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Why Choose Us - Minimal Grid */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="container-minimal">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            {locale === "en"
                                ? "Why Choose Us"
                                : "ทำไมต้องเลือกเรา"}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {locale === "en"
                                ? "Professional service with expertise and dedication"
                                : "บริการมืออาชีพด้วยความเชี่ยวชาญและทุ่มเท"}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Shield,
                                title:
                                    locale === "en"
                                        ? "Trusted & Verified"
                                        : "เชื่อถือได้",
                                description:
                                    locale === "en"
                                        ? "All properties verified with legal documentation"
                                        : "อสังหาฯ ผ่านการตรวจสอบและเอกสารถูกต้อง",
                            },
                            {
                                icon: Users,
                                title:
                                    locale === "en"
                                        ? "Expert Team"
                                        : "ทีมผู้เชี่ยวชาญ",
                                description:
                                    locale === "en"
                                        ? "Professional agents with market expertise"
                                        : "ตัวแทนมืออาชีพที่เชี่ยวชาญตลาด",
                            },
                            {
                                icon: Clock,
                                title:
                                    locale === "en"
                                        ? "24/7 Support"
                                        : "บริการ 24/7",
                                description:
                                    locale === "en"
                                        ? "Round-the-clock customer service"
                                        : "บริการลูกค้าตลอด 24 ชั่วโมง",
                            },
                            {
                                icon: Award,
                                title:
                                    locale === "en"
                                        ? "Best Value"
                                        : "คุ้มค่าที่สุด",
                                description:
                                    locale === "en"
                                        ? "Competitive prices and exclusive deals"
                                        : "ราคาแข่งขันและดีลพิเศษ",
                            },
                        ].map((feature, index) => (
                            <Card
                                key={index}
                                className="text-center p-8 border border-gray-200 hover:border-gray-900 transition-colors bg-white"
                            >
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <feature.icon className="h-8 w-8 text-gray-900" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Property Types - Minimal List */}
            <section className="py-24 bg-white">
                <div className="container-minimal">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            {locale === "en"
                                ? "Property Types"
                                : "ประเภทอสังหาฯ"}
                        </h2>
                        <p className="text-xl text-gray-600">
                            {locale === "en"
                                ? "Find the perfect property type for your needs"
                                : "ค้นหาประเภทอสังหาฯ ที่เหมาะกับคุณ"}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                type: "condo",
                                count: 120,
                                name:
                                    locale === "en"
                                        ? "Condominiums"
                                        : "คอนโดมิเนียม",
                            },
                            {
                                type: "house",
                                count: 85,
                                name: locale === "en" ? "Houses" : "บ้าน",
                            },
                            {
                                type: "villa",
                                count: 45,
                                name: locale === "en" ? "Villas" : "วิลล่า",
                            },
                            {
                                type: "townhouse",
                                count: 35,
                                name:
                                    locale === "en"
                                        ? "Townhouses"
                                        : "ทาวน์เฮ้าส์",
                            },
                            {
                                type: "apartment",
                                count: 25,
                                name:
                                    locale === "en"
                                        ? "Apartments"
                                        : "อพาร์ทเม้นท์",
                            },
                            {
                                type: "commercial",
                                count: 15,
                                name:
                                    locale === "en" ? "Commercial" : "พาณิชย์",
                            },
                        ].map((item) => (
                            <Link
                                key={item.type}
                                href={`/${locale}/listings?type=${item.type}`}
                                className="block group"
                            >
                                <Card className="p-8 border border-gray-200 hover:border-gray-900 transition-all duration-200 bg-white">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-gray-100 group-hover:bg-gray-900 rounded-lg flex items-center justify-center transition-colors">
                                                <Building className="h-6 w-6 text-gray-900 group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-900">
                                                    {item.name}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {item.count}{" "}
                                                    {locale === "en"
                                                        ? "properties"
                                                        : "รายการ"}
                                                </p>
                                            </div>
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Minimal & Bold */}
            <section className="py-24 bg-gray-900 text-white">
                <div className="container-minimal text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">
                        {locale === "en"
                            ? "Ready to Find Your Perfect Property?"
                            : "พร้อมหาอสังหาฯ ที่สมบูรณ์แบบหรือยัง?"}
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        {locale === "en"
                            ? "Start your journey today with Thailand's most trusted property platform"
                            : "เริ่มต้นการเดินทางวันนี้กับแพลตฟอร์มอสังหาฯ ที่น่าเชื่อถือที่สุดในไทย"}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Button
                            asChild
                            size="lg"
                            variant="secondary"
                            className="h-14 px-8 text-lg bg-white text-gray-900 hover:bg-gray-100"
                        >
                            <Link href={`/${locale}/listings`}>
                                <Search className="mr-2 h-5 w-5" />
                                {locale === "en"
                                    ? "Start Searching"
                                    : "เริ่มค้นหา"}
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="h-14 px-8 text-lg border-white text-white hover:bg-white hover:text-gray-900"
                        >
                            <Link href={`/${locale}/contact`}>
                                <Mail className="mr-2 h-5 w-5" />
                                {locale === "en"
                                    ? "Contact Expert"
                                    : "ติดต่อผู้เชี่ยวชาญ"}
                            </Link>
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {[
                            {
                                icon: CheckCircle,
                                text:
                                    locale === "en"
                                        ? "Free Consultation"
                                        : "ปรึกษาฟรี",
                            },
                            {
                                icon: CheckCircle,
                                text:
                                    locale === "en"
                                        ? "No Hidden Fees"
                                        : "ไม่มีค่าแอบแฝง",
                            },
                            {
                                icon: CheckCircle,
                                text:
                                    locale === "en"
                                        ? "Expert Support"
                                        : "ผู้เชี่ยวชาญช่วย",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center space-x-3"
                            >
                                <item.icon className="h-5 w-5 text-green-400" />
                                <span className="text-gray-300">
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
