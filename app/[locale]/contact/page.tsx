"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    MessageSquare,
    User,
    Building,
    Star,
    CheckCircle,
    Globe,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
} from "lucide-react";
import enMessages from "../../../messages/en.json";
import thMessages from "../../../messages/th.json";

const messageMap: Record<string, any> = {
    en: enMessages,
    th: thMessages,
};

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    propertyType: string;
    budget: string;
    message: string;
}

export default function Contact({ params }: { params: { locale: string } }) {
    const { locale } = params;
    const messages = messageMap[locale];

    if (!messages) {
        notFound();
    }

    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        phone: "",
        subject: "",
        propertyType: "any",
        budget: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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
            title: "Contact Us",
            subtitle: "Get in touch with our real estate experts",
            getInTouch: "Get in Touch",
            getInTouchDesc:
                "Ready to find your dream property? Contact us today and let our experts help you.",
            contactForm: "Contact Form",
            name: "Full Name",
            email: "Email Address",
            phone: "Phone Number",
            subject: "Subject",
            propertyType: "Property Type",
            budget: "Budget Range",
            message: "Message",
            namePlaceholder: "Enter your full name",
            emailPlaceholder: "Enter your email address",
            phonePlaceholder: "Enter your phone number",
            subjectPlaceholder: "How can we help you?",
            messagePlaceholder: "Tell us about your requirements...",
            budgetPlaceholder: "Your budget range",
            sendMessage: "Send Message",
            sending: "Sending...",
            messageSent: "Message Sent!",
            thankYou:
                "Thank you for contacting us. We'll get back to you within 24 hours.",
            officeLocations: "Office Locations",
            businessHours: "Business Hours",
            followUs: "Follow Us",
            ourAgents: "Meet Our Agents",
            agentsDesc:
                "Our experienced team is here to help you find the perfect property",
            generalInquiry: "General Inquiry",
            buyProperty: "Buy Property",
            rentProperty: "Rent Property",
            sellProperty: "Sell Property",
            propertyValuation: "Property Valuation",
            investment: "Investment Consultation",
            any: "Any",
            condo: "Condominium",
            house: "House",
            villa: "Villa",
            townhouse: "Townhouse",
            commercial: "Commercial",
            mondayFriday: "Monday - Friday",
            saturday: "Saturday",
            sunday: "Sunday",
            closed: "Closed",
            yearsExp: "years experience",
            propertiesSold: "properties sold",
            happyClients: "happy clients",
        },
        th: {
            title: "ติดต่อเรา",
            subtitle: "ติดต่อผู้เชี่ยวชาญด้านอสังหาริมทรัพย์ของเรา",
            getInTouch: "ติดต่อเรา",
            getInTouchDesc:
                "พร้อมที่จะหาอสังหาฯ ในฝันแล้วหรือยัง? ติดต่อเราวันนี้และให้ผู้เชี่ยวชาญช่วยเหลือคุณ",
            contactForm: "แบบฟอร์มติดต่อ",
            name: "ชื่อ-นามสกุล",
            email: "อีเมล",
            phone: "เบอร์โทรศัพท์",
            subject: "หัวข้อ",
            propertyType: "ประเภทอสังหาฯ",
            budget: "งบประมาณ",
            message: "ข้อความ",
            namePlaceholder: "กรอกชื่อ-นามสกุล",
            emailPlaceholder: "กรอกอีเมล",
            phonePlaceholder: "กรอกเบอร์โทรศัพท์",
            subjectPlaceholder: "เราสามารถช่วยคุณได้อย่างไร?",
            messagePlaceholder: "บอกเราเกี่ยวกับความต้องการของคุณ...",
            budgetPlaceholder: "ช่วงงบประมาณของคุณ",
            sendMessage: "ส่งข้อความ",
            sending: "กำลังส่ง...",
            messageSent: "ส่งข้อความแล้ว!",
            thankYou: "ขอบคุณที่ติดต่อเรา เราจะติดต่อกลับภายใน 24 ชั่วโมง",
            officeLocations: "สำนักงาน",
            businessHours: "เวลาทำการ",
            followUs: "ติดตามเรา",
            ourAgents: "พบกับทีมของเรา",
            agentsDesc:
                "ทีมผู้เชี่ยวชาญของเราพร้อมช่วยคุณหาอสังหาฯ ที่สมบูรณ์แบบ",
            generalInquiry: "สอบถามทั่วไป",
            buyProperty: "ซื้ออสังหาฯ",
            rentProperty: "เช่าอสังหาฯ",
            sellProperty: "ขายอสังหาฯ",
            propertyValuation: "ประเมินราคา",
            investment: "ปรึกษาการลงทุน",
            any: "ไม่จำกัด",
            condo: "คอนโดมิเนียม",
            house: "บ้าน",
            villa: "วิลล่า",
            townhouse: "ทาวน์เฮ้าส์",
            commercial: "พาณิชย์",
            mondayFriday: "จันทร์ - ศุกร์",
            saturday: "เสาร์",
            sunday: "อาทิตย์",
            closed: "ปิด",
            yearsExp: "ปีประสบการณ์",
            propertiesSold: "ทรัพย์สินขายได้",
            happyClients: "ลูกค้าพอใจ",
        },
    };

    const tLocal = (key: string) => {
        return (translations[locale as "en" | "th"] as any)?.[key] || key;
    };

    const handleInputChange = (key: keyof ContactFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                propertyType: "any",
                budget: "",
                message: "",
            });
        }, 3000);
    };

    const agents = [
        {
            id: 1,
            name: locale === "en" ? "Somchai Prasert" : "สมชาย ประเสริฐ",
            title:
                locale === "en"
                    ? "Senior Property Consultant"
                    : "ที่ปรึกษาอสังหาฯ อาวุโส",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&cs=tinysrgb",
            phone: "+66 89 123 4567",
            email: "somchai@agencyrenting.com",
            specialties:
                locale === "en"
                    ? ["Luxury Condos", "Investment Properties"]
                    : ["คอนโดหรู", "อสังหาฯ เพื่อการลงทุน"],
            experience: 8,
            propertiesSold: 150,
            rating: 4.9,
        },
        {
            id: 2,
            name: locale === "en" ? "Siriporn Thanakit" : "ศิริพร ธนกิจ",
            title:
                locale === "en"
                    ? "Residential Specialist"
                    : "ผู้เชี่ยวชาญที่อยู่อาศัย",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face&cs=tinysrgb",
            phone: "+66 87 234 5678",
            email: "siriporn@agencyrenting.com",
            specialties:
                locale === "en"
                    ? ["Family Homes", "Beachfront Properties"]
                    : ["บ้านครอบครัว", "อสังหาฯ ริมชายหาด"],
            experience: 6,
            propertiesSold: 120,
            rating: 4.8,
        },
        {
            id: 3,
            name: locale === "en" ? "Niran Kulwong" : "นิรันดร์ กุลวงศ์",
            title:
                locale === "en"
                    ? "Commercial Property Expert"
                    : "ผู้เชี่ยวชาญอสังหาฯ พาณิชย์",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face&cs=tinysrgb",
            phone: "+66 88 345 6789",
            email: "niran@agencyrenting.com",
            specialties:
                locale === "en"
                    ? ["Office Buildings", "Retail Spaces"]
                    : ["อาคารสำนักงาน", "พื้นที่ค้าปลีก"],
            experience: 10,
            propertiesSold: 85,
            rating: 4.9,
        },
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gray-900 text-white py-20 border-b border-gray-200">
                <div className="container-minimal text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                        {tLocal("title")}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {tLocal("subtitle")}
                    </p>
                </div>
            </section>

            <div className="container-minimal py-16">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <Card className="shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-2xl flex items-center text-gray-900">
                                    <MessageSquare className="w-6 h-6 mr-2 text-gray-900" />
                                    {tLocal("contactForm")}
                                </CardTitle>
                                <CardDescription className="text-lg text-gray-600">
                                    {tLocal("getInTouchDesc")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isSubmitted ? (
                                    <div className="text-center py-8">
                                        <CheckCircle className="w-16 h-16 text-gray-900 mx-auto mb-4" />
                                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                                            {tLocal("messageSent")}
                                        </h3>
                                        <p className="text-gray-600">
                                            {tLocal("thankYou")}
                                        </p>
                                    </div>
                                ) : (
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                                    {tLocal("name")} *
                                                </label>
                                                <Input
                                                    required
                                                    placeholder={tLocal(
                                                        "namePlaceholder",
                                                    )}
                                                    value={formData.name}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "name",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-12 border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                                    {tLocal("email")} *
                                                </label>
                                                <Input
                                                    type="email"
                                                    required
                                                    placeholder={tLocal(
                                                        "emailPlaceholder",
                                                    )}
                                                    value={formData.email}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "email",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-12"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                                    {tLocal("phone")}
                                                </label>
                                                <Input
                                                    type="tel"
                                                    placeholder={tLocal(
                                                        "phonePlaceholder",
                                                    )}
                                                    value={formData.phone}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "phone",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-12"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                                    {tLocal("subject")} *
                                                </label>
                                                <Select
                                                    value={
                                                        formData.subject ||
                                                        "any"
                                                    }
                                                    onValueChange={(value) =>
                                                        handleInputChange(
                                                            "subject",
                                                            value,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger className="h-12">
                                                        <SelectValue
                                                            placeholder={tLocal(
                                                                "subjectPlaceholder",
                                                            )}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="general">
                                                            {tLocal(
                                                                "generalInquiry",
                                                            )}
                                                        </SelectItem>
                                                        <SelectItem value="buy">
                                                            {tLocal(
                                                                "buyProperty",
                                                            )}
                                                        </SelectItem>
                                                        <SelectItem value="rent">
                                                            {tLocal(
                                                                "rentProperty",
                                                            )}
                                                        </SelectItem>
                                                        <SelectItem value="sell">
                                                            {tLocal(
                                                                "sellProperty",
                                                            )}
                                                        </SelectItem>
                                                        <SelectItem value="valuation">
                                                            {tLocal(
                                                                "propertyValuation",
                                                            )}
                                                        </SelectItem>
                                                        <SelectItem value="investment">
                                                            {tLocal(
                                                                "investment",
                                                            )}
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                                    {tLocal("propertyType")}
                                                </label>
                                                <Select
                                                    value={
                                                        formData.propertyType
                                                    }
                                                    onValueChange={(value) =>
                                                        handleInputChange(
                                                            "propertyType",
                                                            value,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger className="h-12">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="any">
                                                            {tLocal("any")}
                                                        </SelectItem>
                                                        <SelectItem value="condo">
                                                            {tLocal("condo")}
                                                        </SelectItem>
                                                        <SelectItem value="house">
                                                            {tLocal("house")}
                                                        </SelectItem>
                                                        <SelectItem value="villa">
                                                            {tLocal("villa")}
                                                        </SelectItem>
                                                        <SelectItem value="townhouse">
                                                            {tLocal(
                                                                "townhouse",
                                                            )}
                                                        </SelectItem>
                                                        <SelectItem value="commercial">
                                                            {tLocal(
                                                                "commercial",
                                                            )}
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                                    {tLocal("budget")}
                                                </label>
                                                <Input
                                                    placeholder={tLocal(
                                                        "budgetPlaceholder",
                                                    )}
                                                    value={formData.budget}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "budget",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-12"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                                {tLocal("message")} *
                                            </label>
                                            <textarea
                                                required
                                                placeholder={tLocal(
                                                    "messagePlaceholder",
                                                )}
                                                value={formData.message}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "message",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full h-12 text-lg bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                    {tLocal("sending")}
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5 mr-2" />
                                                    {tLocal("sendMessage")}
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        {/* Quick Contact */}
                        <Card className="border border-gray-200 bg-white shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center text-gray-900">
                                    <Phone className="w-5 h-5 mr-2 text-gray-900" />
                                    {tLocal("getInTouch")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-gray-900" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">
                                            {t("contact.phone").replace(
                                                "Phone: ",
                                                "",
                                            )}
                                        </h4>
                                        <p className="text-gray-600">
                                            +66 123 456 789
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {locale === "en"
                                                ? "Available 24/7"
                                                : "บริการ 24 ชั่วโมง"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-gray-900" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">
                                            {t("contact.email").replace(
                                                "Email: ",
                                                "",
                                            )}
                                        </h4>
                                        <p className="text-gray-600">
                                            info@agencyrenting.com
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {locale === "en"
                                                ? "Reply within 24 hours"
                                                : "ตอบกลับภายใน 24 ชั่วโมง"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-gray-900" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">
                                            {t("contact.address").replace(
                                                "Address: ",
                                                "",
                                            )}
                                        </h4>
                                        <p className="text-gray-700">
                                            123 Real Estate St, Bangkok,
                                            Thailand
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {locale === "en"
                                                ? "Visit us anytime"
                                                : "มาเยี่ยมชมได้ทุกเวลา"}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Business Hours */}
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center text-gray-900">
                                    <Clock className="w-5 h-5 mr-2 text-gray-900" />
                                    {tLocal("businessHours")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-900">
                                            {tLocal("mondayFriday")}
                                        </span>
                                        <span className="text-gray-900">
                                            9:00 AM - 6:00 PM
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-900">
                                            {tLocal("saturday")}
                                        </span>
                                        <span className="text-gray-900">
                                            10:00 AM - 4:00 PM
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-900">
                                            {tLocal("sunday")}
                                        </span>
                                        <span className="text-gray-600">
                                            {tLocal("closed")}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Social Media */}
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center text-gray-900">
                                    <Globe className="w-5 h-5 mr-2 text-gray-900" />
                                    {tLocal("followUs")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        variant="outline"
                                        className="justify-start border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-900"
                                    >
                                        <Facebook className="w-4 h-4 mr-2 text-gray-600" />
                                        Facebook
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="justify-start border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-900"
                                    >
                                        <Instagram className="w-4 h-4 mr-2 text-gray-600" />
                                        Instagram
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="justify-start border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-900"
                                    >
                                        <Twitter className="w-4 h-4 mr-2 text-gray-600" />
                                        Twitter
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="justify-start border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-900"
                                    >
                                        <Linkedin className="w-4 h-4 mr-2 text-gray-600" />
                                        LinkedIn
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Our Agents Section */}
                <section className="mt-20">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                            {tLocal("ourAgents")}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {tLocal("agentsDesc")}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {agents.map((agent) => (
                            <Card
                                key={agent.id}
                                className="border border-gray-200 hover:border-gray-900 transition-colors bg-white"
                            >
                                <CardContent className="p-6">
                                    <div className="text-center mb-6">
                                        <img
                                            src={agent.image}
                                            alt={agent.name}
                                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                        />
                                        <h3 className="text-xl font-semibold mb-1 text-gray-900">
                                            {agent.name}
                                        </h3>
                                        <p className="text-gray-600 mb-3">
                                            {agent.title}
                                        </p>
                                        <div className="flex items-center justify-center mb-4">
                                            <Star className="w-4 h-4 text-gray-900 fill-current" />
                                            <span className="ml-1 text-sm font-medium">
                                                {agent.rating}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center">
                                            <Phone className="w-4 h-4 text-gray-600 mr-3" />
                                            <span className="text-sm">
                                                {agent.phone}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Mail className="w-4 h-4 text-gray-600 mr-3" />
                                            <span className="text-sm">
                                                {agent.email}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                                            {locale === "en"
                                                ? "Specialties"
                                                : "ความเชี่ยวชาญ"}
                                            :
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {agent.specialties.map(
                                                (specialty, index) => (
                                                    <Badge
                                                        key={index}
                                                        className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                    >
                                                        {specialty}
                                                    </Badge>
                                                ),
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                                        <div>
                                            <div className="font-semibold text-gray-900">
                                                {agent.experience}
                                            </div>
                                            <div className="text-gray-600">
                                                {tLocal("yearsExp")}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">
                                                {agent.propertiesSold}
                                            </div>
                                            <div className="text-gray-600">
                                                {tLocal("propertiesSold")}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">
                                                500+
                                            </div>
                                            <div className="text-gray-600">
                                                {tLocal("happyClients")}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-6">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-900"
                                        >
                                            <Phone className="w-4 h-4 mr-1" />
                                            {locale === "en" ? "Call" : "โทร"}
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="flex-1 bg-gray-900 text-white hover:bg-gray-800"
                                        >
                                            <Mail className="w-4 h-4 mr-1" />
                                            {locale === "en"
                                                ? "Email"
                                                : "อีเมล"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Map Section */}
                <section className="mt-20">
                    <Card className="border border-gray-200 bg-white shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center text-gray-900">
                                <MapPin className="w-6 h-6 mr-2 text-gray-900" />
                                {tLocal("officeLocations")}
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                                {locale === "en"
                                    ? "Visit our office or schedule an appointment with our agents"
                                    : "เยี่ยมชมสำนักงานของเราหรือนัดหมายกับตัวแทนของเรา"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center border border-gray-200">
                                <div className="text-center">
                                    <MapPin className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-600">
                                        {locale === "en"
                                            ? "Interactive map will be integrated here"
                                            : "แผนที่แบบโต้ตอบจะแสดงที่นี่"}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-2">
                                        123 Real Estate St, Bangkok, Thailand
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </main>
    );
}
