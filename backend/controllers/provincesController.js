// Base URL của Provinces Open API
const axios = require("axios");
const BASE_URL = "https://provinces.open-api.vn/api";

// Cache để tối ưu hiệu suất
let provincesCache = null;
let lastCacheUpdate = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 giờ

// Hàm helper để normalize text cho tìm kiếm
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Bỏ dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

// Hàm lấy và cache dữ liệu tỉnh thành
async function getProvincesData() {
  const now = Date.now();

  // Kiểm tra cache
  if (
    provincesCache &&
    lastCacheUpdate &&
    now - lastCacheUpdate < CACHE_DURATION
  ) {
    return provincesCache;
  }

  try {
    const response = await axios.get(`${BASE_URL}/p/`);
    provincesCache = response.data;
    lastCacheUpdate = now;
    return provincesCache;
  } catch (error) {
    console.error("Error fetching provinces:", error.message);
    throw error;
  }
}

// 1. Lấy danh sách tất cả tỉnh/thành phố
exports.getProvinces = async (req, res) => {
  try {
    const provinces = await getProvincesData();
    res.json({
      success: true,
      data: provinces,
      total: provinces.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không thể lấy danh sách tỉnh thành",
      error: error.message,
    });
  }
};

// 2. Lấy thông tin chi tiết tỉnh/thành phố theo code
exports.getProvincesByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const response = await axios.get(`${BASE_URL}/p/${code}?depth=2`);

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({
        success: false,
        message: "Không tìm thấy tỉnh thành với mã này",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy thông tin tỉnh thành",
        error: error.message,
      });
    }
  }
};

// 3. Lấy danh sách quận/huyện theo tỉnh
exports.getDistricts = async (req, res) => {
  try {
    const { code } = req.params;
    const response = await axios.get(`${BASE_URL}/p/${code}?depth=2`);

    res.json({
      success: true,
      data: response.data.districts || [],
      total: response.data.districts ? response.data.districts.length : 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không thể lấy danh sách quận huyện",
      error: error.message,
    });
  }
};

// 4. Lấy thông tin chi tiết quận/huyện
exports.getDistrictsByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const response = await axios.get(`${BASE_URL}/d/${code}?depth=2`);

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({
        success: false,
        message: "Không tìm thấy quận huyện với mã này",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy thông tin quận huyện",
        error: error.message,
      });
    }
  }
};

// 5. Lấy danh sách xã/phường theo quận/huyện
exports.getWards = async (req, res) => {
  try {
    const { code } = req.params;
    const response = await axios.get(`${BASE_URL}/d/${code}?depth=2`);

    res.json({
      success: true,
      data: response.data.wards || [],
      total: response.data.wards ? response.data.wards.length : 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không thể lấy danh sách xã phường",
      error: error.message,
    });
  }
};

// 6. Lấy thông tin chi tiết xã/phường
exports.getWardsByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const response = await axios.get(`${BASE_URL}/w/${code}`);

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({
        success: false,
        message: "Không tìm thấy xã phường với mã này",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Lỗi khi lấy thông tin xã phường",
        error: error.message,
      });
    }
  }
};

// 7. Tìm kiếm tỉnh/thành phố
exports.searchProvinces = async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Từ khóa tìm kiếm phải có ít nhất 2 ký tự",
      });
    }

    const provinces = await getProvincesData();
    const searchTerm = normalizeText(q.trim());

    const results = provinces
      .filter((province) => {
        const name = normalizeText(province.name);
        const codename = normalizeText(province.codename || "");
        return name.includes(searchTerm) || codename.includes(searchTerm);
      })
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      data: results,
      total: results.length,
      query: q,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi tìm kiếm tỉnh thành",
      error: error.message,
    });
  }
};

// 8. Tìm kiếm quận/huyện trong một tỉnh
exports.searchDistricts = async (req, res) => {
  try {
    const { q, province_code, limit = 10 } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Từ khóa tìm kiếm phải có ít nhất 2 ký tự",
      });
    }

    if (!province_code) {
      return res.status(400).json({
        success: false,
        message: "Cần cung cấp mã tỉnh (province_code)",
      });
    }

    const response = await axios.get(`${BASE_URL}/p/${province_code}?depth=2`);
    const districts = response.data.districts || [];

    const searchTerm = normalizeText(q.trim());

    const results = districts
      .filter((district) => {
        const name = normalizeText(district.name);
        const codename = normalizeText(district.codename || "");
        return name.includes(searchTerm) || codename.includes(searchTerm);
      })
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      data: results,
      total: results.length,
      query: q,
      province_code,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi tìm kiếm quận huyện",
      error: error.message,
    });
  }
};

// 9. Tìm kiếm xã/phường trong một quận/huyện
exports.searchWards = async (req, res) => {
  try {
    const { q, district_code, limit = 10 } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Từ khóa tìm kiếm phải có ít nhất 2 ký tự",
      });
    }

    if (!district_code) {
      return res.status(400).json({
        success: false,
        message: "Cần cung cấp mã quận huyện (district_code)",
      });
    }

    const response = await axios.get(`${BASE_URL}/d/${district_code}?depth=2`);
    const wards = response.data.wards || [];

    const searchTerm = normalizeText(q.trim());

    const results = wards
      .filter((ward) => {
        const name = normalizeText(ward.name);
        const codename = normalizeText(ward.codename || "");
        return name.includes(searchTerm) || codename.includes(searchTerm);
      })
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      data: results,
      total: results.length,
      query: q,
      district_code,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi tìm kiếm xã phường",
      error: error.message,
    });
  }
};
