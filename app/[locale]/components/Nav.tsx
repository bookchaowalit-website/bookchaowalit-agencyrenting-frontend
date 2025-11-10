"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Building,
  Info,
  Phone,
  Globe,
  Search,
  Heart,
  User,
  Menu,
  X,
  Tag,
  Building2,
  Sparkles,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import { useState } from "react";

export default function Nav({ locale }: { locale: string }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const switchLocale = locale === "en" ? "th" : "en";
  const switchPath = pathname.replace(`/${locale}`, `/${switchLocale}`);

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        home: "Home",
        listings: "Properties",
        forSale: "For Sale",
        forRent: "For Rent",
        newProjects: "New Projects",
        about: "About",
        contact: "Contact",
        search: "Search",
        favorites: "Favorites",
        account: "Account",
        menu: "Menu",
        articles: "Articles",
      },
      th: {
        home: "หน้าแรก",
        listings: "อสังหาฯ",
        forSale: "ขาย",
        forRent: "เช่า",
        newProjects: "โครงการใหม่",
        about: "เกี่ยวกับ",
        contact: "ติดต่อ",
        search: "ค้นหา",
        favorites: "รายการโปรด",
        account: "บัญชี",
        menu: "เมนู",
        articles: "บทความ",
      },
    };
    return translations[locale]?.[key] || key;
  };

  const mainNavItems = [
    {
      href: `/${locale}`,
      icon: Home,
      label: t("home"),
    },
    {
      href: `/${locale}/about`,
      icon: Info,
      label: t("about"),
    },
    {
      href: `/${locale}/articles`,
      icon: BookOpen,
      label: t("articles"),
    },
    {
      href: `/${locale}/contact`,
      icon: Phone,
      label: t("contact"),
    },
  ];

  const propertyNavItems = [
    {
      href: `/${locale}/listings`,
      icon: Building,
      label: t("listings"),
      badge: "120+",
    },
    {
      href: `/${locale}/listings?type=sale`,
      icon: Tag,
      label: t("forSale"),
      badge: "85",
    },
    {
      href: `/${locale}/listings?type=rent`,
      icon: Building2,
      label: t("forRent"),
      badge: "35",
    },
    {
      href: `/${locale}/listings?new=true`,
      icon: Sparkles,
      label: t("newProjects"),
      badge: "12",
      isNew: true,
    },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === href;
    }
    return pathname.startsWith(href.split("?")[0]);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <Card className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 rounded-none shadow-sm">
        <nav className="container-minimal">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Link href={`/${locale}`} className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                    <Building className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900 tracking-tight">
                    Agency Renting
                  </span>
                  <span className="text-xs text-gray-500 hidden sm:block">
                    {locale === "en"
                      ? "Premium Properties"
                      : "อสังหาฯ พรีเมียม"}
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {/* Main Navigation */}
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.href}
                    asChild
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className={`flex items-center space-x-2 font-medium ${
                      isActive(item.href)
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Link href={item.href}>
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                );
              })}

              {/* Properties Dropdown */}
              <div className="relative">
                <Button
                  variant={pathname.includes("/listings") ? "default" : "ghost"}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center space-x-2 font-medium ${
                    pathname.includes("/listings")
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Building className="h-4 w-4" />
                  <span>{t("listings")}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
                    {propertyNavItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center justify-between w-full p-3 rounded-md hover:bg-gray-100 transition-colors group"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-1 rounded bg-gray-100 group-hover:bg-gray-900 transition-colors">
                              <Icon className="h-4 w-4 text-gray-900 group-hover:text-white transition-colors" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">
                                {item.label}
                              </span>
                              {item.isNew && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs w-fit bg-gray-900 text-white"
                                >
                                  New
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs border-gray-300 text-gray-600"
                          >
                            {item.badge}
                          </Badge>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <Search className="h-4 w-4" />
              </Button>

              {/* Favorites Button */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex relative text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <Heart className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-gray-900 text-white">
                  3
                </Badge>
              </Button>

              {/* Account Button */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <User className="h-4 w-4" />
              </Button>

              {/* Language Switcher */}
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-900"
              >
                <Link href={switchPath} className="flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <span className="font-medium">
                    {switchLocale.toUpperCase()}
                  </span>
                </Link>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="lg:hidden text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 bg-white">
              <div className="space-y-2">
                {/* Main Navigation */}
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.href}
                      asChild
                      variant={isActive(item.href) ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        isActive(item.href)
                          ? "bg-gray-900 text-white"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link href={item.href}>
                        <Icon className="h-4 w-4 mr-2" />
                        {item.label}
                      </Link>
                    </Button>
                  );
                })}

                {/* Properties Section */}
                <div className="pt-2 border-t border-gray-100">
                  <p className="px-3 py-2 text-sm font-medium text-gray-500">
                    {t("listings")}
                  </p>
                  {propertyNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.href}
                        asChild
                        variant="ghost"
                        className="w-full justify-between text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link href={item.href}>
                          <div className="flex items-center">
                            <Icon className="h-4 w-4 mr-3" />
                            <span>{item.label}</span>
                            {item.isNew && (
                              <Badge
                                variant="secondary"
                                className="ml-2 text-xs bg-gray-900 text-white"
                              >
                                New
                              </Badge>
                            )}
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs border-gray-300 text-gray-600"
                          >
                            {item.badge}
                          </Badge>
                        </Link>
                      </Button>
                    );
                  })}
                </div>

                {/* Mobile Actions */}
                <div className="pt-2 border-t border-gray-100 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    {t("search")}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 relative text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    {t("favorites")}
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-gray-900 text-white">
                      3
                    </Badge>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {t("account")}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </Card>

      {/* Overlay for dropdown/mobile menu */}
      {(isDropdownOpen || isMobileMenuOpen) && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => {
            setIsDropdownOpen(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </>
  );
}
