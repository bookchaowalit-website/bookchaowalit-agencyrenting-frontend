"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Home,
  Building2,
  Bath,
  Bed,
  Car,
  Filter,
  X,
  SlidersHorizontal,
} from "lucide-react";

interface PropertySearchProps {
  locale: string;
  onSearch: (filters: PropertyFilters) => void;
}

interface PropertyFilters {
  keyword: string;
  location: string;
  type: string;
  priceMin: string;
  priceMax: string;
  bedrooms: string;
  bathrooms: string;
  size: string;
  saleType: string; // "sale" | "rent"
}

export default function PropertySearch({
  locale,
  onSearch,
}: PropertySearchProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState<PropertyFilters>({
    keyword: "",
    location: "",
    type: "",
    priceMin: "",
    priceMax: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    saleType: "sale",
  });

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        searchPlaceholder: "Search by location, property name, or project...",
        location: "Location",
        selectLocation: "Select location",
        propertyType: "Property Type",
        selectType: "Select type",
        priceRange: "Price Range",
        priceMin: "Min price",
        priceMax: "Max price",
        bedrooms: "Bedrooms",
        bathrooms: "Bathrooms",
        propertySize: "Property Size",
        advancedFilters: "Advanced Filters",
        hideAdvanced: "Hide Advanced",
        search: "Search Properties",
        clearAll: "Clear All",
        forSale: "For Sale",
        forRent: "For Rent",
        condo: "Condominium",
        house: "House",
        townhouse: "Townhouse",
        villa: "Villa",
        apartment: "Apartment",
        land: "Land",
        commercial: "Commercial",
        bangkok: "Bangkok",
        phuket: "Phuket",
        pattaya: "Pattaya",
        chiangmai: "Chiang Mai",
        huahin: "Hua Hin",
        koh_samui: "Koh Samui",
        any: "Any",
        "1+": "1+",
        "2+": "2+",
        "3+": "3+",
        "4+": "4+",
        "5+": "5+",
        sqm: "sqm",
      },
      th: {
        searchPlaceholder: "ค้นหาตามทำเล ชื่อโครงการ หรือคีย์เวิร์ด...",
        location: "ทำเล",
        selectLocation: "เลือกทำเล",
        propertyType: "ประเภทอสังหาฯ",
        selectType: "เลือกประเภท",
        priceRange: "ช่วงราคา",
        priceMin: "ราคาต่ำสุด",
        priceMax: "ราคาสูงสุด",
        bedrooms: "ห้องนอน",
        bathrooms: "ห้องน้ำ",
        propertySize: "ขนาดพื้นที่",
        advancedFilters: "ตัวกรองขั้นสูง",
        hideAdvanced: "ซ่อนตัวกรอง",
        search: "ค้นหาอสังหาฯ",
        clearAll: "ลบทั้งหมด",
        forSale: "ขาย",
        forRent: "เช่า",
        condo: "คอนโดมิเนียม",
        house: "บ้าน",
        townhouse: "ทาวน์เฮ้าส์",
        villa: "วิลล่า",
        apartment: "อพาร์ทเมนต์",
        land: "ที่ดิน",
        commercial: "พาณิชย์",
        bangkok: "กรุงเทพฯ",
        phuket: "ภูเก็ต",
        pattaya: "พัทยา",
        chiangmai: "เชียงใหม่",
        huahin: "หัวหิน",
        koh_samui: "เกาะสมุย",
        any: "ไม่จำกัด",
        "1+": "1+",
        "2+": "2+",
        "3+": "3+",
        "4+": "4+",
        "5+": "5+",
        sqm: "ตร.ม.",
      },
    };
    return translations[locale]?.[key] || key;
  };

  const handleFilterChange = (key: keyof PropertyFilters, value: string) => {
    // Convert "any" back to empty string for filtering logic
    const filterValue = value === "any" ? "" : value;
    const newFilters = { ...filters, [key]: filterValue };
    setFilters(newFilters);
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      keyword: "",
      location: "any",
      type: "any",
      priceMin: "",
      priceMax: "",
      bedrooms: "any",
      bathrooms: "any",
      size: "",
      saleType: filters.saleType, // Keep sale type
    };
    setFilters(clearedFilters);
    onSearch(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    const filterKeys: (keyof PropertyFilters)[] = [
      "location",
      "type",
      "priceMin",
      "priceMax",
      "bedrooms",
      "bathrooms",
      "size",
    ];
    return filterKeys.filter(
      (key) => filters[key] && filters[key] !== "" && filters[key] !== "any",
    ).length;
  };

  return (
    <Card className="p-6 border border-gray-200 bg-white shadow-sm">
      {/* Sale/Rent Toggle */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={filters.saleType === "sale" ? "default" : "outline"}
          onClick={() => handleFilterChange("saleType", "sale")}
          className={`flex-1 sm:flex-initial ${
            filters.saleType === "sale"
              ? "bg-gray-900 text-white hover:bg-gray-800"
              : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-900"
          }`}
        >
          <Home className="w-4 h-4 mr-2" />
          {t("forSale")}
        </Button>
        <Button
          variant={filters.saleType === "rent" ? "default" : "outline"}
          onClick={() => handleFilterChange("saleType", "rent")}
          className={`flex-1 sm:flex-initial ${
            filters.saleType === "rent"
              ? "bg-gray-900 text-white hover:bg-gray-800"
              : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-900"
          }`}
        >
          <Building2 className="w-4 h-4 mr-2" />
          {t("forRent")}
        </Button>
      </div>

      {/* Main Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        <Input
          placeholder={t("searchPlaceholder")}
          value={filters.keyword}
          onChange={(e) => handleFilterChange("keyword", e.target.value)}
          className="pl-10 h-12 text-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900"
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      {/* Quick Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center text-gray-700">
            <MapPin className="w-4 h-4 mr-1" />
            {t("location")}
          </label>
          <Select
            value={filters.location || "any"}
            onValueChange={(value) => handleFilterChange("location", value)}
          >
            <SelectTrigger className="border-gray-300 focus:border-gray-900">
              <SelectValue placeholder={t("selectLocation")} />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="any">{t("any")}</SelectItem>
              <SelectItem value="bangkok">{t("bangkok")}</SelectItem>
              <SelectItem value="phuket">{t("phuket")}</SelectItem>
              <SelectItem value="pattaya">{t("pattaya")}</SelectItem>
              <SelectItem value="chiangmai">{t("chiangmai")}</SelectItem>
              <SelectItem value="huahin">{t("huahin")}</SelectItem>
              <SelectItem value="koh_samui">{t("koh_samui")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center text-gray-700">
            <Building2 className="w-4 h-4 mr-1" />
            {t("propertyType")}
          </label>
          <Select
            value={filters.type || "any"}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger className="border-gray-300 focus:border-gray-900">
              <SelectValue placeholder={t("selectType")} />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="any">{t("any")}</SelectItem>
              <SelectItem value="condo">{t("condo")}</SelectItem>
              <SelectItem value="house">{t("house")}</SelectItem>
              <SelectItem value="townhouse">{t("townhouse")}</SelectItem>
              <SelectItem value="villa">{t("villa")}</SelectItem>
              <SelectItem value="apartment">{t("apartment")}</SelectItem>
              <SelectItem value="land">{t("land")}</SelectItem>
              <SelectItem value="commercial">{t("commercial")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2 md:col-span-2 lg:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            {t("priceRange")}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder={t("priceMin")}
              value={filters.priceMin}
              onChange={(e) => handleFilterChange("priceMin", e.target.value)}
              type="number"
              className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
            />
            <Input
              placeholder={t("priceMax")}
              value={filters.priceMax}
              onChange={(e) => handleFilterChange("priceMax", e.target.value)}
              type="number"
              className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {showAdvanced ? t("hideAdvanced") : t("advancedFilters")}
          {getActiveFiltersCount() > 0 && (
            <Badge className="ml-1 bg-gray-900 text-white">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </Button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          {/* Bedrooms */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center text-gray-700">
              <Bed className="w-4 h-4 mr-1" />
              {t("bedrooms")}
            </label>
            <Select
              value={filters.bedrooms || "any"}
              onValueChange={(value) => handleFilterChange("bedrooms", value)}
            >
              <SelectTrigger className="border-gray-300 focus:border-gray-900">
                <SelectValue placeholder={t("any")} />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="any">{t("any")}</SelectItem>
                <SelectItem value="1">{t("1+")}</SelectItem>
                <SelectItem value="2">{t("2+")}</SelectItem>
                <SelectItem value="3">{t("3+")}</SelectItem>
                <SelectItem value="4">{t("4+")}</SelectItem>
                <SelectItem value="5">{t("5+")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bathrooms */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center text-gray-700">
              <Bath className="w-4 h-4 mr-1" />
              {t("bathrooms")}
            </label>
            <Select
              value={filters.bathrooms || "any"}
              onValueChange={(value) => handleFilterChange("bathrooms", value)}
            >
              <SelectTrigger className="border-gray-300 focus:border-gray-900">
                <SelectValue placeholder={t("any")} />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="any">{t("any")}</SelectItem>
                <SelectItem value="1">{t("1+")}</SelectItem>
                <SelectItem value="2">{t("2+")}</SelectItem>
                <SelectItem value="3">{t("3+")}</SelectItem>
                <SelectItem value="4">{t("4+")}</SelectItem>
                <SelectItem value="5">{t("5+")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Property Size */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {t("propertySize")}
            </label>
            <Input
              placeholder={`${t("propertySize")} (${t("sqm")})`}
              value={filters.size}
              onChange={(e) => handleFilterChange("size", e.target.value)}
              type="number"
              className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleSearch}
          size="lg"
          className="flex-1 h-12 bg-gray-900 text-white hover:bg-gray-800"
        >
          <Search className="w-5 h-5 mr-2" />
          {t("search")}
        </Button>
        <Button
          variant="outline"
          onClick={handleClearAll}
          size="lg"
          className="sm:w-auto h-12 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-900"
        >
          <X className="w-5 h-5 mr-2" />
          {t("clearAll")}
        </Button>
      </div>

      {/* Active Filters Display */}
      {(filters.keyword || getActiveFiltersCount() > 0) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filters.keyword && (
              <Badge className="flex items-center gap-1 bg-gray-100 text-gray-900 hover:bg-gray-200">
                "{filters.keyword}"
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => handleFilterChange("keyword", "")}
                />
              </Badge>
            )}
            {filters.location && filters.location !== "any" && (
              <Badge className="flex items-center gap-1 bg-gray-100 text-gray-900 hover:bg-gray-200">
                {t(filters.location)}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => handleFilterChange("location", "any")}
                />
              </Badge>
            )}
            {filters.type && filters.type !== "any" && (
              <Badge className="flex items-center gap-1 bg-gray-100 text-gray-900 hover:bg-gray-200">
                {t(filters.type)}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => handleFilterChange("type", "any")}
                />
              </Badge>
            )}
            {(filters.priceMin || filters.priceMax) && (
              <Badge className="flex items-center gap-1 bg-gray-100 text-gray-900 hover:bg-gray-200">
                {filters.priceMin || "0"} - {filters.priceMax || "∞"}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => {
                    handleFilterChange("priceMin", "");
                    handleFilterChange("priceMax", "");
                  }}
                />
              </Badge>
            )}
            {filters.bedrooms && filters.bedrooms !== "any" && (
              <Badge className="flex items-center gap-1 bg-gray-100 text-gray-900 hover:bg-gray-200">
                {filters.bedrooms}+ {t("bedrooms")}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => handleFilterChange("bedrooms", "any")}
                />
              </Badge>
            )}
            {filters.bathrooms && filters.bathrooms !== "any" && (
              <Badge className="flex items-center gap-1 bg-gray-100 text-gray-900 hover:bg-gray-200">
                {filters.bathrooms}+ {t("bathrooms")}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => handleFilterChange("bathrooms", "any")}
                />
              </Badge>
            )}
            {filters.size && (
              <Badge className="flex items-center gap-1 bg-gray-100 text-gray-900 hover:bg-gray-200">
                {filters.size}+ {t("sqm")}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => handleFilterChange("size", "")}
                />
              </Badge>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
