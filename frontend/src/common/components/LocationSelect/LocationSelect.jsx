import React, { useEffect, useState, useMemo } from "react";
import { Select } from "antd";
import _ from "lodash";
import { useLocationMapping } from "../../../hooks/useLocationMapping";

const { Option } = Select;

const LocationSelect = ({
  provinces,
  onProvinceChange,
  onDistrictChange,
  onWardChange,
  defaultValues = {},
}) => {
  const [provinceCode, setProvinceCode] = useState();
  const [provinceName, setProvinceName] = useState(defaultValues.province);
  const [districts, setDistricts] = useState([]);
  const [districtsCode, setDistrictsCode] = useState();
  const [districtName, setDistrictName] = useState(defaultValues.district);
  const [wards, setWards] = useState([]);
  const [wardName, setWardName] = useState(defaultValues.ward);

  // Sử dụng useLocationMapping hook
  const { getCodeFromName, fetchAndCacheDistricts, fetchAndCacheWards } =
    useLocationMapping(provinces);

  const fetchDistricts = async (value) => {
    const districtsData = await fetchAndCacheDistricts(value);
    setDistricts(districtsData);
  };

  const fetchWards = async (value) => {
    const wardsData = await fetchAndCacheWards(value);
    setWards(wardsData);
  };

  // Initialize data when component mounts with default values
  useEffect(() => {
    const initializeProvince = async () => {
      if (defaultValues.province && !provinceCode) {
        const code = await getCodeFromName("province", defaultValues.province);
        if (code) {
          setProvinceCode(code);
          setProvinceName(defaultValues.province);
        }
      }
    };
    initializeProvince();
  }, [provinces, defaultValues.province]);

  useEffect(() => {
    if (provinceCode) {
      fetchDistricts(provinceCode);
    }
  }, [provinceCode]);

  useEffect(() => {
    const initializeDistrict = async () => {
      if (districts.length > 0 && defaultValues.district && !districtsCode) {
        const code = await getCodeFromName(
          "district",
          defaultValues.district,
          provinceCode
        );
        if (code) {
          setDistrictsCode(code);
          setDistrictName(defaultValues.district);
        }
      }
    };
    initializeDistrict();
  }, [districts, defaultValues.district, provinceCode]);

  useEffect(() => {
    if (districtsCode) {
      fetchWards(districtsCode);
    }
  }, [districtsCode]);

  useEffect(() => {
    const initializeWard = async () => {
      if (wards.length > 0 && defaultValues.ward && !wardName) {
        const code = await getCodeFromName(
          "ward",
          defaultValues.ward,
          districtsCode
        );
        if (code) {
          setWardName(defaultValues.ward);
        }
      }
    };
    initializeWard();
  }, [wards, defaultValues.ward, districtsCode]);

  const handleProvinceChange = (value, option) => {
    const selectedProvince = provinces.find((p) => p.code === value);
    setProvinceCode(value);
    setProvinceName(selectedProvince?.name || "");
    setDistrictsCode(null);
    setDistrictName("");
    setWards([]);
    setWardName("");
    onProvinceChange?.(selectedProvince?.name || "");
  };

  const handleDistrictChange = (value, option) => {
    const selectedDistrict = districts.find((d) => d.code === value);
    setDistrictsCode(value);
    setDistrictName(selectedDistrict?.name || "");
    setWards([]);
    setWardName("");
    onDistrictChange?.(selectedDistrict?.name || "");
  };

  const handleWardChange = (value, option) => {
    const selectedWard = wards.find((w) => w.code === value);
    setWardName(selectedWard?.name || "");
    onWardChange?.(selectedWard?.name || "");
  };

  const showProvinces = useMemo(() => {
    return (
      <Select
        placeholder="Chọn tỉnh/thành phố"
        onChange={handleProvinceChange}
        value={provinceName || undefined}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {_.map(provinces, (province, index) => (
          <Option key={index} value={province.code}>
            {province.name}
          </Option>
        ))}
      </Select>
    );
  }, [provinces, provinceName]);

  const showDistricts = useMemo(() => {
    return (
      <Select
        placeholder="Chọn quận/huyện"
        onChange={handleDistrictChange}
        value={districtName || undefined}
        disabled={!provinceCode}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {_.map(districts, (district, index) => (
          <Option key={index} value={district.code}>
            {district.name}
          </Option>
        ))}
      </Select>
    );
  }, [districts, districtName, provinceCode]);

  const showWards = useMemo(() => {
    return (
      <Select
        placeholder="Chọn phường/xã"
        onChange={handleWardChange}
        value={wardName || undefined}
        disabled={!districtsCode}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {_.map(wards, (ward, index) => (
          <Option key={index} value={ward.code}>
            {ward.name}
          </Option>
        ))}
      </Select>
    );
  }, [wards, wardName, districtsCode]);

  return {
    showProvinces,
    showDistricts,
    showWards,
  };
};

export default LocationSelect;
