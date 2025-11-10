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
  Users,
  Award,
  MapPin,
  Phone,
  Mail,
  Building2,
  Shield,
  Clock,
  TrendingUp,
  Star,
  CheckCircle,
  Target,
  Eye,
  Heart,
} from "lucide-react";
import enMessages from "../../../messages/en.json";
import thMessages from "../../../messages/th.json";

const messageMap: Record<string, any> = {
  en: enMessages,
  th: thMessages,
};

export default function About({ params }: { params: { locale: string } }) {
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

  const stats = [
    {
      number: "500+",
      label: locale === "en" ? "Properties Listed" : "รายการอสังหาฯ",
      icon: Building2,
    },
    {
      number: "1,000+",
      label: locale === "en" ? "Happy Clients" : "ลูกค้าพอใจ",
      icon: Users,
    },
    {
      number: "15+",
      label: locale === "en" ? "Years Experience" : "ปีประสบการณ์",
      icon: Award,
    },
    {
      number: "24/7",
      label: locale === "en" ? "Customer Support" : "บริการลูกค้า",
      icon: Clock,
    },
  ];

  const values = [
    {
      icon: Shield,
      title: locale === "en" ? "Trust & Integrity" : "ความน่าเชื่อถือ",
      description:
        locale === "en"
          ? "We operate with complete transparency and honesty in all our dealings"
          : "เราดำเนินงานด้วยความโปร่งใสและซื่อสัตย์ในทุกการติดต่อ",
    },
    {
      icon: Target,
      title: locale === "en" ? "Client-Focused" : "เน้นลูกค้าเป็นหลัก",
      description:
        locale === "en"
          ? "Your needs and satisfaction are our top priority in every transaction"
          : "ความต้องการและความพึงพอใจของคุณคือสิ่งสำคัญที่สุดในทุกการทำธุรกรรม",
    },
    {
      icon: TrendingUp,
      title: locale === "en" ? "Market Expertise" : "ความเชี่ยวชาญตลาด",
      description:
        locale === "en"
          ? "Deep knowledge of Thailand's real estate market trends and opportunities"
          : "ความรู้ลึกเกี่ยวกับแนวโน้มตลาดและโอกาสในอสังหาริมทรัพย์ไทย",
    },
    {
      icon: Award,
      title: locale === "en" ? "Excellence" : "ความเป็นเลิศ",
      description:
        locale === "en"
          ? "Committed to delivering exceptional service and results"
          : "มุ่งมั่นในการส่งมอบบริการและผลลัพธ์ที่ยอดเยี่ยม",
    },
  ];

  const team = [
    {
      name: locale === "en" ? "Somchai Prasert" : "สมชาย ประเสริฐ",
      role:
        locale === "en" ? "Chief Executive Officer" : "ประธานเจ้าหน้าที่บริหาร",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&cs=tinysrgb",
      description:
        locale === "en"
          ? "15+ years experience in Thailand real estate market"
          : "ประสบการณ์กว่า 15 ปีในตลาดอสังหาริมทรัพย์ไทย",
    },
    {
      name: locale === "en" ? "Siriporn Thanakit" : "ศิริพร ธนกิจ",
      role: locale === "en" ? "Head of Sales" : "หัวหน้าฝ่ายขาย",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&cs=tinysrgb",
      description:
        locale === "en"
          ? "Expert in luxury properties and international clients"
          : "ผู้เชี่ยวชาญด้านอสังหาฯ หรูและลูกค้าต่างชาติ",
    },
    {
      name: locale === "en" ? "Niran Kulwong" : "นิรันดร์ กุลวงศ์",
      role: locale === "en" ? "Investment Consultant" : "ที่ปรึกษาการลงทุน",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&cs=tinysrgb",
      description:
        locale === "en"
          ? "Specialized in property investment and market analysis"
          : "เชี่ยวชาญด้านการลงทุนอสังหาฯ และวิเคราะห์ตลาด",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 border-b border-gray-200">
        <div className="container-minimal text-center">
          <Badge
            variant="outline"
            className="mb-8 px-4 py-2 text-sm font-medium border-white text-white hover:bg-white hover:text-gray-900 transition-colors"
          >
            <Star className="w-4 h-4 mr-2" />
            {locale === "en"
              ? "About Agency Renting"
              : "เกี่ยวกับ Agency Renting"}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            {t("about.title")}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t("about.description")}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="container-minimal">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center border border-gray-200 hover:border-gray-900 transition-colors bg-white p-8"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="w-8 h-8 text-gray-900" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="container-minimal">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              {locale === "en" ? "Our Purpose" : "เป้าหมายของเรา"}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {locale === "en"
                ? "Dedicated to transforming Thailand's real estate landscape"
                : "มุ่งมั่นเพื่อเปลี่ยนแปลงภูมิทัศน์อสังหาริมทรัพย์ไทย"}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <Card className="border border-gray-200 bg-white p-8">
              <CardHeader className="p-0 mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 w-8 text-gray-900" />
                </div>
                <CardTitle className="text-2xl text-gray-900">
                  {locale === "en" ? "Our Mission" : "พันธกิจ"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {locale === "en"
                    ? "To provide exceptional real estate services that exceed client expectations while maintaining the highest standards of professionalism, integrity, and market expertise in Thailand's property sector."
                    : "ให้บริการอสังหาริมทรัพย์ที่ยอดเยี่ยมซึ่งเกินความคาดหวังของลูกค้า พร้อมรักษามาตรฐานสูงสุดของความเป็นมืออาชีพ ความซื่อสัตย์ และความเชี่ยวชาญด้านตลาดในภาคอสังหาริมทรัพย์ไทย"}
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white p-8">
              <CardHeader className="p-0 mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Eye className="w-8 w-8 text-gray-900" />
                </div>
                <CardTitle className="text-2xl text-gray-900">
                  {locale === "en" ? "Our Vision" : "วิสัยทัศน์"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {locale === "en"
                    ? "To become Thailand's most trusted and innovative real estate platform, connecting people with their perfect properties while setting new industry standards for transparency, service excellence, and client satisfaction."
                    : "เป็นแพลตฟอร์มอสังหาริมทรัพย์ที่น่าเชื่อถือและนวัตกรรมที่สุดในไทย เชื่อมโยงผู้คนกับอสังหาฯ ที่สมบูรณ์แบบ พร้อมสร้างมาตรฐานใหม่ในอุตสาหกรรมด้านความโปร่งใส ความเป็นเลิศในการบริการ และความพึงพอใจของลูกค้า"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="container-minimal">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              {locale === "en" ? "Our Values" : "ค่านิยมของเรา"}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {locale === "en"
                ? "The principles that guide everything we do"
                : "หลักการที่นำทางทุกสิ่งที่เราทำ"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center border border-gray-200 hover:border-gray-900 transition-colors bg-white p-8"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-white">
        <div className="container-minimal">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              {locale === "en" ? "Leadership Team" : "ทีมผู้นำ"}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("about.team")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border border-gray-200 hover:border-gray-900 transition-colors bg-white overflow-hidden"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="container-minimal">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                {locale === "en" ? "Our Story" : "เรื่องราวของเรา"}
              </h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <Card className="border border-gray-200 bg-white p-8">
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {locale === "en"
                    ? "Founded with a vision to revolutionize Thailand's real estate market, Agency Renting began as a small team of passionate property professionals who believed that finding the perfect home or investment should be a seamless, transparent, and enjoyable experience."
                    : "ก่อตั้งขึ้นด้วยวิสัยทัศน์ในการปฏิวัติตลาดอสังหาริมทรัพย์ของไทย Agency Renting เริ่มต้นจากทีมเล็กๆ ของผู้เชี่ยวชาญด้านอสังหาฯ ที่มีความหลงใหลและเชื่อว่าการหาบ้านหรือการลงทุนที่สมบูรณ์แบบควรเป็นประสบการณ์ที่ราบรื่น โปร่งใส และสนุกสนาน"}
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {locale === "en"
                    ? "Over the years, we have grown from a local startup to become one of Thailand's most respected real estate agencies. Our commitment to excellence, combined with deep market knowledge and innovative technology, has helped thousands of clients find their dream properties across Bangkok, Phuket, Pattaya, and beyond."
                    : "ตลอดหลายปีที่ผ่านมา เราได้เติบโตจากสตาร์ทอัปท้องถิ่นมาเป็นหนึ่งในบริษัทนายหน้าอสังหาริมทรัพย์ที่ได้รับความเคารพมากที่สุดในไทย ความมุ่งมั่นในความเป็นเลิศ รวมกับความรู้ลึกเกี่ยวกับตลาดและเทคโนโลยีที่เป็นนวัตกรรม ได้ช่วยให้ลูกค้าหลายพันคนพบกับอสังหาฯ ในฝันของพวกเขาทั่วกรุงเทพฯ ภูเก็ต พัทยา และอื่นๆ"}
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {locale === "en"
                    ? "Today, we continue to push boundaries, embrace new technologies, and maintain our core values of trust, transparency, and client-first service. Whether you're a first-time buyer, seasoned investor, or looking to sell your property, we're here to guide you every step of the way."
                    : "ปัจจุบัน เรายังคงผลักดันขอบเขต ยอมรับเทคโนโลยีใหม่ๆ และรักษาค่านิยมหลักของเราไว้คือ ความไว้วางใจ ความโปร่งใส และการบริการที่ยึดลูกค้าเป็นหลัก ไม่ว่าคุณจะเป็นผู้ซื้อครั้งแรก นักลงทุนที่มีประสบการณ์ หรือกำลังมองหาการขายอสังหาฯ ของคุณ เราพร้อมแนะนำคุณในทุกขั้นตอน"}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container-minimal text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {locale === "en"
              ? "Ready to Work With Us?"
              : "พร้อมทำงานร่วมกับเราหรือยัง?"}
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            {locale === "en"
              ? "Join thousands of satisfied clients who have found their perfect properties with us"
              : "ร่วมกับลูกค้าที่พึงพอใจหลายพันคนที่พบอสังหาฯ ที่สมบูรณ์แบบกับเรา"}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="h-14 px-8 text-lg bg-white text-gray-900 hover:bg-gray-100"
            >
              <Link href={`/${locale}/contact`}>
                <Phone className="mr-2 h-5 w-5" />
                {t("contact.title")}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg border-white text-white hover:bg-white hover:text-gray-900"
            >
              <Link href={`/${locale}/listings`}>
                <Building2 className="mr-2 h-5 w-5" />
                {t("listings.title")}
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: CheckCircle,
                text:
                  locale === "en" ? "Expert Guidance" : "คำแนะนำผู้เชี่ยวชาญ",
              },
              {
                icon: CheckCircle,
                text: locale === "en" ? "Market Insights" : "ข้อมูลเชิงลึกตลาด",
              },
              {
                icon: CheckCircle,
                text:
                  locale === "en" ? "Trusted Service" : "บริการที่เชื่อถือได้",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center space-x-3"
              >
                <item.icon className="h-5 w-5 text-white" />
                <span className="text-gray-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
