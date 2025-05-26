import { useState } from "react";
import { getDistrictsApi, getWardsApi } from "../apis/provinces.api";

export const useLocationMapping = (provinces) => {
  const [locationData, setLocationData] = useState({
    districts: {},
    wards: {},
  });

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
