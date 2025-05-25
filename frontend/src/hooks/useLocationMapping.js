import { useState, useEffect } from "react";
import { getDistrictsApi, getWardsApi } from "../apis/provinces.api";

// Hook để quản lý mapping giữa name và code của location
export const useLocationMapping = (provinces) => {
  const [locationData, setLocationData] = useState({
    districts: {},
    wards: {},
  });

  // Fetch districts và cache theo province code
  const fetchAndCacheDistricts = async (provinceCode) => {
    if (!locationData.districts[provinceCode]) {
      const res = await getDistrictsApi(provinceCode);
      setLocationData((prev) => ({
        ...prev,
        districts: {
          ...prev.districts,
          [provinceCode]: res?.data || [],
        },
      }));
      return res?.data || [];
    }
    return locationData.districts[provinceCode];
  };

  // Fetch wards và cache theo district code
  const fetchAndCacheWards = async (districtCode) => {
    if (!locationData.wards[districtCode]) {
      const res = await getWardsApi(districtCode);
      setLocationData((prev) => ({
        ...prev,
        wards: {
          ...prev.wards,
          [districtCode]: res?.data || [],
        },
      }));
      return res?.data || [];
    }
    return locationData.wards[districtCode];
  };

  // Tìm code từ name
  const getCodeFromName = async (type, name, parentCode = null) => {
    switch (type) {
      case "province":
        const province = provinces.find((p) => p.name === name);
        return province?.code;

      case "district":
        if (!parentCode) return null;
        const districts = await fetchAndCacheDistricts(parentCode);
        const district = districts.find((d) => d.name === name);
        return district?.code;

      case "ward":
        if (!parentCode) return null;
        const wards = await fetchAndCacheWards(parentCode);
        const ward = wards.find((w) => w.name === name);
        return ward?.code;

      default:
        return null;
    }
  };

  // Tìm name từ code
  const getNameFromCode = async (type, code, parentCode = null) => {
    switch (type) {
      case "province":
        const province = provinces.find((p) => p.code === code);
        return province?.name;

      case "district":
        if (!parentCode) return null;
        const districts = await fetchAndCacheDistricts(parentCode);
        const district = districts.find((d) => d.code === code);
        return district?.name;

      case "ward":
        if (!parentCode) return null;
        const wards = await fetchAndCacheWards(parentCode);
        const ward = wards.find((w) => w.code === code);
        return ward?.name;

      default:
        return null;
    }
  };

  return {
    getCodeFromName,
    getNameFromCode,
    fetchAndCacheDistricts,
    fetchAndCacheWards,
    locationData,
  };
};
