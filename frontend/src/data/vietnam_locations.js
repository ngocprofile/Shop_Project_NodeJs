export const VIETNAM_LOCATIONS = [
    // =================================================================
    // TỈNH AN GIANG (MỚI SAU SÁP NHẬP)
    // Cấu trúc: Bỏ cấp Huyện, chỉ còn Xã/Phường/Đặc khu trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh An Giang",
        code: "91", // Mã tỉnh An Giang cũ (hoặc mã mới nếu có)
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI ---
            { name: "Xã An Phú", code: "AG_NEW_01" }, // (Từ TT An Phú, Vĩnh Hội Đông...)
            { name: "Xã Vĩnh Hậu", code: "AG_NEW_02" }, // (Từ TT Đa Phước, Vĩnh Trường...)
            { name: "Xã Nhơn Hội", code: "AG_NEW_03" },
            { name: "Xã Khánh Bình", code: "AG_NEW_04" }, // (Từ TT Long Bình...)
            { name: "Xã Phú Hữu", code: "AG_NEW_05" },
            { name: "Xã Tân An", code: "AG_NEW_06" },
            { name: "Xã Châu Phong", code: "AG_NEW_07" },
            { name: "Xã Vĩnh Xương", code: "AG_NEW_08" },
            { name: "Xã Phú Tân", code: "AG_NEW_09" },
            { name: "Xã Phú An", code: "AG_NEW_10" },
            { name: "Xã Bình Thạnh Đông", code: "AG_NEW_11" },
            { name: "Xã Chợ Vàm", code: "AG_NEW_12" },
            { name: "Xã Hòa Lạc", code: "AG_NEW_13" },
            { name: "Xã Phú Lâm", code: "AG_NEW_14" },
            { name: "Xã Châu Phú", code: "AG_NEW_15" },
            { name: "Xã Mỹ Đức", code: "AG_NEW_16" },
            { name: "Xã Vĩnh Thạnh Trung", code: "AG_NEW_17" },
            { name: "Xã Bình Mỹ", code: "AG_NEW_18" },
            { name: "Xã Thạnh Mỹ Tây", code: "AG_NEW_19" },
            { name: "Xã An Cư", code: "AG_NEW_20" },
            { name: "Xã Núi Cấm", code: "AG_NEW_21" },
            { name: "Xã Ba Chúc", code: "AG_NEW_22" },
            { name: "Xã Tri Tôn", code: "AG_NEW_23" },
            { name: "Xã Ô Lâm", code: "AG_NEW_24" },
            { name: "Xã Cô Tô", code: "AG_NEW_25" },
            { name: "Xã Vĩnh Gia", code: "AG_NEW_26" },
            { name: "Xã An Châu", code: "AG_NEW_27" },
            { name: "Xã Bình Hòa", code: "AG_NEW_28" },
            { name: "Xã Cần Đăng", code: "AG_NEW_29" },
            { name: "Xã Vĩnh Hanh", code: "AG_NEW_30" },
            { name: "Xã Vĩnh An", code: "AG_NEW_31" },
            { name: "Xã Chợ Mới", code: "AG_NEW_32" },
            { name: "Xã Cù Lao Giêng", code: "AG_NEW_33" },
            { name: "Xã Hội An", code: "AG_NEW_34" },
            { name: "Xã Long Điền", code: "AG_NEW_35" },
            { name: "Xã Nhơn Mỹ", code: "AG_NEW_36" },
            { name: "Xã Long Kiến", code: "AG_NEW_37" },
            { name: "Xã Thoại Sơn", code: "AG_NEW_38" },
            { name: "Xã Óc Eo", code: "AG_NEW_39" },
            { name: "Xã Định Mỹ", code: "AG_NEW_40" },
            { name: "Xã Phú Hòa", code: "AG_NEW_41" },
            { name: "Xã Vĩnh Trạch", code: "AG_NEW_42" },
            { name: "Xã Tây Phú", code: "AG_NEW_43" },
            { name: "Xã Vĩnh Bình", code: "AG_NEW_44" },
            { name: "Xã Vĩnh Thuận", code: "AG_NEW_45" },
            { name: "Xã Vĩnh Phong", code: "AG_NEW_46" },
            { name: "Xã Vĩnh Hòa", code: "AG_NEW_47" },
            { name: "Xã U Minh Thượng", code: "AG_NEW_48" },
            { name: "Xã Đông Hòa", code: "AG_NEW_49" },
            { name: "Xã Tân Thạnh", code: "AG_NEW_50" },
            { name: "Xã Đông Hưng", code: "AG_NEW_51" },
            { name: "Xã An Minh", code: "AG_NEW_52" },
            { name: "Xã Vân Khánh", code: "AG_NEW_53" },
            { name: "Xã Tây Yên", code: "AG_NEW_54" },
            { name: "Xã Đông Thái", code: "AG_NEW_55" },
            { name: "Xã An Biên", code: "AG_NEW_56" },
            { name: "Xã Định Hòa", code: "AG_NEW_57" },
            { name: "Xã Gò Quao", code: "AG_NEW_58" },
            { name: "Xã Vĩnh Hòa Hưng", code: "AG_NEW_59" },
            { name: "Xã Vĩnh Tuy", code: "AG_NEW_60" },
            { name: "Xã Giồng Riềng", code: "AG_NEW_61" },
            { name: "Xã Thạnh Hưng", code: "AG_NEW_62" },
            { name: "Xã Long Thạnh", code: "AG_NEW_63" },
            { name: "Xã Hòa Hưng", code: "AG_NEW_64" },
            { name: "Xã Ngọc Chúc", code: "AG_NEW_65" },
            { name: "Xã Hòa Thuận", code: "AG_NEW_66" },
            { name: "Xã Tân Hội", code: "AG_NEW_67" },
            { name: "Xã Tân Hiệp", code: "AG_NEW_68" },
            { name: "Xã Thạnh Đông", code: "AG_NEW_69" },
            { name: "Xã Thạnh Lộc", code: "AG_NEW_70" },
            { name: "Xã Châu Thành", code: "AG_NEW_71" },
            { name: "Xã Bình An", code: "AG_NEW_72" },
            { name: "Xã Hòn Đất", code: "AG_NEW_73" },
            { name: "Xã Sơn Kiên", code: "AG_NEW_74" },
            { name: "Xã Mỹ Thuận", code: "AG_NEW_75" },
            { name: "Xã Hòa Điền", code: "AG_NEW_76" },
            { name: "Xã Kiên Lương", code: "AG_NEW_77" },
            { name: "Xã Giang Thành", code: "AG_NEW_78" },
            { name: "Xã Vĩnh Điều", code: "AG_NEW_79" },

            // --- NHÓM PHƯỜNG MỚI ---
            { name: "Phường Long Xuyên", code: "AG_NEW_80" }, // (Gộp Mỹ Bình, Mỹ Long...)
            { name: "Phường Bình Đức", code: "AG_NEW_81" },
            { name: "Phường Mỹ Thới", code: "AG_NEW_82" },
            { name: "Phường Châu Đốc", code: "AG_NEW_83" },
            { name: "Phường Vĩnh Tế", code: "AG_NEW_84" },
            { name: "Phường Tân Châu", code: "AG_NEW_85" },
            { name: "Phường Long Phú", code: "AG_NEW_86" },
            { name: "Phường Tịnh Biên", code: "AG_NEW_87" },
            { name: "Phường Thới Sơn", code: "AG_NEW_88" },
            { name: "Phường Chi Lăng", code: "AG_NEW_89" },
            { name: "Phường Vĩnh Thông", code: "AG_NEW_90" },
            { name: "Phường Rạch Giá", code: "AG_NEW_91" }, // (Gộp Vĩnh Quang, Vĩnh Thanh...)
            { name: "Phường Hà Tiên", code: "AG_NEW_92" },
            { name: "Phường Tô Châu", code: "AG_NEW_93" },

            // --- NHÓM ĐẶC KHU ---
            { name: "Đặc khu Kiên Hải", code: "AG_NEW_94" },
            { name: "Đặc khu Phú Quốc", code: "AG_NEW_95" },
            { name: "Đặc khu Thổ Châu", code: "AG_NEW_96" },

            // --- CÁC XÃ GIỮ NGUYÊN (Không sắp xếp) ---
            { name: "Xã Mỹ Hòa Hưng", code: "AG_OLD_01" },
            { name: "Xã Bình Giang", code: "AG_OLD_02" },
            { name: "Xã Bình Sơn", code: "AG_OLD_03" },
            { name: "Xã Hòn Nghệ", code: "AG_OLD_04" },
            { name: "Xã Sơn Hải", code: "AG_OLD_05" },
            { name: "Xã Tiên Hải", code: "AG_OLD_06" }
        ]
    },

    // =================================================================
    // TỈNH BẮC NINH (MỚI - SÁP NHẬP BẮC NINH & BẮC GIANG)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Bắc Ninh",
        code: "24", // Mã tỉnh Bắc Ninh cũ (hoặc mã mới nếu có)
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC BẮC NINH CŨ) ---
            { name: "Xã Chi Lăng", code: "BN_NEW_01" }, // (Từ Yên Giả, Chi Lăng)
            { name: "Xã Phù Lãng", code: "BN_NEW_02" }, // (Từ Châu Phong, Đức Long, Phù Lãng)
            { name: "Xã Yên Phong", code: "BN_NEW_03" }, // (Từ TT Chờ, Trung Nghĩa...)
            { name: "Xã Văn Môn", code: "BN_NEW_04" },
            { name: "Xã Tam Giang", code: "BN_NEW_05" },
            { name: "Xã Yên Trung", code: "BN_NEW_06" },
            { name: "Xã Tam Đa", code: "BN_NEW_07" },
            { name: "Xã Tiên Du", code: "BN_NEW_08" }, // (Từ TT Lim, Nội Duệ...)
            { name: "Xã Liên Bão", code: "BN_NEW_09" },
            { name: "Xã Tân Chi", code: "BN_NEW_10" },
            { name: "Xã Đại Đồng", code: "BN_NEW_11" },
            { name: "Xã Phật Tích", code: "BN_NEW_12" },
            { name: "Xã Gia Bình", code: "BN_NEW_13" },
            { name: "Xã Nhân Thắng", code: "BN_NEW_14" },
            { name: "Xã Đại Lai", code: "BN_NEW_15" },
            { name: "Xã Cao Đức", code: "BN_NEW_16" },
            { name: "Xã Đông Cứu", code: "BN_NEW_17" },
            { name: "Xã Lương Tài", code: "BN_NEW_18" },
            { name: "Xã Lâm Thao", code: "BN_NEW_19" },
            { name: "Xã Trung Chính", code: "BN_NEW_20" },
            { name: "Xã Trung Kênh", code: "BN_NEW_21" },
            { name: "Xã Đại Sơn", code: "BN_NEW_22" },

            // --- NHÓM XÃ MỚI (KHU VỰC BẮC GIANG CŨ) ---
            { name: "Xã Sơn Động", code: "BN_NEW_23" }, // (Từ TT An Châu...)
            { name: "Xã Tây Yên Tử", code: "BN_NEW_24" },
            { name: "Xã Dương Hưu", code: "BN_NEW_25" },
            { name: "Xã Yên Định", code: "BN_NEW_26" },
            { name: "Xã An Lạc", code: "BN_NEW_27" },
            { name: "Xã Vân Sơn", code: "BN_NEW_28" },
            { name: "Xã Biển Động", code: "BN_NEW_29" },
            { name: "Xã Lục Ngạn", code: "BN_NEW_30" }, // (Từ TT Phì Điền...)
            { name: "Xã Đèo Gia", code: "BN_NEW_31" },
            { name: "Xã Sơn Hải", code: "BN_NEW_32" },
            { name: "Xã Tân Sơn", code: "BN_NEW_33" },
            { name: "Xã Biên Sơn", code: "BN_NEW_34" },
            { name: "Xã Sa Lý", code: "BN_NEW_35" },
            { name: "Xã Nam Dương", code: "BN_NEW_36" },
            { name: "Xã Kiên Lao", code: "BN_NEW_37" },
            { name: "Xã Lục Sơn", code: "BN_NEW_38" },
            { name: "Xã Trường Sơn", code: "BN_NEW_39" },
            { name: "Xã Cẩm Lý", code: "BN_NEW_40" },
            { name: "Xã Đông Phú", code: "BN_NEW_41" },
            { name: "Xã Nghĩa Phương", code: "BN_NEW_42" },
            { name: "Xã Lục Nam", code: "BN_NEW_43" },
            { name: "Xã Bắc Lũng", code: "BN_NEW_44" },
            { name: "Xã Bảo Đài", code: "BN_NEW_45" },
            { name: "Xã Lạng Giang", code: "BN_NEW_46" },
            { name: "Xã Mỹ Thái", code: "BN_NEW_47" },
            { name: "Xã Kép", code: "BN_NEW_48" },
            { name: "Xã Tân Dĩnh", code: "BN_NEW_49" },
            { name: "Xã Tiên Lục", code: "BN_NEW_50" },
            { name: "Xã Yên Thế", code: "BN_NEW_51" },
            { name: "Xã Bố Hạ", code: "BN_NEW_52" },
            { name: "Xã Đồng Kỳ", code: "BN_NEW_53" },
            { name: "Xã Xuân Lương", code: "BN_NEW_54" },
            { name: "Xã Tam Tiến", code: "BN_NEW_55" },
            { name: "Xã Tân Yên", code: "BN_NEW_56" },
            { name: "Xã Ngọc Thiện", code: "BN_NEW_57" },
            { name: "Xã Nhã Nam", code: "BN_NEW_58" },
            { name: "Xã Phúc Hoà", code: "BN_NEW_59" },
            { name: "Xã Quang Trung", code: "BN_NEW_60" },
            { name: "Xã Hợp Thịnh", code: "BN_NEW_61" },
            { name: "Xã Hiệp Hòa", code: "BN_NEW_62" },
            { name: "Xã Hoàng Vân", code: "BN_NEW_63" },
            { name: "Xã Đồng Việt", code: "BN_NEW_64" },
            { name: "Xã Xuân Cẩm", code: "BN_NEW_65" },
            { name: "Xã Tuấn Đạo", code: "BN_OLD_01" }, // Xã giữ nguyên

            // --- NHÓM PHƯỜNG MỚI (KHU VỰC TP BẮC NINH, TỪ SƠN, THUẬN THÀNH, QUẾ VÕ) ---
            { name: "Phường Kinh Bắc", code: "BN_NEW_66" },
            { name: "Phường Võ Cường", code: "BN_NEW_67" },
            { name: "Phường Vũ Ninh", code: "BN_NEW_68" },
            { name: "Phường Hạp Lĩnh", code: "BN_NEW_69" },
            { name: "Phường Nam Sơn", code: "BN_NEW_70" },
            { name: "Phường Từ Sơn", code: "BN_NEW_71" },
            { name: "Phường Tam Sơn", code: "BN_NEW_72" },
            { name: "Phường Đồng Nguyên", code: "BN_NEW_73" },
            { name: "Phường Phù Khê", code: "BN_NEW_74" },
            { name: "Phường Thuận Thành", code: "BN_NEW_75" },
            { name: "Phường Mão Điền", code: "BN_NEW_76" },
            { name: "Phường Trạm Lộ", code: "BN_NEW_77" },
            { name: "Phường Trí Quả", code: "BN_NEW_78" },
            { name: "Phường Song Liễu", code: "BN_NEW_79" },
            { name: "Phường Ninh Xá", code: "BN_NEW_80" },
            { name: "Phường Quế Võ", code: "BN_NEW_81" },
            { name: "Phường Phương Liễu", code: "BN_NEW_82" },
            { name: "Phường Nhân Hòa", code: "BN_NEW_83" },
            { name: "Phường Đào Viên", code: "BN_NEW_84" },
            { name: "Phường Bồng Lai", code: "BN_NEW_85" },

            // --- NHÓM PHƯỜNG MỚI (KHU VỰC TP BẮC GIANG, VIỆT YÊN, YÊN DŨNG) ---
            { name: "Phường Chũ", code: "BN_NEW_86" },
            { name: "Phường Phượng Sơn", code: "BN_NEW_87" },
            { name: "Phường Tự Lạn", code: "BN_NEW_88" },
            { name: "Phường Việt Yên", code: "BN_NEW_89" },
            { name: "Phường Nếnh", code: "BN_NEW_90" },
            { name: "Phường Vân Hà", code: "BN_NEW_91" },
            { name: "Phường Bắc Giang", code: "BN_NEW_92" },
            { name: "Phường Đa Mai", code: "BN_NEW_93" },
            { name: "Phường Tiền Phong", code: "BN_NEW_94" },
            { name: "Phường Tân An", code: "BN_NEW_95" },
            { name: "Phường Yên Dũng", code: "BN_NEW_96" },
            { name: "Phường Tân Tiến", code: "BN_NEW_97" },
            { name: "Phường Cảnh Thụy", code: "BN_NEW_98" }
        ]
    },

    // =================================================================
    // TỈNH CÀ MAU (MỚI - BAO GỒM CẢ KHU VỰC BẠC LIÊU CŨ)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Cà Mau",
        code: "96", // Mã tỉnh Cà Mau cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC CÀ MAU CŨ) ---
            { name: "Xã Tân Thuận", code: "CM_NEW_01" }, // (Từ Tân Đức, Tân Thuận)
            { name: "Xã Tân Tiến", code: "CM_NEW_02" }, // (Từ Nguyễn Huân, Tân Tiến)
            { name: "Xã Tạ An Khương", code: "CM_NEW_03" },
            { name: "Xã Trần Phán", code: "CM_NEW_04" },
            { name: "Xã Thanh Tùng", code: "CM_NEW_05" },
            { name: "Xã Đầm Dơi", code: "CM_NEW_06" }, // (Từ TT Đầm Dơi...)
            { name: "Xã Quách Phẩm", code: "CM_NEW_07" },
            { name: "Xã U Minh", code: "CM_NEW_08" },
            { name: "Xã Nguyễn Phích", code: "CM_NEW_09" }, // (Từ TT U Minh...)
            { name: "Xã Khánh Lâm", code: "CM_NEW_10" },
            { name: "Xã Khánh An", code: "CM_NEW_11" },
            { name: "Xã Phan Ngọc Hiển", code: "CM_NEW_12" }, // (Từ TT Rạch Gốc...)
            { name: "Xã Đất Mũi", code: "CM_NEW_13" },
            { name: "Xã Tân Ân", code: "CM_NEW_14" },
            { name: "Xã Khánh Bình", code: "CM_NEW_15" },
            { name: "Xã Đá Bạc", code: "CM_NEW_16" }, // (Từ Khánh Bình Tây...)
            { name: "Xã Khánh Hưng", code: "CM_NEW_17" },
            { name: "Xã Sông Đốc", code: "CM_NEW_18" }, // (Từ TT Sông Đốc...)
            { name: "Xã Trần Văn Thời", code: "CM_NEW_19" }, // (Từ TT Trần Văn Thời...)
            { name: "Xã Thới Bình", code: "CM_NEW_20" }, // (Từ TT Thới Bình...)
            { name: "Xã Trí Phải", code: "CM_NEW_21" },
            { name: "Xã Tân Lộc", code: "CM_NEW_22" },
            { name: "Xã Biển Bạch", code: "CM_NEW_23" },
            { name: "Xã Đất Mới", code: "CM_NEW_24" },
            { name: "Xã Năm Căn", code: "CM_NEW_25" }, // (Từ TT Năm Căn...)
            { name: "Xã Tam Giang", code: "CM_NEW_26" },
            { name: "Xã Cái Đôi Vàm", code: "CM_NEW_27" }, // (Từ TT Cái Đôi Vàm...)
            { name: "Xã Nguyễn Việt Khái", code: "CM_NEW_28" },
            { name: "Xã Phú Tân", code: "CM_NEW_29" },
            { name: "Xã Phú Mỹ", code: "CM_NEW_30" },
            { name: "Xã Lương Thế Trân", code: "CM_NEW_31" },
            { name: "Xã Tân Hưng", code: "CM_NEW_32" },
            { name: "Xã Hưng Mỹ", code: "CM_NEW_33" },
            { name: "Xã Cái Nước", code: "CM_NEW_34" }, // (Từ TT Cái Nước...)
            { name: "Xã Phong Thạnh", code: "CM_NEW_35" },

            // --- NHÓM XÃ MỚI (KHU VỰC BẠC LIÊU CŨ - THEO VĂN BẢN) ---
            { name: "Xã Hồng Dân", code: "CM_NEW_36" }, // (Từ TT Ngan Dừa...)
            { name: "Xã Vĩnh Lộc", code: "CM_NEW_37" },
            { name: "Xã Ninh Thạnh Lợi", code: "CM_NEW_38" },
            { name: "Xã Ninh Quới", code: "CM_NEW_39" },
            { name: "Xã Gành Hào", code: "CM_NEW_40" }, // (Từ TT Gành Hào...)
            { name: "Xã Định Thành", code: "CM_NEW_41" },
            { name: "Xã An Trạch", code: "CM_NEW_42" },
            { name: "Xã Long Điền", code: "CM_NEW_43" },
            { name: "Xã Đông Hải", code: "CM_NEW_44" },
            { name: "Xã Hoà Bình", code: "CM_NEW_45" }, // (Từ TT Hòa Bình...)
            { name: "Xã Vĩnh Mỹ", code: "CM_NEW_46" },
            { name: "Xã Vĩnh Hậu (BL)", code: "CM_NEW_47" }, // (Trùng tên Vĩnh Hậu ở trên, thêm suffix để phân biệt nếu cần)
            { name: "Xã Phước Long", code: "CM_NEW_48" }, // (Từ TT Phước Long...)
            { name: "Xã Vĩnh Phước", code: "CM_NEW_49" },
            { name: "Xã Phong Hiệp", code: "CM_NEW_50" },
            { name: "Xã Vĩnh Thanh", code: "CM_NEW_51" },
            { name: "Xã Vĩnh Lợi", code: "CM_NEW_52" }, // (Từ TT Châu Hưng...)
            { name: "Xã Hưng Hội", code: "CM_NEW_53" },
            { name: "Xã Châu Thới", code: "CM_NEW_54" },

            // --- NHÓM PHƯỜNG MỚI ---
            { name: "Phường Bạc Liêu", code: "CM_NEW_55" }, // (Từ P1, P2, P3, P7, P8 TP Bạc Liêu)
            { name: "Phường Vĩnh Trạch", code: "CM_NEW_56" },
            { name: "Phường Hiệp Thành", code: "CM_NEW_57" },
            { name: "Phường Giá Rai", code: "CM_NEW_58" }, // (Từ P1 TX Giá Rai...)
            { name: "Phường Láng Tròn", code: "CM_NEW_59" },
            { name: "Phường An Xuyên", code: "CM_NEW_60" }, // (Từ P1, P2 TP Cà Mau...)
            { name: "Phường Lý Văn Lâm", code: "CM_NEW_61" }, // (Từ P8 TP Cà Mau...)
            { name: "Phường Tân Thành", code: "CM_NEW_62" }, // (Từ P5, P6, P7 TP Cà Mau...)
            { name: "Phường Hoà Thành", code: "CM_NEW_63" }, // (Từ Hòa Tân, Hòa Thành...)

            // --- XÃ GIỮ NGUYÊN ---
            { name: "Xã Hồ Thị Kỷ", code: "CM_OLD_01" } // (Văn bản ghi Hồ Thị Kỷ, bạn ghi Hồ Thị L?)
        ]
    },

    // =================================================================
    // THÀNH PHỐ CẦN THƠ (MỚI - SÁP NHẬP CẦN THƠ + HẬU GIANG + SÓC TRĂNG)
    // Cấu trúc: Bỏ cấp Quận/Huyện, Phường/Xã trực thuộc Thành phố
    // =================================================================
    {
        name: "Thành phố Cần Thơ",
        code: "92", // Mã TP Cần Thơ cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn TP -> Chọn Phường/Xã luôn
        wards: [
            // --- NHÓM PHƯỜNG MỚI (KHU VỰC CẦN THƠ CŨ) ---
            { name: "Phường Ninh Kiều", code: "CT_NEW_01" }, // (Từ Tân An, Thới Bình, Xuân Khánh)
            { name: "Phường Cái Khế", code: "CT_NEW_02" }, // (Từ An Hòa, Cái Khế...)
            { name: "Phường Tân An", code: "CT_NEW_03" }, // (Từ An Khánh, Hưng Lợi)
            { name: "Phường An Bình", code: "CT_NEW_04" }, // (Từ An Bình, Mỹ Khánh...)
            { name: "Phường Thới An Đông", code: "CT_NEW_05" }, // (Từ Trà An, Trà Nóc...)
            { name: "Phường Bình Thủy", code: "CT_NEW_06" },
            { name: "Phường Long Tuyền", code: "CT_NEW_07" },
            { name: "Phường Cái Răng", code: "CT_NEW_08" }, // (Từ Lê Bình, Thường Thạnh...)
            { name: "Phường Hưng Phú", code: "CT_NEW_09" },
            { name: "Phường Ô Môn", code: "CT_NEW_10" }, // (Từ Châu Văn Liêm...)
            { name: "Phường Phước Thới", code: "CT_NEW_11" },
            { name: "Phường Thới Long", code: "CT_NEW_12" },
            { name: "Phường Trung Nhứt", code: "CT_NEW_13" },
            { name: "Phường Thuận Hưng", code: "CT_NEW_14" },
            { name: "Phường Thốt Nốt", code: "CT_NEW_15" },

            // --- NHÓM PHƯỜNG MỚI (KHU VỰC HẬU GIANG CŨ) ---
            { name: "Phường Vị Thanh", code: "CT_NEW_16" }, // (Từ P1, P3, P7 Vị Thanh)
            { name: "Phường Vị Tân", code: "CT_NEW_17" },
            { name: "Phường Long Bình", code: "CT_NEW_18" }, // (Từ Bình Thạnh, Vĩnh Tường TX Long Mỹ)
            { name: "Phường Long Mỹ", code: "CT_NEW_19" },
            { name: "Phường Long Phú 1", code: "CT_NEW_20" }, // (Từ Trà Lồng...)
            { name: "Phường Đại Thành", code: "CT_NEW_21" },
            { name: "Phường Ngã Bảy", code: "CT_NEW_22" },

            // --- NHÓM PHƯỜNG MỚI (KHU VỰC SÓC TRĂNG CŨ) ---
            { name: "Phường Phú Lợi", code: "CT_NEW_23" }, // (Từ P1, P2, P3, P4 TP Sóc Trăng)
            { name: "Phường Sóc Trăng", code: "CT_NEW_24" }, // (Từ P5, P6, P7, P8)
            { name: "Phường Mỹ Xuyên", code: "CT_NEW_25" },
            { name: "Phường Vĩnh Phước", code: "CT_NEW_26" },
            { name: "Phường Vĩnh Châu", code: "CT_NEW_27" },
            { name: "Phường Khánh Hòa", code: "CT_NEW_28" },
            { name: "Phường Ngã Năm", code: "CT_NEW_29" },
            { name: "Phường Mỹ Quới", code: "CT_NEW_30" },

            // --- NHÓM XÃ MỚI (CẦN THƠ + HẬU GIANG + SÓC TRĂNG) ---
            { name: "Xã Phong Điền", code: "CT_NEW_31" },
            { name: "Xã Nhơn Ái", code: "CT_NEW_32" },
            { name: "Xã Thới Lai", code: "CT_NEW_33" },
            { name: "Xã Đông Thuận", code: "CT_NEW_34" },
            { name: "Xã Trường Xuân", code: "CT_NEW_35" },
            { name: "Xã Trường Thành", code: "CT_NEW_36" },
            { name: "Xã Cờ Đỏ", code: "CT_NEW_37" },
            { name: "Xã Đông Hiệp", code: "CT_NEW_38" },
            { name: "Xã Trung Hưng", code: "CT_NEW_39" },
            { name: "Xã Vĩnh Thạnh", code: "CT_NEW_40" },
            { name: "Xã Vĩnh Trinh", code: "CT_NEW_41" },
            { name: "Xã Thạnh An", code: "CT_NEW_42" },
            { name: "Xã Thạnh Quới", code: "CT_NEW_43" },
            { name: "Xã Hỏa Lựu", code: "CT_NEW_44" },
            { name: "Xã Vị Thủy", code: "CT_NEW_45" },
            { name: "Xã Vĩnh Thuận Đông", code: "CT_NEW_46" },
            { name: "Xã Vị Thanh 1", code: "CT_NEW_47" }, // (Trùng tên Phường Vị Thanh -> thêm số 1 để phân biệt nếu cần)
            { name: "Xã Vĩnh Tường", code: "CT_NEW_48" },
            { name: "Xã Vĩnh Viễn", code: "CT_NEW_49" },
            { name: "Xã Xà Phiên", code: "CT_NEW_50" },
            { name: "Xã Lương Tâm", code: "CT_NEW_51" },
            { name: "Xã Thạnh Xuân", code: "CT_NEW_52" },
            { name: "Xã Tân Hòa", code: "CT_NEW_53" },
            { name: "Xã Trường Long Tây", code: "CT_NEW_54" },
            { name: "Xã Châu Thành", code: "CT_NEW_55" }, // (Từ TT Mái Dầm...)
            { name: "Xã Đông Phước", code: "CT_NEW_56" },
            { name: "Xã Phú Hữu", code: "CT_NEW_57" },
            { name: "Xã Tân Bình", code: "CT_NEW_58" },
            { name: "Xã Hòa An", code: "CT_NEW_59" },
            { name: "Xã Phương Bình", code: "CT_NEW_60" },
            { name: "Xã Tân Phước Hưng", code: "CT_NEW_61" },
            { name: "Xã Hiệp Hưng", code: "CT_NEW_62" },
            { name: "Xã Phụng Hiệp", code: "CT_NEW_63" },
            { name: "Xã Thạnh Hòa", code: "CT_NEW_64" },
            { name: "Xã Hòa Tú", code: "CT_NEW_65" },
            { name: "Xã Gia Hòa", code: "CT_NEW_66" },
            { name: "Xã Nhu Gia", code: "CT_NEW_67" },
            { name: "Xã Ngọc Tố", code: "CT_NEW_68" },
            { name: "Xã Trường Khánh", code: "CT_NEW_69" },
            { name: "Xã Đại Ngãi", code: "CT_NEW_70" },
            { name: "Xã Tân Thạnh", code: "CT_NEW_71" },
            { name: "Xã Long Phú", code: "CT_NEW_72" },
            { name: "Xã Nhơn Mỹ", code: "CT_NEW_73" },
            { name: "Xã An Lạc Thôn", code: "CT_NEW_74" },
            { name: "Xã Kế Sách", code: "CT_NEW_75" },
            { name: "Xã Thới An Hội", code: "CT_NEW_76" },
            { name: "Xã Đại Hải", code: "CT_NEW_77" },
            { name: "Xã Phú Tâm", code: "CT_NEW_78" },
            { name: "Xã An Ninh", code: "CT_NEW_79" },
            { name: "Xã Thuận Hòa", code: "CT_NEW_80" },
            { name: "Xã Hồ Đắc Kiện", code: "CT_NEW_81" },
            { name: "Xã Mỹ Tú", code: "CT_NEW_82" },
            { name: "Xã Long Hưng", code: "CT_NEW_83" },
            { name: "Xã Mỹ Hương", code: "CT_NEW_84" },
            { name: "Xã Tân Long", code: "CT_NEW_85" },
            { name: "Xã Phú Lộc", code: "CT_NEW_86" },
            { name: "Xã Vĩnh Lợi", code: "CT_NEW_87" },
            { name: "Xã Lâm Tân", code: "CT_NEW_88" },
            { name: "Xã Thạnh Thới An", code: "CT_NEW_89" },
            { name: "Xã Tài Văn", code: "CT_NEW_90" },
            { name: "Xã Liêu Tú", code: "CT_NEW_91" },
            { name: "Xã Lịch Hội Thượng", code: "CT_NEW_92" },
            { name: "Xã Trần Đề", code: "CT_NEW_93" },
            { name: "Xã An Thạnh", code: "CT_NEW_94" },
            { name: "Xã Cù Lao Dung", code: "CT_NEW_95" },

            // --- XÃ/PHƯỜNG GIỮ NGUYÊN ---
            { name: "Phường Tân Lộc", code: "CT_OLD_01" },
            { name: "Xã Trường Long", code: "CT_OLD_02" },
            { name: "Xã Thạnh Phú", code: "CT_OLD_03" },
            { name: "Xã Thới Hưng", code: "CT_OLD_04" },
            { name: "Xã Phong Nẫm", code: "CT_OLD_05" },
            { name: "Xã Mỹ Phước", code: "CT_OLD_06" },
            { name: "Xã Lai Hòa", code: "CT_OLD_07" },
            { name: "Xã Vĩnh Hải", code: "CT_OLD_08" }
        ]
    },

    // =================================================================
    // TỈNH CAO BẰNG (MỚI SAU SÁP NHẬP)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh (Theo mô hình bạn yêu cầu)
    // =================================================================
    {
        name: "Tỉnh Cao Bằng",
        code: "04", // Mã tỉnh Cao Bằng cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI ---
            { name: "Xã Quảng Lâm", code: "CB_NEW_01" }, // (Từ Thạch Lâm, Quảng Lâm)
            { name: "Xã Nam Quang", code: "CB_NEW_02" }, // (Từ Nam Cao, Nam Quang)
            { name: "Xã Lý Bôn", code: "CB_NEW_03" }, // (Từ Vĩnh Quang, Lý Bôn)
            { name: "Xã Bảo Lâm", code: "CB_NEW_04" }, // (Từ TT Pác Miầu, Mông Ân, Vĩnh Phong)
            { name: "Xã Yên Thổ", code: "CB_NEW_05" }, // (Từ Thái Học, Thái Sơn, Yên Thổ)
            { name: "Xã Sơn Lộ", code: "CB_NEW_06" }, // (Từ Sơn Lập, Sơn Lộ)
            { name: "Xã Hưng Đạo", code: "CB_NEW_07" }, // (Từ Hưng Thịnh, Kim Cúc, Hưng Đạo)
            { name: "Xã Bảo Lạc", code: "CB_NEW_08" }, // (Từ TT Bảo Lạc, Bảo Toàn, Hồng Trị)
            { name: "Xã Cốc Pàng", code: "CB_NEW_09" }, // (Từ Đức Hạnh, Cốc Pàng)
            { name: "Xã Cô Ba", code: "CB_NEW_10" }, // (Từ Thượng Hà, Cô Ba)
            { name: "Xã Khánh Xuân", code: "CB_NEW_11" }, // (Từ Phan Thanh, Khánh Xuân)
            { name: "Xã Xuân Trường", code: "CB_NEW_12" }, // (Từ Hồng An, Xuân Trường)
            { name: "Xã Huy Giáp", code: "CB_NEW_13" }, // (Từ Đình Phùng, Huy Giáp)
            { name: "Xã Ca Thành", code: "CB_NEW_14" }, // (Từ Yên Lạc, Ca Thành)
            { name: "Xã Phan Thanh", code: "CB_NEW_15" }, // (Từ Phan Thanh, Mai Long)
            { name: "Xã Thành Công", code: "CB_NEW_16" }, // (Từ Quang Thành, Thành Công)
            { name: "Xã Tam Kim", code: "CB_NEW_17" }, // (Từ Hưng Đạo, Hoa Thám, Tam Kim)
            { name: "Xã Nguyên Bình", code: "CB_NEW_18" }, // (Từ TT Nguyên Bình, Thể Dục, Vũ Minh)
            { name: "Xã Tĩnh Túc", code: "CB_NEW_19" }, // (Từ TT Tĩnh Túc, Triệu Nguyên, Vũ Nông)
            { name: "Xã Minh Tâm", code: "CB_NEW_20" }, // (Từ Trương Lương, Minh Tâm)
            { name: "Xã Thanh Long", code: "CB_NEW_21" }, // (Từ Ngọc Động, Yên Sơn, Thanh Long)
            { name: "Xã Cần Yên", code: "CB_NEW_22" }, // (Từ Cần Nông, Lương Thông, Cần Yên)
            { name: "Xã Thông Nông", code: "CB_NEW_23" }, // (Từ TT Thông Nông, Đa Thông, Lương Can)
            { name: "Xã Trường Hà", code: "CB_NEW_24" }, // (Từ TT Xuân Hòa, Quý Quân, Sóc Hà, Trường Hà)
            { name: "Xã Hà Quảng", code: "CB_NEW_25" }, // (Từ Hồng Sỹ, Ngọc Đào, Mã Ba)
            { name: "Xã Lũng Nặm", code: "CB_NEW_26" }, // (Từ Thượng Thôn, Lũng Nặm)
            { name: "Xã Tổng Cọt", code: "CB_NEW_27" }, // (Từ Nội Thôn, Cải Viên, Tổng Cọt)
            { name: "Xã Nam Tuấn", code: "CB_NEW_28" }, // (Từ Đức Long, Dân Chủ, Nam Tuấn)
            { name: "Xã Hòa An", code: "CB_NEW_29" }, // (Từ TT Nước Hai, Đại Tiến, Hồng Việt)
            { name: "Xã Bạch Đằng", code: "CB_NEW_30" }, // (Từ Thịnh Vượng, Bình Dương, Bạch Đằng)
            { name: "Xã Nguyễn Huệ", code: "CB_NEW_31" }, // (Từ Quang Trung, Ngũ Lão, Nguyễn Huệ)
            { name: "Xã Minh Khai", code: "CB_NEW_32" }, // (Từ Quang Trọng, Minh Khai)
            { name: "Xã Canh Tân", code: "CB_NEW_33" }, // (Từ Đức Thông, Canh Tân)
            { name: "Xã Kim Đồng", code: "CB_NEW_34" }, // (Từ Hồng Nam, Thái Cường, Kim Đồng)
            { name: "Xã Thạch An", code: "CB_NEW_35" }, // (Từ Tiên Thành, Vân Trình, Lê Lai)
            { name: "Xã Đông Khê", code: "CB_NEW_36" }, // (Từ TT Đông Khê, Đức Xuân, Trọng Con)
            { name: "Xã Đức Long", code: "CB_NEW_37" }, // (Từ Đức Long, Thụy Hùng, Lê Lợi)
            { name: "Xã Phục Hòa", code: "CB_NEW_38" }, // (Từ TT Tà Lùng, TT Hòa Thuận, Mỹ Hưng, Đại Sơn)
            { name: "Xã Bế Văn Đàn", code: "CB_NEW_39" }, // (Từ Hồng Quang, Cách Linh, Bế Văn Đàn)
            { name: "Xã Độc Lập", code: "CB_NEW_40" }, // (Từ Quảng Hưng, Cai Bộ, Độc Lập)
            { name: "Xã Quảng Uyên", code: "CB_NEW_41" }, // (Từ TT Quảng Uyên, Phi Hải, Phúc Sen, Chí Thảo)
            { name: "Xã Hạnh Phúc", code: "CB_NEW_42" }, // (Từ Ngọc Động, Tự Do, Hạnh Phúc)
            { name: "Xã Quang Hán", code: "CB_NEW_43" }, // (Từ Quang Vinh, Quang Hán)
            { name: "Xã Trà Lĩnh", code: "CB_NEW_44" }, // (Từ TT Trà Lĩnh, Cao Chương, Quốc Toản)
            { name: "Xã Quang Trung", code: "CB_NEW_45" }, // (Từ Quang Trung, Tri Phương, Xuân Nội)
            { name: "Xã Đoài Dương", code: "CB_NEW_46" }, // (Từ Trung Phúc, Cao Thăng, Đoài Dương)
            { name: "Xã Trùng Khánh", code: "CB_NEW_47" }, // (Từ TT Trùng Khánh, Đức Hồng, Lăng Hiếu, Khâm Thành)
            { name: "Xã Đàm Thủy", code: "CB_NEW_48" }, // (Từ Chí Viễn, Phong Châu, Đàm Thủy)
            { name: "Xã Đình Phong", code: "CB_NEW_49" }, // (Từ Ngọc Côn, Ngọc Khê, Phong Nặm, Đình Phong)
            { name: "Xã Hạ Lang", code: "CB_NEW_50" }, // (Từ TT Thanh Nhật, Thống Nhất, Thị Hoa)
            { name: "Xã Lý Quốc", code: "CB_NEW_51" }, // (Từ Minh Long, Đồng Loan, Lý Quốc)
            { name: "Xã Vinh Quý", code: "CB_NEW_52" }, // (Từ Cô Ngân, An Lạc, Kim Loan, Vinh Quý)
            { name: "Xã Quang Long", code: "CB_NEW_53" }, // (Từ Đức Quang, Thắng Lợi, Quang Long)

            // --- NHÓM PHƯỜNG MỚI (THÀNH PHỐ CAO BẰNG) ---
            { name: "Phường Thục Phán", code: "CB_NEW_54" }, // (Từ Sông Hiến, Đề Thám, Hợp Giang...)
            { name: "Phường Nùng Trí Cao", code: "CB_NEW_55" }, // (Từ Ngọc Xuân, Sông Bằng, Vĩnh Quang)
            { name: "Phường Tân Giang", code: "CB_NEW_56" } // (Từ Tân Giang, Duyệt Trung, Hòa Chung...)
        ]
    },

    // =================================================================
    // THÀNH PHỐ ĐÀ NẴNG (MỚI - SÁP NHẬP ĐÀ NẴNG + QUẢNG NAM)
    // Cấu trúc: Bỏ cấp Quận/Huyện, Phường/Xã trực thuộc Thành phố
    // =================================================================
    {
        name: "Thành phố Đà Nẵng",
        code: "48", // Mã TP Đà Nẵng cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn TP -> Chọn Phường/Xã luôn
        wards: [
            // --- NHÓM PHƯỜNG MỚI (KHU VỰC ĐÀ NẴNG CŨ) ---
            { name: "Phường Hải Châu", code: "DN_NEW_01" }, // (Từ Thanh Bình, Thuận Phước...)
            { name: "Phường Hòa Cường", code: "DN_NEW_02" }, // (Từ Bình Thuận, Hòa Thuận Tây...)
            { name: "Phường Thanh Khê", code: "DN_NEW_03" }, // (Từ Xuân Hà, Chính Gián...)
            { name: "Phường An Khê", code: "DN_NEW_04" }, // (Từ Hòa An, Hòa Phát...)
            { name: "Phường An Hải", code: "DN_NEW_05" }, // (Từ Phước Mỹ, An Hải Bắc...)
            { name: "Phường Sơn Trà", code: "DN_NEW_06" }, // (Từ Thọ Quang, Nại Hiên Đông...)
            { name: "Phường Ngũ Hành Sơn", code: "DN_NEW_07" }, // (Từ Mỹ An, Khuê Mỹ...)
            { name: "Phường Hòa Khánh", code: "DN_NEW_08" }, // (Từ Hòa Khánh Nam, Hòa Minh...)
            { name: "Phường Hải Vân", code: "DN_NEW_09" }, // (Từ Hòa Hiệp Bắc, Hòa Bắc...)
            { name: "Phường Liên Chiểu", code: "DN_NEW_10" }, // (Từ Hòa Khánh Bắc...)
            { name: "Phường Cẩm Lệ", code: "DN_NEW_11" }, // (Từ Hòa Thọ Tây, Khuê Trung...)
            { name: "Phường Hòa Xuân", code: "DN_NEW_12" }, // (Từ Hòa Châu, Hòa Phước...)

            // --- NHÓM PHƯỜNG MỚI (KHU VỰC QUẢNG NAM CŨ - Tam Kỳ, Điện Bàn, Hội An) ---
            { name: "Phường Tam Kỳ", code: "DN_NEW_13" }, // (Từ An Mỹ, An Xuân...)
            { name: "Phường Quảng Phú", code: "DN_NEW_14" }, // (Từ An Phú, Tam Thanh...)
            { name: "Phường Hương Trà", code: "DN_NEW_15" }, // (Từ An Sơn, Hòa Hương...)
            { name: "Phường Bàn Thạch", code: "DN_NEW_16" }, // (Từ Tân Thạnh, Hòa Thuận...)
            { name: "Phường Điện Bàn", code: "DN_NEW_17" }, // (Từ Điện Phương, Vĩnh Điện...)
            { name: "Phường Điện Bàn Đông", code: "DN_NEW_18" }, // (Từ Điện Nam, Điện Dương...)
            { name: "Phường An Thắng", code: "DN_NEW_19" }, // (Từ Điện An, Điện Thắng...)
            { name: "Phường Điện Bàn Bắc", code: "DN_NEW_20" }, // (Từ Điện Thắng Bắc, Điện Hòa...)
            { name: "Phường Hội An", code: "DN_NEW_21" }, // (Từ Minh An, Cẩm Phô...)
            { name: "Phường Hội An Đông", code: "DN_NEW_22" }, // (Từ Cẩm Châu, Cửa Đại...)
            { name: "Phường Hội An Tây", code: "DN_NEW_23" }, // (Từ Thanh Hà, Tân An...)

            // --- NHÓM XÃ MỚI (KHU VỰC HÒA VANG & QUẢNG NAM CŨ) ---
            { name: "Xã Hòa Vang", code: "DN_NEW_24" }, // (Từ Hòa Phong, Hòa Phú)
            { name: "Xã Hòa Tiến", code: "DN_NEW_25" }, // (Từ Hòa Khương, Hòa Tiến)
            { name: "Xã Bà Nà", code: "DN_NEW_26" }, // (Từ Hòa Ninh, Hòa Nhơn)
            { name: "Xã Núi Thành", code: "DN_NEW_27" }, // (Từ TT Núi Thành, Tam Quang...)
            { name: "Xã Tam Mỹ", code: "DN_NEW_28" },
            { name: "Xã Tam Anh", code: "DN_NEW_29" },
            { name: "Xã Đức Phú", code: "DN_NEW_30" }, // (Từ Tam Sơn, Tam Thạnh)
            { name: "Xã Tam Xuân", code: "DN_NEW_31" },
            { name: "Xã Tây Hồ", code: "DN_NEW_32" }, // (Từ Tam An, Tam Thành...)
            { name: "Xã Chiên Đàn", code: "DN_NEW_33" }, // (Từ TT Phú Thịnh, Tam Đàn...)
            { name: "Xã Phú Ninh", code: "DN_NEW_34" }, // (Từ Tam Dân, Tam Lãnh...)
            { name: "Xã Lãnh Ngọc", code: "DN_NEW_35" }, // (Từ Tiên Lãnh, Tiên Ngọc...)
            { name: "Xã Tiên Phước", code: "DN_NEW_36" }, // (Từ TT Tiên Kỳ...)
            { name: "Xã Thạnh Bình", code: "DN_NEW_37" }, // (Từ Tiên Lập, Tiên Cảnh...)
            { name: "Xã Sơn Cẩm Hà", code: "DN_NEW_38" }, // (Từ Tiên Sơn, Tiên Hà...)
            { name: "Xã Trà Liên", code: "DN_NEW_39" }, // (Từ Trà Đông...)
            { name: "Xã Trà Giáp", code: "DN_NEW_40" },
            { name: "Xã Trà Tân", code: "DN_NEW_41" },
            { name: "Xã Trà Đốc", code: "DN_NEW_42" },
            { name: "Xã Trà My", code: "DN_NEW_43" }, // (Từ TT Trà My...)
            { name: "Xã Nam Trà My", code: "DN_NEW_44" }, // (Từ Trà Mai, Trà Don)
            { name: "Xã Trà Tập", code: "DN_NEW_45" },
            { name: "Xã Trà Vân", code: "DN_NEW_46" },
            { name: "Xã Trà Linh", code: "DN_NEW_47" },
            { name: "Xã Trà Leng", code: "DN_NEW_48" },
            { name: "Xã Thăng Bình", code: "DN_NEW_49" }, // (Từ TT Hà Lam...)
            { name: "Xã Thăng An", code: "DN_NEW_50" },
            { name: "Xã Thăng Trường", code: "DN_NEW_51" },
            { name: "Xã Thăng Điền", code: "DN_NEW_52" },
            { name: "Xã Thăng Phú", code: "DN_NEW_53" },
            { name: "Xã Đồng Dương", code: "DN_NEW_54" },
            { name: "Xã Quế Sơn Trung", code: "DN_NEW_55" },
            { name: "Xã Quế Sơn", code: "DN_NEW_56" }, // (Từ TT Đông Phú...)
            { name: "Xã Xuân Phú", code: "DN_NEW_57" }, // (Từ TT Hương An...)
            { name: "Xã Nông Sơn", code: "DN_NEW_58" }, // (Từ TT Trung Phước...)
            { name: "Xã Quế Phước", code: "DN_NEW_59" },
            { name: "Xã Duy Nghĩa", code: "DN_NEW_60" },
            { name: "Xã Nam Phước", code: "DN_NEW_61" }, // (Từ TT Nam Phước...)
            { name: "Xã Duy Xuyên", code: "DN_NEW_62" },
            { name: "Xã Thu Bồn", code: "DN_NEW_63" },
            { name: "Xã Điện Bàn Tây", code: "DN_NEW_64" }, // (Từ Điện Hồng...)
            { name: "Xã Gò Nổi", code: "DN_NEW_65" }, // (Từ Điện Phong...)
            { name: "Xã Đại Lộc", code: "DN_NEW_66" }, // (Từ TT Ái Nghĩa...)
            { name: "Xã Hà Nha", code: "DN_NEW_67" },
            { name: "Xã Thượng Đức", code: "DN_NEW_68" },
            { name: "Xã Vu Gia", code: "DN_NEW_69" },
            { name: "Xã Phú Thuận", code: "DN_NEW_70" },
            { name: "Xã Thạnh Mỹ", code: "DN_NEW_71" }, // (Từ TT Thạnh Mỹ)
            { name: "Xã Bến Giằng", code: "DN_NEW_72" },
            { name: "Xã Nam Giang", code: "DN_NEW_73" },
            { name: "Xã Đắc Pring", code: "DN_NEW_74" },
            { name: "Xã La Dêê", code: "DN_NEW_75" },
            { name: "Xã La Êê", code: "DN_NEW_76" },
            { name: "Xã Sông Vàng", code: "DN_NEW_77" },
            { name: "Xã Sông Kôn", code: "DN_NEW_78" },
            { name: "Xã Đông Giang", code: "DN_NEW_79" }, // (Từ TT Prao...)
            { name: "Xã Bến Hiên", code: "DN_NEW_80" },
            { name: "Xã Avương", code: "DN_NEW_81" },
            { name: "Xã Tây Giang", code: "DN_NEW_82" },
            { name: "Xã Hùng Sơn", code: "DN_NEW_83" },
            { name: "Xã Hiệp Đức", code: "DN_NEW_84" }, // (Từ TT Tân Bình...)
            { name: "Xã Việt An", code: "DN_NEW_85" },
            { name: "Xã Phước Trà", code: "DN_NEW_86" },
            { name: "Xã Khâm Đức", code: "DN_NEW_87" }, // (Từ TT Khâm Đức...)
            { name: "Xã Phước Năng", code: "DN_NEW_88" },
            { name: "Xã Phước Chánh", code: "DN_NEW_89" },
            { name: "Xã Phước Thành", code: "DN_NEW_90" },
            { name: "Xã Phước Hiệp", code: "DN_NEW_91" },

            // --- ĐẶC KHU ---
            { name: "Đặc khu Hoàng Sa", code: "DN_NEW_92" },

            // --- XÃ GIỮ NGUYÊN (KHÔNG SẮP XẾP) ---
            { name: "Xã Tam Hải", code: "DN_OLD_01" },
            { name: "Xã Tân Hiệp", code: "DN_OLD_02" } // (Cù Lao Chàm)
        ]
    },

    // =================================================================
    // TỈNH ĐẮK LẮK (MỚI - BAO GỒM CẢ KHU VỰC PHÚ YÊN CŨ THEO VĂN BẢN)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Đắk Lắk",
        code: "66", // Mã tỉnh Đắk Lắk cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC ĐẮK LẮK CŨ) ---
            { name: "Xã Hòa Phú", code: "DL_NEW_01" }, // (Từ P.Hòa Phú TP BMT, Hòa Xuân, Hòa Khánh)
            { name: "Xã Ea Drông", code: "DL_NEW_02" }, // (Từ Ea Siên, Ea Drông)
            { name: "Xã Ea Súp", code: "DL_NEW_03" }, // (Từ TT Ea Súp...)
            { name: "Xã Ea Rốk", code: "DL_NEW_04" },
            { name: "Xã Ea Bung", code: "DL_NEW_05" },
            { name: "Xã Ea Wer", code: "DL_NEW_06" },
            { name: "Xã Ea Nuôl", code: "DL_NEW_07" },
            { name: "Xã Ea Kiết", code: "DL_NEW_08" },
            { name: "Xã Ea M’Droh", code: "DL_NEW_09" },
            { name: "Xã Quảng Phú", code: "DL_NEW_10" }, // (Từ TT Quảng Phú...)
            { name: "Xã Cuôr Đăng", code: "DL_NEW_11" },
            { name: "Xã Cư M’gar", code: "DL_NEW_12" },
            { name: "Xã Ea Tul", code: "DL_NEW_13" },
            { name: "Xã Pơng Drang", code: "DL_NEW_14" },
            { name: "Xã Krông Búk", code: "DL_NEW_15" }, // (Từ Cư Né...)
            { name: "Xã Cư Pơng", code: "DL_NEW_16" },
            { name: "Xã Ea Khăl", code: "DL_NEW_17" },
            { name: "Xã Ea Drăng", code: "DL_NEW_18" }, // (Từ TT Ea Drăng...)
            { name: "Xã Ea Wy", code: "DL_NEW_19" },
            { name: "Xã Ea Hiao", code: "DL_NEW_20" },
            { name: "Xã Krông Năng", code: "DL_NEW_21" }, // (Từ TT Krông Năng...)
            { name: "Xã Dliê Ya", code: "DL_NEW_22" },
            { name: "Xã Tam Giang", code: "DL_NEW_23" },
            { name: "Xã Phú Xuân", code: "DL_NEW_24" },
            { name: "Xã Krông Pắc", code: "DL_NEW_25" }, // (Từ TT Phước An...)
            { name: "Xã Ea Knuếc", code: "DL_NEW_26" },
            { name: "Xã Tân Tiến", code: "DL_NEW_27" },
            { name: "Xã Ea Phê", code: "DL_NEW_28" },
            { name: "Xã Ea Kly", code: "DL_NEW_29" },
            { name: "Xã Ea Kar", code: "DL_NEW_30" }, // (Từ TT Ea Kar...)
            { name: "Xã Ea Ô", code: "DL_NEW_31" },
            { name: "Xã Ea Knốp", code: "DL_NEW_32" },
            { name: "Xã Cư Yang", code: "DL_NEW_33" },
            { name: "Xã Ea Păl", code: "DL_NEW_34" },
            { name: "Xã M’Drắk", code: "DL_NEW_35" }, // (Từ TT M'Drắk...)
            { name: "Xã Ea Riêng", code: "DL_NEW_36" },
            { name: "Xã Cư M’ta", code: "DL_NEW_37" },
            { name: "Xã Krông Á", code: "DL_NEW_38" },
            { name: "Xã Cư Prao", code: "DL_NEW_39" },
            { name: "Xã Hòa Sơn", code: "DL_NEW_40" },
            { name: "Xã Dang Kang", code: "DL_NEW_41" },
            { name: "Xã Krông Bông", code: "DL_NEW_42" }, // (Từ TT Krông Kmar...)
            { name: "Xã Yang Mao", code: "DL_NEW_43" },
            { name: "Xã Cư Pui", code: "DL_NEW_44" },
            { name: "Xã Liên Sơn Lắk", code: "DL_NEW_45" }, // (Từ TT Liên Sơn...)
            { name: "Xã Đắk Liêng", code: "DL_NEW_46" },
            { name: "Xã Nam Ka", code: "DL_NEW_47" },
            { name: "Xã Đắk Phơi", code: "DL_NEW_48" },
            { name: "Xã Ea Ning", code: "DL_NEW_49" },
            { name: "Xã Dray Bhăng", code: "DL_NEW_50" },
            { name: "Xã Ea Ktur", code: "DL_NEW_51" },
            { name: "Xã Krông Ana", code: "DL_NEW_52" }, // (Từ TT Buôn Trấp...)
            { name: "Xã Dur Kmăl", code: "DL_NEW_53" },
            { name: "Xã Ea Na", code: "DL_NEW_54" },
            { name: "Xã Buôn Đôn", code: "DL_NEW_96" }, // (Đổi tên từ Krông Na)

            // --- NHÓM XÃ MỚI (KHU VỰC PHÚ YÊN CŨ - THEO VĂN BẢN) ---
            { name: "Xã Xuân Thọ", code: "DL_NEW_55" },
            { name: "Xã Xuân Cảnh", code: "DL_NEW_56" },
            { name: "Xã Xuân Lộc", code: "DL_NEW_57" },
            { name: "Xã Hòa Xuân", code: "DL_NEW_58" },
            { name: "Xã Tuy An Bắc", code: "DL_NEW_59" },
            { name: "Xã Tuy An Đông", code: "DL_NEW_60" },
            { name: "Xã Ô Loan", code: "DL_NEW_61" },
            { name: "Xã Tuy An Nam", code: "DL_NEW_62" },
            { name: "Xã Tuy An Tây", code: "DL_NEW_63" },
            { name: "Xã Phú Hòa 1", code: "DL_NEW_64" },
            { name: "Xã Phú Hòa 2", code: "DL_NEW_65" },
            { name: "Xã Tây Hòa", code: "DL_NEW_66" },
            { name: "Xã Hòa Thịnh", code: "DL_NEW_67" },
            { name: "Xã Hòa Mỹ", code: "DL_NEW_68" },
            { name: "Xã Sơn Thành", code: "DL_NEW_69" },
            { name: "Xã Sơn Hòa", code: "DL_NEW_70" },
            { name: "Xã Vân Hòa", code: "DL_NEW_71" },
            { name: "Xã Tây Sơn", code: "DL_NEW_72" },
            { name: "Xã Suối Trai", code: "DL_NEW_73" },
            { name: "Xã Ea Ly", code: "DL_NEW_74" },
            { name: "Xã Ea Bá", code: "DL_NEW_75" },
            { name: "Xã Đức Bình", code: "DL_NEW_76" },
            { name: "Xã Sông Hinh", code: "DL_NEW_77" },
            { name: "Xã Xuân Lãnh", code: "DL_NEW_78" },
            { name: "Xã Phú Mỡ", code: "DL_NEW_79" },
            { name: "Xã Xuân Phước", code: "DL_NEW_80" },
            { name: "Xã Đồng Xuân", code: "DL_NEW_81" },

            // --- NHÓM PHƯỜNG MỚI ---
            { name: "Phường Buôn Ma Thuột", code: "DL_NEW_82" }, // (Từ Thành Công, Tân Tiến, Tân Thành...)
            { name: "Phường Tân An", code: "DL_NEW_83" },
            { name: "Phường Tân Lập", code: "DL_NEW_84" },
            { name: "Phường Thành Nhất", code: "DL_NEW_85" },
            { name: "Phường Ea Kao", code: "DL_NEW_86" },
            { name: "Phường Buôn Hồ", code: "DL_NEW_87" }, // (Từ Đạt Hiếu, An Bình...)
            { name: "Phường Cư Bao", code: "DL_NEW_88" },
            { name: "Phường Phú Yên", code: "DL_NEW_89" }, // (Từ Phú Đông, Phú Lâm...)
            { name: "Phường Tuy Hòa", code: "DL_NEW_90" }, // (Từ P1, P2, P4...)
            { name: "Phường Bình Kiến", code: "DL_NEW_91" },
            { name: "Phường Xuân Đài", code: "DL_NEW_92" },
            { name: "Phường Sông Cầu", code: "DL_NEW_93" },
            { name: "Phường Đông Hòa", code: "DL_NEW_94" },
            { name: "Phường Hòa Hiệp", code: "DL_NEW_95" },

            // --- XÃ GIỮ NGUYÊN ---
            { name: "Xã Ea H’Leo", code: "DL_OLD_01" },
            { name: "Xã Ea Trang", code: "DL_OLD_02" },
            { name: "Xã Ia Lốp", code: "DL_OLD_03" },
            { name: "Xã Ia Rvê", code: "DL_OLD_04" },
            { name: "Xã Krông Nô", code: "DL_OLD_05" },
            { name: "Xã Vụ Bổn", code: "DL_OLD_06" }
        ]
    },

    // =================================================================
    // TỈNH ĐIỆN BIÊN (MỚI SAU SÁP NHẬP)
    // Cấu trúc: Bỏ cấp Huyện, Xã/Phường trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Điện Biên",
        code: "11", // Mã tỉnh Điện Biên cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI ---
            { name: "Xã Mường Nhé", code: "DB_NEW_01" }, // (Từ Nậm Vì, Chung Chải, Mường Nhé)
            { name: "Xã Sín Thầu", code: "DB_NEW_02" }, // (Từ Sen Thượng, Leng Su Sìn, Sín Thầu)
            { name: "Xã Mường Toong", code: "DB_NEW_03" }, // (Từ Huổi Lếch, Mường Toong)
            { name: "Xã Nậm Kè", code: "DB_NEW_04" }, // (Từ Pá Mỳ, Nậm Kè)
            { name: "Xã Quảng Lâm", code: "DB_NEW_05" }, // (Từ Na Cô Sa, Quảng Lâm)
            { name: "Xã Nà Hỳ", code: "DB_NEW_06" }, // (Từ Nà Khoa, Nậm Nhừ, Nậm Chua, Nà Hỳ)
            { name: "Xã Mường Chà", code: "DB_NEW_07" }, // (Từ Chà Cang, Chà Nưa, Nậm Tin, Pa Tần)
            { name: "Xã Nà Bủng", code: "DB_NEW_08" }, // (Từ Vàng Đán, Nà Bủng)
            { name: "Xã Chà Tở", code: "DB_NEW_09" }, // (Từ Nậm Khăn, Chà Tở)
            { name: "Xã Si Pa Phìn", code: "DB_NEW_10" }, // (Từ Phìn Hồ, Si Pa Phìn)
            { name: "Xã Na Sang", code: "DB_NEW_11" }, // (Từ TT Mường Chà, Ma Thì Hồ...)
            { name: "Xã Mường Tùng", code: "DB_NEW_12" }, // (Từ Huổi Lèng, Mường Tùng)
            { name: "Xã Pa Ham", code: "DB_NEW_13" }, // (Từ Hừa Ngài, Pa Ham)
            { name: "Xã Nậm Nèn", code: "DB_NEW_14" }, // (Từ Huổi Mí, Nậm Nèn)
            { name: "Xã Mường Pồn", code: "DB_NEW_15" }, // (Từ Mường Mươn, Mường Pồn)
            { name: "Xã Tủa Chùa", code: "DB_NEW_16" }, // (Từ TT Tủa Chùa, Mường Báng, Nà Tòng)
            { name: "Xã Sín Chải", code: "DB_NEW_17" }, // (Từ Tả Sìn Thàng, Lao Xả Phình...)
            { name: "Xã Sính Phình", code: "DB_NEW_18" }, // (Từ Trung Thu, Tả Phìn...)
            { name: "Xã Tủa Thàng", code: "DB_NEW_19" }, // (Từ Huổi Só, Tủa Thàng)
            { name: "Xã Sáng Nhè", code: "DB_NEW_20" }, // (Từ Xá Nhè, Mường Đun...)
            { name: "Xã Tuần Giáo", code: "DB_NEW_21" }, // (Từ TT Tuần Giáo, Quài Cang...)
            { name: "Xã Quài Tở", code: "DB_NEW_22" }, // (Từ Tỏa Tình, Tênh Phông...)
            { name: "Xã Mường Mùn", code: "DB_NEW_23" }, // (Từ Mùn Chung, Pú Xi...)
            { name: "Xã Pú Nhung", code: "DB_NEW_24" }, // (Từ Rạng Đông, Ta Ma...)
            { name: "Xã Chiềng Sinh", code: "DB_NEW_25" }, // (Từ Nà Sáy, Mường Thín...)
            { name: "Xã Mường Ảng", code: "DB_NEW_26" }, // (Từ TT Mường Ảng, Ẳng Nưa...)
            { name: "Xã Nà Tấu", code: "DB_NEW_27" }, // (Từ Mường Đăng, Ngối Cáy...)
            { name: "Xã Búng Lao", code: "DB_NEW_28" }, // (Từ Ẳng Tở, Chiềng Đông...)
            { name: "Xã Mường Lạn", code: "DB_NEW_29" }, // (Từ Nặm Lịch, Xuân Lao...)
            { name: "Xã Mường Phăng", code: "DB_NEW_30" }, // (Từ Nà Nhạn, Pá Khoang...)
            { name: "Xã Thanh Nưa", code: "DB_NEW_31" }, // (Từ Hua Thanh, Thanh Luông...)
            { name: "Xã Thanh An", code: "DB_NEW_32" }, // (Từ Noong Hẹt, Sam Mứn...)
            { name: "Xã Thanh Yên", code: "DB_NEW_33" }, // (Từ Noong Luống, Pa Thơm...)
            { name: "Xã Sam Mứn", code: "DB_NEW_34" }, // (Từ Pom Lót, Na Ư -> Lấy tên Sam Mứn theo văn bản, dù Sam Mứn ở trên đã gộp vào Thanh An, có thể văn bản có sự điều chỉnh tên gọi lại)
            { name: "Xã Núa Ngam", code: "DB_NEW_35" }, // (Từ Hẹ Muông, Na Tông...)
            { name: "Xã Mường Nhà", code: "DB_NEW_36" }, // (Từ Mường Lói, Phu Luông...)
            { name: "Xã Na Son", code: "DB_NEW_37" }, // (Từ TT Điện Biên Đông...)
            { name: "Xã Xa Dung", code: "DB_NEW_38" }, // (Từ Phì Nhừ, Xa Dung)
            { name: "Xã Pu Nhi", code: "DB_NEW_39" }, // (Từ Nong U, Pu Nhi)
            { name: "Xã Mường Luân", code: "DB_NEW_40" }, // (Từ Chiềng Sơ, Luân Giói...)
            { name: "Xã Tìa Dình", code: "DB_NEW_41" }, // (Từ Háng Lìa, Tìa Dình)
            { name: "Xã Phình Giàng", code: "DB_NEW_42" }, // (Từ Pú Hồng, Phình Giàng)

            // --- NHÓM PHƯỜNG MỚI ---
            { name: "Phường Mường Lay", code: "DB_NEW_43" }, // (Từ Sông Đà, Na Lay...)
            { name: "Phường Điện Biên Phủ", code: "DB_NEW_44" }, // (Từ Him Lam, Tân Thanh...)
            { name: "Phường Mường Thanh", code: "DB_NEW_45" } // (Từ Noong Bua, Nam Thanh...)
        ]
    },

    // =================================================================
    // TỈNH ĐỒNG NAI (MỚI - BAO GỒM CẢ KHU VỰC BÌNH PHƯỚC CŨ)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Đồng Nai",
        code: "75", // Mã tỉnh Đồng Nai cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC ĐỒNG NAI CŨ) ---
            { name: "Xã Đại Phước", code: "DN_NEW_01" }, // (Từ Phú Hữu, Phú Đông...)
            { name: "Xã Nhơn Trạch", code: "DN_NEW_02" }, // (Từ TT Hiệp Phước...)
            { name: "Xã Phước An", code: "DN_NEW_03" }, // (Từ Phước An, Vĩnh Thanh...)
            { name: "Xã Phước Thái", code: "DN_NEW_04" }, // (Từ Tân Hiệp, Phước Bình...)
            { name: "Xã Long Phước", code: "DN_NEW_05" },
            { name: "Xã Long Thành", code: "DN_NEW_06" }, // (Từ TT Long Thành...)
            { name: "Xã Bình An", code: "DN_NEW_07" },
            { name: "Xã An Phước", code: "DN_NEW_08" },
            { name: "Xã An Viễn", code: "DN_NEW_09" },
            { name: "Xã Bình Minh", code: "DN_NEW_10" },
            { name: "Xã Trảng Bom", code: "DN_NEW_11" }, // (Từ TT Trảng Bom...)
            { name: "Xã Bàu Hàm", code: "DN_NEW_12" },
            { name: "Xã Hưng Thịnh", code: "DN_NEW_13" },
            { name: "Xã Dầu Giây", code: "DN_NEW_14" }, // (Từ TT Dầu Giây...)
            { name: "Xã Gia Kiệm", code: "DN_NEW_15" },
            { name: "Xã Thống Nhất", code: "DN_NEW_16" },
            { name: "Xã Xuân Quế", code: "DN_NEW_17" },
            { name: "Xã Xuân Đường", code: "DN_NEW_18" },
            { name: "Xã Cẩm Mỹ", code: "DN_NEW_19" }, // (Từ TT Long Giao...)
            { name: "Xã Sông Ray", code: "DN_NEW_20" },
            { name: "Xã Xuân Đông", code: "DN_NEW_21" },
            { name: "Xã Xuân Định", code: "DN_NEW_22" },
            { name: "Xã Xuân Phú", code: "DN_NEW_23" },
            { name: "Xã Xuân Lộc", code: "DN_NEW_24" }, // (Từ TT Gia Ray...)
            { name: "Xã Xuân Hòa", code: "DN_NEW_25" },
            { name: "Xã Xuân Thành", code: "DN_NEW_26" },
            { name: "Xã Xuân Bắc", code: "DN_NEW_27" },
            { name: "Xã La Ngà", code: "DN_NEW_28" },
            { name: "Xã Định Quán", code: "DN_NEW_29" }, // (Từ TT Định Quán...)
            { name: "Xã Phú Vinh", code: "DN_NEW_30" },
            { name: "Xã Phú Hòa", code: "DN_NEW_31" },
            { name: "Xã Tà Lài", code: "DN_NEW_32" },
            { name: "Xã Nam Cát Tiên", code: "DN_NEW_33" },
            { name: "Xã Tân Phú", code: "DN_NEW_34" }, // (Từ TT Tân Phú...)
            { name: "Xã Phú Lâm", code: "DN_NEW_35" },
            { name: "Xã Trị An", code: "DN_NEW_36" }, // (Từ TT Vĩnh An...)
            { name: "Xã Tân An", code: "DN_NEW_37" },
            { name: "Xã Thiện Tân", code: "DN_NEW_72_OLD" }, // (Gộp vào phường Trảng Dài ở mục 72, nhưng nếu cần xã cũ)

            // --- NHÓM XÃ MỚI (KHU VỰC BÌNH PHƯỚC CŨ - THEO VĂN BẢN) ---
            { name: "Xã Nha Bích", code: "DN_NEW_38" }, // (Từ Minh Thắng, Minh Lập...)
            { name: "Xã Tân Quan", code: "DN_NEW_39" },
            { name: "Xã Tân Hưng", code: "DN_NEW_40" },
            { name: "Xã Tân Khai", code: "DN_NEW_41" },
            { name: "Xã Minh Đức", code: "DN_NEW_42" },
            { name: "Xã Lộc Thành", code: "DN_NEW_43" },
            { name: "Xã Lộc Ninh", code: "DN_NEW_44" }, // (Từ TT Lộc Ninh...)
            { name: "Xã Lộc Hưng", code: "DN_NEW_45" },
            { name: "Xã Lộc Tấn", code: "DN_NEW_46" },
            { name: "Xã Lộc Thạnh", code: "DN_NEW_47" },
            { name: "Xã Lộc Quang", code: "DN_NEW_48" },
            { name: "Xã Tân Tiến", code: "DN_NEW_49" },
            { name: "Xã Thiện Hưng", code: "DN_NEW_50" },
            { name: "Xã Hưng Phước", code: "DN_NEW_51" },
            { name: "Xã Phú Nghĩa", code: "DN_NEW_52" },
            { name: "Xã Đa Kia", code: "DN_NEW_53" },
            { name: "Xã Bình Tân", code: "DN_NEW_54" },
            { name: "Xã Long Hà", code: "DN_NEW_55" },
            { name: "Xã Phú Riềng", code: "DN_NEW_56" },
            { name: "Xã Phú Trung", code: "DN_NEW_57" },
            { name: "Xã Thuận Lợi", code: "DN_NEW_58" },
            { name: "Xã Đồng Tâm", code: "DN_NEW_59" },
            { name: "Xã Tân Lợi", code: "DN_NEW_60" },
            { name: "Xã Đồng Phú", code: "DN_NEW_61" },
            { name: "Xã Phước Sơn", code: "DN_NEW_62" },
            { name: "Xã Nghĩa Trung", code: "DN_NEW_63" },
            { name: "Xã Bù Đăng", code: "DN_NEW_64" },
            { name: "Xã Thọ Sơn", code: "DN_NEW_65" },
            { name: "Xã Đak Nhau", code: "DN_NEW_66" },
            { name: "Xã Bom Bo", code: "DN_NEW_67" },

            // --- NHÓM PHƯỜNG MỚI (KHU VỰC BIÊN HÒA & LONG KHÁNH) ---
            { name: "Phường Biên Hòa", code: "DN_NEW_68" }, // (Từ Tân Hạnh, Hóa An...)
            { name: "Phường Trấn Biên", code: "DN_NEW_69" }, // (Từ Bửu Long, Quang Vinh...)
            { name: "Phường Tam Hiệp", code: "DN_NEW_70" },
            { name: "Phường Long Bình", code: "DN_NEW_71" },
            { name: "Phường Trảng Dài", code: "DN_NEW_72" },
            { name: "Phường Hố Nai", code: "DN_NEW_73" },
            { name: "Phường Long Hưng", code: "DN_NEW_74" },
            { name: "Phường Bình Lộc", code: "DN_NEW_75" },
            { name: "Phường Bảo Vinh", code: "DN_NEW_76" },
            { name: "Phường Xuân Lập", code: "DN_NEW_77" },
            { name: "Phường Long Khánh", code: "DN_NEW_78" }, // (Từ Xuân An...)
            { name: "Phường Hàng Gòn", code: "DN_NEW_79" },
            { name: "Phường Tân Triều", code: "DN_NEW_80" }, // (Từ Tân Phong...)

            // --- NHÓM PHƯỜNG MỚI (KHU VỰC BÌNH PHƯỚC CŨ) ---
            { name: "Phường Minh Hưng", code: "DN_NEW_81" },
            { name: "Phường Chơn Thành", code: "DN_NEW_82" },
            { name: "Phường Bình Long", code: "DN_NEW_83" },
            { name: "Phường An Lộc", code: "DN_NEW_84" },
            { name: "Phường Phước Bình", code: "DN_NEW_85" },
            { name: "Phường Phước Long", code: "DN_NEW_86" },
            { name: "Phường Đồng Xoài", code: "DN_NEW_87" },
            { name: "Phường Bình Phước", code: "DN_NEW_88" },

            // --- XÃ/PHƯỜNG GIỮ NGUYÊN ---
            { name: "Phường Phước Tân", code: "DN_OLD_01" },
            { name: "Phường Tam Phước", code: "DN_OLD_02" },
            { name: "Xã Thanh Sơn", code: "DN_OLD_03" },
            { name: "Xã Đak Lua", code: "DN_OLD_04" },
            { name: "Xã Phú Lý", code: "DN_OLD_05" },
            { name: "Xã Bù Gia Mập", code: "DN_OLD_06" },
            { name: "Xã Đăk Ơ", code: "DN_OLD_07" }
        ]
    },

    // =================================================================
    // TỈNH ĐỒNG THÁP (MỚI - SÁP NHẬP ĐỒNG THÁP + TIỀN GIANG)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Đồng Tháp",
        code: "82", // Mã tỉnh Đồng Tháp cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC ĐỒNG THÁP CŨ) ---
            { name: "Xã Tân Hồng", code: "DT_NEW_01" }, // (Từ TT Sa Rài...)
            { name: "Xã Tân Thành", code: "DT_NEW_02" },
            { name: "Xã Tân Hộ Cơ", code: "DT_NEW_03" },
            { name: "Xã An Phước", code: "DT_NEW_04" },
            { name: "Xã Thường Phước", code: "DT_NEW_05" }, // (Từ TT Thường Thới Tiền...)
            { name: "Xã Long Khánh", code: "DT_NEW_06" },
            { name: "Xã Long Phú Thuận", code: "DT_NEW_07" }, // (Từ Long Thuận...)
            { name: "Xã An Hòa", code: "DT_NEW_08" },
            { name: "Xã Tam Nông", code: "DT_NEW_09" }, // (Từ Phú Đức...)
            { name: "Xã Phú Thọ", code: "DT_NEW_10" },
            { name: "Xã Tràm Chim", code: "DT_NEW_11" }, // (Từ TT Tràm Chim...)
            { name: "Xã Phú Cường", code: "DT_NEW_12" },
            { name: "Xã An Long", code: "DT_NEW_13" },
            { name: "Xã Thanh Bình", code: "DT_NEW_14" }, // (Từ TT Thanh Bình...)
            { name: "Xã Tân Thạnh", code: "DT_NEW_15" },
            { name: "Xã Bình Thành", code: "DT_NEW_16" },
            { name: "Xã Tân Long", code: "DT_NEW_17" }, // (Từ Tân Quới, Tân Huề...)
            { name: "Xã Tháp Mười", code: "DT_NEW_18" }, // (Từ TT Mỹ An...)
            { name: "Xã Thanh Mỹ", code: "DT_NEW_19" },
            { name: "Xã Mỹ Quí", code: "DT_NEW_20" },
            { name: "Xã Đốc Binh Kiều", code: "DT_NEW_21" },
            { name: "Xã Trường Xuân", code: "DT_NEW_22" },
            { name: "Xã Phương Thịnh", code: "DT_NEW_23" },
            { name: "Xã Phong Mỹ", code: "DT_NEW_24" },
            { name: "Xã Ba Sao", code: "DT_NEW_25" },
            { name: "Xã Mỹ Thọ", code: "DT_NEW_26" }, // (Từ TT Mỹ Thọ...)
            { name: "Xã Bình Hàng Trung", code: "DT_NEW_27" },
            { name: "Xã Mỹ Hiệp", code: "DT_NEW_28" },
            { name: "Xã Mỹ An Hưng", code: "DT_NEW_29" },
            { name: "Xã Tân Khánh Trung", code: "DT_NEW_30" },
            { name: "Xã Lấp Vò", code: "DT_NEW_31" }, // (Từ TT Lấp Vò...)
            { name: "Xã Lai Vung", code: "DT_NEW_32" }, // (Từ Tân Thành, Tân Phước...)
            { name: "Xã Hòa Long", code: "DT_NEW_33" }, // (Từ TT Lai Vung...)
            { name: "Xã Phong Hòa", code: "DT_NEW_34" },
            { name: "Xã Tân Dương", code: "DT_NEW_35" },
            { name: "Xã Phú Hựu", code: "DT_NEW_36" }, // (Từ TT Cái Tàu Hạ...)
            { name: "Xã Tân Nhuận Đông", code: "DT_NEW_37" },
            { name: "Xã Tân Phú Trung", code: "DT_NEW_38" },

            // --- NHÓM XÃ MỚI (KHU VỰC TIỀN GIANG CŨ - THEO VĂN BẢN) ---
            { name: "Xã Tân Phú", code: "DT_NEW_39" }, // (Từ xã Tân Hội, Tân Phú TX Cai Lậy)
            { name: "Xã Thanh Hưng", code: "DT_NEW_40" },
            { name: "Xã An Hữu", code: "DT_NEW_41" },
            { name: "Xã Mỹ Lợi", code: "DT_NEW_42" },
            { name: "Xã Mỹ Đức Tây", code: "DT_NEW_43" },
            { name: "Xã Mỹ Thiện", code: "DT_NEW_44" },
            { name: "Xã Hậu Mỹ", code: "DT_NEW_45" },
            { name: "Xã Hội Cư", code: "DT_NEW_46" },
            { name: "Xã Cái Bè", code: "DT_NEW_47" }, // (Từ TT Cái Bè...)
            { name: "Xã Mỹ Thành", code: "DT_NEW_48" },
            { name: "Xã Thạnh Phú", code: "DT_NEW_49" },
            { name: "Xã Bình Phú", code: "DT_NEW_50" }, // (Từ TT Bình Phú...)
            { name: "Xã Hiệp Đức", code: "DT_NEW_51" },
            { name: "Xã Long Tiên", code: "DT_NEW_52" },
            { name: "Xã Ngũ Hiệp", code: "DT_NEW_53" },
            { name: "Xã Tân Phước 1", code: "DT_NEW_54" }, // (Từ TT Mỹ Phước...)
            { name: "Xã Tân Phước 2", code: "DT_NEW_55" },
            { name: "Xã Tân Phước 3", code: "DT_NEW_56" },
            { name: "Xã Hưng Thạnh", code: "DT_NEW_57" },
            { name: "Xã Tân Hương", code: "DT_NEW_58" },
            { name: "Xã Châu Thành", code: "DT_NEW_59" }, // (Từ TT Tân Hiệp...)
            { name: "Xã Long Hưng", code: "DT_NEW_60" },
            { name: "Xã Long Định", code: "DT_NEW_61" },
            { name: "Xã Bình Trưng", code: "DT_NEW_62" },
            { name: "Xã Vĩnh Kim", code: "DT_NEW_63" },
            { name: "Xã Kim Sơn", code: "DT_NEW_64" },
            { name: "Xã Mỹ Tịnh An", code: "DT_NEW_65" },
            { name: "Xã Lương Hòa Lạc", code: "DT_NEW_66" },
            { name: "Xã Tân Thuận Bình", code: "DT_NEW_67" },
            { name: "Xã Chợ Gạo", code: "DT_NEW_68" }, // (Từ TT Chợ Gạo...)
            { name: "Xã An Thạnh Thủy", code: "DT_NEW_69" },
            { name: "Xã Bình Ninh", code: "DT_NEW_70" },
            { name: "Xã Vĩnh Bình", code: "DT_NEW_71" }, // (Từ TT Vĩnh Bình...)
            { name: "Xã Đồng Sơn", code: "DT_NEW_72" },
            { name: "Xã Phú Thành", code: "DT_NEW_73" },
            { name: "Xã Long Bình", code: "DT_NEW_74" },
            { name: "Xã Vĩnh Hựu", code: "DT_NEW_75" },
            { name: "Xã Gò Công Đông", code: "DT_NEW_76" },
            { name: "Xã Tân Điền", code: "DT_NEW_77" },
            { name: "Xã Tân Hòa", code: "DT_NEW_78" }, // (Từ TT Tân Hòa...)
            { name: "Xã Tân Đông", code: "DT_NEW_79" },
            { name: "Xã Gia Thuận", code: "DT_NEW_80" }, // (Từ TT Vàm Láng...)
            { name: "Xã Tân Thới", code: "DT_NEW_81" },
            { name: "Xã Tân Phú Đông", code: "DT_NEW_82" },

            // --- NHÓM PHƯỜNG MỚI ---
            { name: "Phường Mỹ Tho", code: "DT_NEW_83" }, // (Từ P1, P2 TP Mỹ Tho...)
            { name: "Phường Đạo Thạnh", code: "DT_NEW_84" },
            { name: "Phường Mỹ Phong", code: "DT_NEW_85" },
            { name: "Phường Thới Sơn", code: "DT_NEW_86" },
            { name: "Phường Trung An", code: "DT_NEW_87" },
            { name: "Phường Gò Công", code: "DT_NEW_88" }, // (Từ P1, P5 TP Gò Công...)
            { name: "Phường Long Thuận", code: "DT_NEW_89" },
            { name: "Phường Bình Xuân", code: "DT_NEW_90" },
            { name: "Phường Sơn Qui", code: "DT_NEW_91" },
            { name: "Phường An Bình", code: "DT_NEW_92" }, // (Từ An Lộc TX Hồng Ngự...)
            { name: "Phường Hồng Ngự", code: "DT_NEW_93" },
            { name: "Phường Thường Lạc", code: "DT_NEW_94" },
            { name: "Phường Cao Lãnh", code: "DT_NEW_95" }, // (Từ P1, P3, P4... TP Cao Lãnh)
            { name: "Phường Mỹ Ngãi", code: "DT_NEW_96" },
            { name: "Phường Mỹ Trà", code: "DT_NEW_97" },
            { name: "Phường Sa Đéc", code: "DT_NEW_98" }, // (Từ P1, P2, P3... TP Sa Đéc)
            { name: "Phường Mỹ Phước Tây", code: "DT_NEW_99" }, // (Từ P1, P3 TX Cai Lậy...)
            { name: "Phường Thanh Hòa", code: "DT_NEW_100" },
            { name: "Phường Cai Lậy", code: "DT_NEW_101" },
            { name: "Phường Nhị Quý", code: "DT_NEW_102" }
        ]
    },

    // =================================================================
    // TỈNH GIA LAI (MỚI - BAO GỒM CẢ KHU VỰC BÌNH ĐỊNH CŨ THEO VĂN BẢN)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Gia Lai",
        code: "52", // Mã tỉnh Gia Lai cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC BÌNH ĐỊNH CŨ - SÁP NHẬP VÀO) ---
            { name: "Xã An Nhơn Tây", code: "GL_NEW_01" }, // (Từ Nhơn Lộc, Nhơn Tân)
            { name: "Xã Phù Cát", code: "GL_NEW_02" }, // (Từ TT Ngô Mây, Cát Trinh...)
            { name: "Xã Xuân An", code: "GL_NEW_03" },
            { name: "Xã Ngô Mây", code: "GL_NEW_04" },
            { name: "Xã Cát Tiến", code: "GL_NEW_05" },
            { name: "Xã Đề Gi", code: "GL_NEW_06" },
            { name: "Xã Hòa Hội", code: "GL_NEW_07" },
            { name: "Xã Hội Sơn", code: "GL_NEW_08" },
            { name: "Xã Phù Mỹ", code: "GL_NEW_09" }, // (Từ TT Phù Mỹ...)
            { name: "Xã An Lương", code: "GL_NEW_10" },
            { name: "Xã Bình Dương", code: "GL_NEW_11" },
            { name: "Xã Phù Mỹ Đông", code: "GL_NEW_12" },
            { name: "Xã Phù Mỹ Tây", code: "GL_NEW_13" },
            { name: "Xã Phù Mỹ Nam", code: "GL_NEW_14" },
            { name: "Xã Phù Mỹ Bắc", code: "GL_NEW_15" },
            { name: "Xã Tuy Phước", code: "GL_NEW_16" }, // (Từ TT Tuy Phước, Diêu Trì...)
            { name: "Xã Tuy Phước Đông", code: "GL_NEW_17" },
            { name: "Xã Tuy Phước Tây", code: "GL_NEW_18" },
            { name: "Xã Tuy Phước Bắc", code: "GL_NEW_19" },
            { name: "Xã Tây Sơn", code: "GL_NEW_20" }, // (Từ TT Phú Phong...)
            { name: "Xã Bình Khê", code: "GL_NEW_21" },
            { name: "Xã Bình Phú", code: "GL_NEW_22" },
            { name: "Xã Bình Hiệp", code: "GL_NEW_23" },
            { name: "Xã Bình An", code: "GL_NEW_24" },
            { name: "Xã Hoài Ân", code: "GL_NEW_25" }, // (Từ TT Tăng Bạt Hổ...)
            { name: "Xã Ân Tường", code: "GL_NEW_26" },
            { name: "Xã Kim Sơn", code: "GL_NEW_27" },
            { name: "Xã Vạn Đức", code: "GL_NEW_28" },
            { name: "Xã Ân Hảo", code: "GL_NEW_29" },
            { name: "Xã Vân Canh", code: "GL_NEW_30" }, // (Từ TT Vân Canh...)
            { name: "Xã Canh Vinh", code: "GL_NEW_31" },
            { name: "Xã Canh Liên", code: "GL_NEW_32" },
            { name: "Xã Vĩnh Thạnh", code: "GL_NEW_33" }, // (Từ TT Vĩnh Thạnh...)
            { name: "Xã Vĩnh Thịnh", code: "GL_NEW_34" },
            { name: "Xã Vĩnh Quang", code: "GL_NEW_35" },
            { name: "Xã Vĩnh Sơn", code: "GL_NEW_36" },
            { name: "Xã An Hòa", code: "GL_NEW_37" },
            { name: "Xã An Lão", code: "GL_NEW_38" }, // (Từ TT An Lão...)
            { name: "Xã An Vinh", code: "GL_NEW_39" },
            { name: "Xã An Toàn", code: "GL_NEW_40" },

            // --- NHÓM XÃ MỚI (KHU VỰC GIA LAI CŨ) ---
            { name: "Xã Biển Hồ", code: "GL_NEW_41" }, // (Từ Nghĩa Hưng, Chư Đang Ya...)
            { name: "Xã Gào", code: "GL_NEW_42" },
            { name: "Xã Ia Ly", code: "GL_NEW_43" }, // (Từ TT Ia Ly...)
            { name: "Xã Chư Păh", code: "GL_NEW_44" }, // (Từ TT Phú Hòa...)
            { name: "Xã Ia Khươl", code: "GL_NEW_45" },
            { name: "Xã Ia Phí", code: "GL_NEW_46" },
            { name: "Xã Chư Prông", code: "GL_NEW_47" }, // (Từ TT Chư Prông...)
            { name: "Xã Bàu Cạn", code: "GL_NEW_48" },
            { name: "Xã Ia Boòng", code: "GL_NEW_49" },
            { name: "Xã Ia Lâu", code: "GL_NEW_50" },
            { name: "Xã Ia Pia", code: "GL_NEW_51" },
            { name: "Xã Ia Tôr", code: "GL_NEW_52" },
            { name: "Xã Chư Sê", code: "GL_NEW_53" }, // (Từ TT Chư Sê...)
            { name: "Xã Bờ Ngoong", code: "GL_NEW_54" },
            { name: "Xã Ia Ko", code: "GL_NEW_55" },
            { name: "Xã Al Bá", code: "GL_NEW_56" },
            { name: "Xã Chư Pưh", code: "GL_NEW_57" }, // (Từ TT Nhơn Hòa...)
            { name: "Xã Ia Le", code: "GL_NEW_58" },
            { name: "Xã Ia Hrú", code: "GL_NEW_59" },
            { name: "Xã Cửu An", code: "GL_NEW_60" },
            { name: "Xã Đak Pơ", code: "GL_NEW_61" }, // (Từ TT Đak Pơ...)
            { name: "Xã Ya Hội", code: "GL_NEW_62" },
            { name: "Xã Kbang", code: "GL_NEW_63" }, // (Từ TT Kbang...)
            { name: "Xã Kông Bơ La", code: "GL_NEW_64" },
            { name: "Xã Tơ Tung", code: "GL_NEW_65" },
            { name: "Xã Sơn Lang", code: "GL_NEW_66" },
            { name: "Xã Đak Rong", code: "GL_NEW_67" },
            { name: "Xã Kông Chro", code: "GL_NEW_68" }, // (Từ TT Kông Chro...)
            { name: "Xã Ya Ma", code: "GL_NEW_69" },
            { name: "Xã Chư Krey", code: "GL_NEW_70" },
            { name: "Xã SRó", code: "GL_NEW_71" },
            { name: "Xã Đăk Song", code: "GL_NEW_72" },
            { name: "Xã Chơ Long", code: "GL_NEW_73" },
            { name: "Xã Ia Rbol", code: "GL_NEW_74" },
            { name: "Xã Ia Sao", code: "GL_NEW_75" },
            { name: "Xã Phú Thiện", code: "GL_NEW_76" }, // (Từ TT Phú Thiện...)
            { name: "Xã Chư A Thai", code: "GL_NEW_77" },
            { name: "Xã Ia Hiao", code: "GL_NEW_78" },
            { name: "Xã Pờ Tó", code: "GL_NEW_79" },
            { name: "Xã Ia Pa", code: "GL_NEW_80" },
            { name: "Xã Ia Tul", code: "GL_NEW_81" },
            { name: "Xã Phú Túc", code: "GL_NEW_82" }, // (Từ TT Phú Túc...)
            { name: "Xã Ia Dreh", code: "GL_NEW_83" },
            { name: "Xã Ia Rsai", code: "GL_NEW_84" },
            { name: "Xã Uar", code: "GL_NEW_85" },
            { name: "Xã Đak Đoa", code: "GL_NEW_86" }, // (Từ TT Đak Đoa...)
            { name: "Xã Kon Gang", code: "GL_NEW_87" },
            { name: "Xã Ia Băng", code: "GL_NEW_88" },
            { name: "Xã KDang", code: "GL_NEW_89" },
            { name: "Xã Đak Sơmei", code: "GL_NEW_90" },
            { name: "Xã Mang Yang", code: "GL_NEW_91" }, // (Từ TT Kon Dơng...)
            { name: "Xã Lơ Pang", code: "GL_NEW_92" },
            { name: "Xã Kon Chiêng", code: "GL_NEW_93" },
            { name: "Xã Hra", code: "GL_NEW_94" },
            { name: "Xã Ayun", code: "GL_NEW_95" },
            { name: "Xã Ia Grai", code: "GL_NEW_96" }, // (Từ TT Ia Kha...)
            { name: "Xã Ia Krái", code: "GL_NEW_97" },
            { name: "Xã Ia Hrung", code: "GL_NEW_98" },
            { name: "Xã Đức Cơ", code: "GL_NEW_99" }, // (Từ TT Chư Ty...)
            { name: "Xã Ia Dơk", code: "GL_NEW_100" },
            { name: "Xã Ia Krêl", code: "GL_NEW_101" },

            // --- NHÓM PHƯỜNG MỚI (SÁP NHẬP QUY NHƠN, AN NHƠN, HOÀI NHƠN VÀO) ---
            { name: "Phường Quy Nhơn", code: "GL_NEW_102" }, // (Từ Đống Đa, Hải Cảng...)
            { name: "Phường Quy Nhơn Đông", code: "GL_NEW_103" },
            { name: "Phường Quy Nhơn Tây", code: "GL_NEW_104" },
            { name: "Phường Quy Nhơn Nam", code: "GL_NEW_105" },
            { name: "Phường Quy Nhơn Bắc", code: "GL_NEW_106" },
            { name: "Phường Bình Định", code: "GL_NEW_107" },
            { name: "Phường An Nhơn", code: "GL_NEW_108" }, // (Từ Đập Đá...)
            { name: "Phường An Nhơn Đông", code: "GL_NEW_109" },
            { name: "Phường An Nhơn Nam", code: "GL_NEW_110" },
            { name: "Phường An Nhơn Bắc", code: "GL_NEW_111" },
            { name: "Phường Bồng Sơn", code: "GL_NEW_112" },
            { name: "Phường Hoài Nhơn", code: "GL_NEW_113" },
            { name: "Phường Tam Quan", code: "GL_NEW_114" },
            { name: "Phường Hoài Nhơn Đông", code: "GL_NEW_115" },
            { name: "Phường Hoài Nhơn Tây", code: "GL_NEW_116" },
            { name: "Phường Hoài Nhơn Nam", code: "GL_NEW_117" },
            { name: "Phường Hoài Nhơn Bắc", code: "GL_NEW_118" },

            // --- NHÓM PHƯỜNG MỚI (PLEIKU, AN KHÊ, AYUN PA) ---
            { name: "Phường Pleiku", code: "GL_NEW_119" }, // (Từ Tây Sơn, Hội Thương...)
            { name: "Phường Hội Phú", code: "GL_NEW_120" },
            { name: "Phường Thống Nhất", code: "GL_NEW_121" },
            { name: "Phường Diên Hồng", code: "GL_NEW_122" },
            { name: "Phường An Phú", code: "GL_NEW_123" },
            { name: "Phường An Khê", code: "GL_NEW_124" }, // (Từ Ngô Mây, Tây Sơn TX An Khê...)
            { name: "Phường An Bình", code: "GL_NEW_125" },
            { name: "Phường Ayun Pa", code: "GL_NEW_126" }, // (Từ Đoàn Kết, Sông Bờ...)

            // --- XÃ GIỮ NGUYÊN ---
            { name: "Xã Ia O", code: "GL_OLD_01" },
            { name: "Xã Nhơn Châu", code: "GL_OLD_02" }, // (Cù Lao Xanh - Quy Nhơn)
            { name: "Xã Ia Púch", code: "GL_OLD_03" },
            { name: "Xã Ia Mơ", code: "GL_OLD_04" },
            { name: "Xã Ia Pnôn", code: "GL_OLD_05" },
            { name: "Xã Ia Nan", code: "GL_OLD_06" },
            { name: "Xã Ia Dom", code: "GL_OLD_07" },
            { name: "Xã Ia Chia", code: "GL_OLD_08" },
            { name: "Xã Krong", code: "GL_OLD_09" }
        ]
    },

    // =================================================================
    // THÀNH PHỐ HÀ NỘI (MỚI - SAU SÁP NHẬP 2025)
    // Cấu trúc: Bỏ cấp Quận/Huyện, Phường/Xã trực thuộc Thành phố
    // =================================================================
    {
        name: "Thành phố Hà Nội",
        code: "01", // Mã TP Hà Nội cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn TP -> Chọn Phường/Xã luôn
        wards: [
            // --- NHÓM PHƯỜNG MỚI (KHU VỰC TRUNG TÂM) ---
            { name: "Phường Hoàn Kiếm", code: "HN_NEW_01" }, // (Từ Hàng Bạc, Hàng Bồ...)
            { name: "Phường Cửa Nam", code: "HN_NEW_02" }, // (Từ Hàng Bài, Phan Chu Trinh...)
            { name: "Phường Ba Đình", code: "HN_NEW_03" }, // (Từ Quán Thánh, Trúc Bạch...)
            { name: "Phường Ngọc Hà", code: "HN_NEW_04" }, // (Từ Vĩnh Phúc, Liễu Giai...)
            { name: "Phường Giảng Võ", code: "HN_NEW_05" }, // (Từ Giảng Võ, Cát Linh...)
            { name: "Phường Hai Bà Trưng", code: "HN_NEW_06" }, // (Từ Đồng Nhân, Phố Huế...)
            { name: "Phường Vĩnh Tuy", code: "HN_NEW_07" }, // (Từ Mai Động, Thanh Lương...)
            { name: "Phường Bạch Mai", code: "HN_NEW_08" }, // (Từ Bạch Mai, Bách Khoa...)
            { name: "Phường Đống Đa", code: "HN_NEW_09" }, // (Từ Thịnh Quang, Quang Trung...)
            { name: "Phường Kim Liên", code: "HN_NEW_10" }, // (Từ Kim Liên, Khương Thượng...)
            { name: "Phường Văn Miếu - Quốc Tử Giám", code: "HN_NEW_11" }, // (Từ Khâm Thiên, Thổ Quan...)
            { name: "Phường Láng", code: "HN_NEW_12" }, // (Từ Láng Thượng...)
            { name: "Phường Ô Chợ Dừa", code: "HN_NEW_13" },
            { name: "Phường Hồng Hà", code: "HN_NEW_14" }, // (Từ Chương Dương, Phúc Tân...)
            { name: "Phường Lĩnh Nam", code: "HN_NEW_15" },
            { name: "Phường Hoàng Mai", code: "HN_NEW_16" }, // (Từ Giáp Bát, Hoàng Liệt...)
            { name: "Phường Vĩnh Hưng", code: "HN_NEW_17" },
            { name: "Phường Tương Mai", code: "HN_NEW_18" },
            { name: "Phường Định Công", code: "HN_NEW_19" },
            { name: "Phường Hoàng Liệt", code: "HN_NEW_20" },
            { name: "Phường Yên Sở", code: "HN_NEW_21" },
            { name: "Phường Thanh Xuân", code: "HN_NEW_22" }, // (Từ Nhân Chính, Thanh Xuân Bắc...)
            { name: "Phường Khương Đình", code: "HN_NEW_23" },
            { name: "Phường Phương Liệt", code: "HN_NEW_24" },
            { name: "Phường Cầu Giấy", code: "HN_NEW_25" }, // (Từ Dịch Vọng, Quan Hoa...)
            { name: "Phường Nghĩa Đô", code: "HN_NEW_26" },
            { name: "Phường Yên Hòa", code: "HN_NEW_27" },
            { name: "Phường Tây Hồ", code: "HN_NEW_28" }, // (Từ Bưởi, Nhật Tân...)
            { name: "Phường Phú Thượng", code: "HN_NEW_29" },
            { name: "Phường Tây Tựu", code: "HN_NEW_30" },
            { name: "Phường Phú Diễn", code: "HN_NEW_31" },
            { name: "Phường Xuân Đỉnh", code: "HN_NEW_32" },
            { name: "Phường Đông Ngạc", code: "HN_NEW_33" },
            { name: "Phường Thượng Cát", code: "HN_NEW_34" },
            { name: "Phường Từ Liêm", code: "HN_NEW_35" }, // (Từ Cầu Diễn...)
            { name: "Phường Xuân Phương", code: "HN_NEW_36" },
            { name: "Phường Tây Mỗ", code: "HN_NEW_37" },
            { name: "Phường Đại Mỗ", code: "HN_NEW_38" },
            { name: "Phường Long Biên", code: "HN_NEW_39" },
            { name: "Phường Bồ Đề", code: "HN_NEW_40" },
            { name: "Phường Việt Hưng", code: "HN_NEW_41" },
            { name: "Phường Phúc Lợi", code: "HN_NEW_42" },
            { name: "Phường Hà Đông", code: "HN_NEW_43" }, // (Từ Phúc La, Vạn Phúc...)
            { name: "Phường Dương Nội", code: "HN_NEW_44" },
            { name: "Phường Yên Nghĩa", code: "HN_NEW_45" },
            { name: "Phường Phú Lương", code: "HN_NEW_46" },
            { name: "Phường Kiến Hưng", code: "HN_NEW_47" },
            { name: "Phường Thanh Liệt", code: "HN_NEW_48" },
            { name: "Phường Chương Mỹ", code: "HN_NEW_49" },
            { name: "Phường Sơn Tây", code: "HN_NEW_50" }, // (Từ Ngô Quyền, Phú Thịnh...)
            { name: "Phường Tùng Thiện", code: "HN_NEW_51" },

            // --- NHÓM XÃ MỚI (KHU VỰC NGOẠI THÀNH) ---
            { name: "Xã Thanh Trì", code: "HN_NEW_52" },
            { name: "Xã Đại Thanh", code: "HN_NEW_53" },
            { name: "Xã Nam Phù", code: "HN_NEW_54" },
            { name: "Xã Ngọc Hồi", code: "HN_NEW_55" },
            { name: "Xã Thượng Phúc", code: "HN_NEW_56" },
            { name: "Xã Thường Tín", code: "HN_NEW_57" },
            { name: "Xã Chương Dương", code: "HN_NEW_58" },
            { name: "Xã Hồng Vân", code: "HN_NEW_59" },
            { name: "Xã Phú Xuyên", code: "HN_NEW_60" },
            { name: "Xã Phượng Dực", code: "HN_NEW_61" },
            { name: "Xã Chuyên Mỹ", code: "HN_NEW_62" },
            { name: "Xã Đại Xuyên", code: "HN_NEW_63" },
            { name: "Xã Thanh Oai", code: "HN_NEW_64" },
            { name: "Xã Bình Minh", code: "HN_NEW_65" },
            { name: "Xã Tam Hưng", code: "HN_NEW_66" },
            { name: "Xã Dân Hòa", code: "HN_NEW_67" },
            { name: "Xã Vân Đình", code: "HN_NEW_68" },
            { name: "Xã Ứng Thiên", code: "HN_NEW_69" },
            { name: "Xã Hòa Xá", code: "HN_NEW_70" },
            { name: "Xã Ứng Hòa", code: "HN_NEW_71" },
            { name: "Xã Mỹ Đức", code: "HN_NEW_72" },
            { name: "Xã Hồng Sơn", code: "HN_NEW_73" },
            { name: "Xã Phúc Sơn", code: "HN_NEW_74" },
            { name: "Xã Hương Sơn", code: "HN_NEW_75" },
            { name: "Xã Phú Nghĩa", code: "HN_NEW_76" },
            { name: "Xã Xuân Mai", code: "HN_NEW_77" },
            { name: "Xã Trần Phú", code: "HN_NEW_78" },
            { name: "Xã Hòa Phú", code: "HN_NEW_79" },
            { name: "Xã Quảng Bị", code: "HN_NEW_80" },
            { name: "Xã Minh Châu", code: "HN_NEW_81" },
            { name: "Xã Quảng Oai", code: "HN_NEW_82" },
            { name: "Xã Vật Lại", code: "HN_NEW_83" },
            { name: "Xã Cổ Đô", code: "HN_NEW_84" },
            { name: "Xã Bất Bạt", code: "HN_NEW_85" },
            { name: "Xã Suối Hai", code: "HN_NEW_86" },
            { name: "Xã Ba Vì", code: "HN_NEW_87" },
            { name: "Xã Yên Bài", code: "HN_NEW_88" },
            { name: "Xã Đoài Phương", code: "HN_NEW_89" },
            { name: "Xã Phúc Thọ", code: "HN_NEW_90" },
            { name: "Xã Phúc Lộc", code: "HN_NEW_91" },
            { name: "Xã Hát Môn", code: "HN_NEW_92" },
            { name: "Xã Thạch Thất", code: "HN_NEW_93" },
            { name: "Xã Hạ Bằng", code: "HN_NEW_94" },
            { name: "Xã Tây Phương", code: "HN_NEW_95" },
            { name: "Xã Hòa Lạc", code: "HN_NEW_96" },
            { name: "Xã Yên Xuân", code: "HN_NEW_97" },
            { name: "Xã Quốc Oai", code: "HN_NEW_98" },
            { name: "Xã Hưng Đạo", code: "HN_NEW_99" },
            { name: "Xã Kiều Phú", code: "HN_NEW_100" },
            { name: "Xã Phú Cát", code: "HN_NEW_101" },
            { name: "Xã Hoài Đức", code: "HN_NEW_102" },
            { name: "Xã Dương Hòa", code: "HN_NEW_103" },
            { name: "Xã Sơn Đồng", code: "HN_NEW_104" },
            { name: "Xã An Khánh", code: "HN_NEW_105" },
            { name: "Xã Đan Phượng", code: "HN_NEW_106" },
            { name: "Xã Ô Diên", code: "HN_NEW_107" },
            { name: "Xã Liên Minh", code: "HN_NEW_108" },
            { name: "Xã Gia Lâm", code: "HN_NEW_109" },
            { name: "Xã Thuận An", code: "HN_NEW_110" },
            { name: "Xã Bát Tràng", code: "HN_NEW_111" },
            { name: "Xã Phù Đổng", code: "HN_NEW_112" },
            { name: "Xã Thư Lâm", code: "HN_NEW_113" }, // (Từ Thụy Lâm, Vân Hà...)
            { name: "Xã Đông Anh", code: "HN_NEW_114" },
            { name: "Xã Phúc Thịnh", code: "HN_NEW_115" },
            { name: "Xã Thiên Lộc", code: "HN_NEW_116" },
            { name: "Xã Vĩnh Thanh", code: "HN_NEW_117" },
            { name: "Xã Mê Linh", code: "HN_NEW_118" },
            { name: "Xã Yên Lãng", code: "HN_NEW_119" },
            { name: "Xã Tiến Thắng", code: "HN_NEW_120" },
            { name: "Xã Quang Minh", code: "HN_NEW_121" },
            { name: "Xã Sóc Sơn", code: "HN_NEW_122" },
            { name: "Xã Đa Phúc", code: "HN_NEW_123" },
            { name: "Xã Nội Bài", code: "HN_NEW_124" },
            { name: "Xã Trung Giã", code: "HN_NEW_125" },
            { name: "Xã Kim Anh", code: "HN_NEW_126" }
        ]
    },

    // =================================================================
    // TỈNH HÀ TĨNH (MỚI - SÁP NHẬP SAU 2025)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Hà Tĩnh",
        code: "42", // Mã tỉnh Hà Tĩnh cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI ---
            { name: "Xã Thạch Lạc", code: "HT_NEW_01" }, // (Từ Tượng Sơn, Thạch Thắng...)
            { name: "Xã Đồng Tiến", code: "HT_NEW_02" },
            { name: "Xã Thạch Khê", code: "HT_NEW_03" },
            { name: "Xã Cẩm Bình", code: "HT_NEW_04" }, // (Từ Cẩm Vịnh, Thạch Bình...)
            { name: "Xã Kỳ Xuân", code: "HT_NEW_05" },
            { name: "Xã Kỳ Anh", code: "HT_NEW_06" }, // (Từ TT Kỳ Đồng...)
            { name: "Xã Kỳ Hoa", code: "HT_NEW_07" },
            { name: "Xã Kỳ Văn", code: "HT_NEW_08" },
            { name: "Xã Kỳ Khang", code: "HT_NEW_09" },
            { name: "Xã Kỳ Lạc", code: "HT_NEW_10" },
            { name: "Xã Kỳ Thượng", code: "HT_NEW_11" },
            { name: "Xã Cẩm Xuyên", code: "HT_NEW_12" }, // (Từ TT Cẩm Xuyên...)
            { name: "Xã Thiên Cầm", code: "HT_NEW_13" }, // (Từ TT Thiên Cầm...)
            { name: "Xã Cẩm Duệ", code: "HT_NEW_14" },
            { name: "Xã Cẩm Hưng", code: "HT_NEW_15" },
            { name: "Xã Cẩm Lạc", code: "HT_NEW_16" },
            { name: "Xã Cẩm Trung", code: "HT_NEW_17" },
            { name: "Xã Yên Hòa", code: "HT_NEW_18" },
            { name: "Xã Thạch Hà", code: "HT_NEW_19" }, // (Từ TT Thạch Hà...)
            { name: "Xã Toàn Lưu", code: "HT_NEW_20" },
            { name: "Xã Việt Xuyên", code: "HT_NEW_21" },
            { name: "Xã Đông Kinh", code: "HT_NEW_22" },
            { name: "Xã Thạch Xuân", code: "HT_NEW_23" },
            { name: "Xã Lộc Hà", code: "HT_NEW_24" }, // (Từ TT Lộc Hà...)
            { name: "Xã Hồng Lộc", code: "HT_NEW_25" },
            { name: "Xã Mai Phụ", code: "HT_NEW_26" },
            { name: "Xã Can Lộc", code: "HT_NEW_27" }, // (Từ TT Nghèn...)
            { name: "Xã Tùng Lộc", code: "HT_NEW_28" },
            { name: "Xã Gia Hanh", code: "HT_NEW_29" },
            { name: "Xã Trường Lưu", code: "HT_NEW_30" },
            { name: "Xã Xuân Lộc", code: "HT_NEW_31" },
            { name: "Xã Đồng Lộc", code: "HT_NEW_32" },
            { name: "Xã Tiên Điền", code: "HT_NEW_33" }, // (Từ TT Tiên Điền...)
            { name: "Xã Nghi Xuân", code: "HT_NEW_34" }, // (Từ TT Xuân An...)
            { name: "Xã Cổ Đạm", code: "HT_NEW_35" },
            { name: "Xã Đan Hải", code: "HT_NEW_36" },
            { name: "Xã Đức Thọ", code: "HT_NEW_37" }, // (Từ TT Đức Thọ...)
            { name: "Xã Đức Đồng", code: "HT_NEW_38" },
            { name: "Xã Đức Quang", code: "HT_NEW_39" },
            { name: "Xã Đức Thịnh", code: "HT_NEW_40" },
            { name: "Xã Đức Minh", code: "HT_NEW_41" },
            { name: "Xã Hương Sơn", code: "HT_NEW_42" }, // (Từ TT Phố Châu...)
            { name: "Xã Sơn Tây", code: "HT_NEW_43" }, // (Từ TT Tây Sơn...)
            { name: "Xã Tứ Mỹ", code: "HT_NEW_44" },
            { name: "Xã Sơn Giang", code: "HT_NEW_45" },
            { name: "Xã Sơn Tiến", code: "HT_NEW_46" },
            { name: "Xã Sơn Hồng", code: "HT_NEW_47" },
            { name: "Xã Kim Hoa", code: "HT_NEW_48" },
            { name: "Xã Vũ Quang", code: "HT_NEW_49" }, // (Từ TT Vũ Quang...)
            { name: "Xã Mai Hoa", code: "HT_NEW_50" },
            { name: "Xã Thượng Đức", code: "HT_NEW_51" },
            { name: "Xã Hương Khê", code: "HT_NEW_52" }, // (Từ TT Hương Khê...)
            { name: "Xã Hương Phố", code: "HT_NEW_53" },
            { name: "Xã Hương Đô", code: "HT_NEW_54" },
            { name: "Xã Hà Linh", code: "HT_NEW_55" },
            { name: "Xã Hương Bình", code: "HT_NEW_56" },
            { name: "Xã Phúc Trạch", code: "HT_NEW_57" },
            { name: "Xã Hương Xuân", code: "HT_NEW_58" },

            // --- NHÓM PHƯỜNG MỚI (TP HÀ TĨNH, TX KỲ ANH, TX HỒNG LĨNH) ---
            { name: "Phường Thành Sen", code: "HT_NEW_59" }, // (Từ Bắc Hà, Thạch Quý...)
            { name: "Phường Trần Phú", code: "HT_NEW_60" }, // (Từ Thạch Trung...)
            { name: "Phường Hà Huy Tập", code: "HT_NEW_61" }, // (Từ Tân Lâm Hương...)
            { name: "Phường Vũng Áng", code: "HT_NEW_62" }, // (Từ Kỳ Long, Kỳ Thịnh...)
            { name: "Phường Sông Trí", code: "HT_NEW_63" }, // (Từ Hưng Trí...)
            { name: "Phường Hoành Sơn", code: "HT_NEW_64" }, // (Từ Kỳ Nam, Kỳ Phương...)
            { name: "Phường Hải Ninh", code: "HT_NEW_65" }, // (Từ Kỳ Ninh...)
            { name: "Phường Bắc Hồng Lĩnh", code: "HT_NEW_66" }, // (Từ Bắc Hồng, Đức Thuận...)
            { name: "Phường Nam Hồng Lĩnh", code: "HT_NEW_67" }, // (Từ Nam Hồng, Đậu Liêu...)

            // --- XÃ GIỮ NGUYÊN ---
            { name: "Xã Sơn Kim 1", code: "HT_OLD_01" },
            { name: "Xã Sơn Kim 2", code: "HT_OLD_02" }
        ]
    },

    // =================================================================
    // THÀNH PHỐ HẢI PHÒNG (MỚI - SÁP NHẬP HẢI PHÒNG + HẢI DƯƠNG)
    // Cấu trúc: Bỏ cấp Quận/Huyện, Phường/Xã trực thuộc Thành phố
    // =================================================================
    {
        name: "Thành phố Hải Phòng",
        code: "31", // Mã TP Hải Phòng cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn TP -> Chọn Phường/Xã luôn
        wards: [
            // --- NHÓM PHƯỜNG MỚI (KHU VỰC HẢI PHÒNG CŨ) ---
            { name: "Phường Thủy Nguyên", code: "HP_NEW_01" }, // (Từ Dương Quan, Thủy Đường...)
            { name: "Phường Thiên Hương", code: "HP_NEW_02" },
            { name: "Phường Hòa Bình", code: "HP_NEW_03" },
            { name: "Phường Nam Triệu", code: "HP_NEW_04" },
            { name: "Phường Bạch Đằng", code: "HP_NEW_05" },
            { name: "Phường Lưu Kiếm", code: "HP_NEW_06" },
            { name: "Phường Lê Ích Mộc", code: "HP_NEW_07" },
            { name: "Phường Hồng Bàng", code: "HP_NEW_08" }, // (Từ Hoàng Văn Thụ...)
            { name: "Phường Hồng An", code: "HP_NEW_09" }, // (Từ Quán Toan...)
            { name: "Phường Ngô Quyền", code: "HP_NEW_10" }, // (Từ Máy Chai...)
            { name: "Phường Gia Viên", code: "HP_NEW_11" },
            { name: "Phường Lê Chân", code: "HP_NEW_12" }, // (Từ Hàng Kênh...)
            { name: "Phường An Biên", code: "HP_NEW_13" },
            { name: "Phường Hải An", code: "HP_NEW_14" }, // (Từ Cát Bi...)
            { name: "Phường Đông Hải", code: "HP_NEW_15" },
            { name: "Phường Kiến An", code: "HP_NEW_16" }, // (Từ Nam Sơn, Đồng Hòa...)
            { name: "Phường Phù Liễn", code: "HP_NEW_17" },
            { name: "Phường Nam Đồ Sơn", code: "HP_NEW_18" }, // (Từ Minh Đức, Bàng La...)
            { name: "Phường Đồ Sơn", code: "HP_NEW_19" },
            { name: "Phường Hưng Đạo", code: "HP_NEW_20" }, // (Từ Đa Phúc...)
            { name: "Phường Dương Kinh", code: "HP_NEW_21" },
            { name: "Phường An Dương", code: "HP_NEW_22" }, // (Từ Nam Sơn, An Hải...)
            { name: "Phường An Hải", code: "HP_NEW_23" },
            { name: "Phường An Phong", code: "HP_NEW_24" },

            // --- NHÓM PHƯỜNG MỚI (KHU VỰC HẢI DƯƠNG CŨ - THEO VĂN BẢN) ---
            { name: "Phường Hải Dương", code: "HP_NEW_25" }, // (Từ Trần Hưng Đạo, Nhị Châu...)
            { name: "Phường Lê Thanh Nghị", code: "HP_NEW_26" },
            { name: "Phường Việt Hòa", code: "HP_NEW_27" },
            { name: "Phường Thành Đông", code: "HP_NEW_28" }, // (Từ Cẩm Thượng...)
            { name: "Phường Nam Đồng", code: "HP_NEW_29" },
            { name: "Phường Tân Hưng", code: "HP_NEW_30" },
            { name: "Phường Thạch Khôi", code: "HP_NEW_31" },
            { name: "Phường Tứ Minh", code: "HP_NEW_32" },
            { name: "Phường Ái Quốc", code: "HP_NEW_33" },
            { name: "Phường Chu Văn An", code: "HP_NEW_34" }, // (Chí Linh)
            { name: "Phường Chí Linh", code: "HP_NEW_35" },
            { name: "Phường Trần Hưng Đạo", code: "HP_NEW_36" },
            { name: "Phường Nguyễn Trãi", code: "HP_NEW_37" },
            { name: "Phường Trần Nhân Tông", code: "HP_NEW_38" },
            { name: "Phường Lê Đại Hành", code: "HP_NEW_39" },
            { name: "Phường Kinh Môn", code: "HP_NEW_40" },
            { name: "Phường Nguyễn Đại Năng", code: "HP_NEW_41" },
            { name: "Phường Trần Liễu", code: "HP_NEW_42" },
            { name: "Phường Bắc An Phụ", code: "HP_NEW_43" },
            { name: "Phường Phạm Sư Mạnh", code: "HP_NEW_44" },
            { name: "Phường Nhị Chiểu", code: "HP_NEW_45" },

            // --- NHÓM XÃ MỚI ---
            { name: "Xã An Hưng", code: "HP_NEW_46" }, // (An Lão/Kiến Thụy...)
            { name: "Xã An Khánh", code: "HP_NEW_47" },
            { name: "Xã An Quang", code: "HP_NEW_48" },
            { name: "Xã An Trường", code: "HP_NEW_49" },
            { name: "Xã An Lão", code: "HP_NEW_50" },
            { name: "Xã Kiến Thụy", code: "HP_NEW_51" },
            { name: "Xã Kiến Minh", code: "HP_NEW_52" },
            { name: "Xã Kiến Hải", code: "HP_NEW_53" },
            { name: "Xã Kiến Hưng", code: "HP_NEW_54" },
            { name: "Xã Nghi Dương", code: "HP_NEW_55" },
            { name: "Xã Quyết Thắng", code: "HP_NEW_56" }, // (Tiên Lãng)
            { name: "Xã Tiên Lãng", code: "HP_NEW_57" },
            { name: "Xã Tân Minh", code: "HP_NEW_58" },
            { name: "Xã Tiên Minh", code: "HP_NEW_59" },
            { name: "Xã Chấn Hưng", code: "HP_NEW_60" },
            { name: "Xã Hùng Thắng", code: "HP_NEW_61" },
            { name: "Xã Vĩnh Bảo", code: "HP_NEW_62" },
            { name: "Xã Nguyễn Bỉnh Khiêm", code: "HP_NEW_63" },
            { name: "Xã Vĩnh Am", code: "HP_NEW_64" },
            { name: "Xã Vĩnh Hải", code: "HP_NEW_65" },
            { name: "Xã Vĩnh Hòa", code: "HP_NEW_66" },
            { name: "Xã Vĩnh Thịnh", code: "HP_NEW_67" },
            { name: "Xã Vĩnh Thuận", code: "HP_NEW_68" },
            { name: "Xã Việt Khê", code: "HP_NEW_69" },
            { name: "Xã Nam An Phụ", code: "HP_NEW_70" },
            { name: "Xã Nam Sách", code: "HP_NEW_71" },
            { name: "Xã Thái Tân", code: "HP_NEW_72" },
            { name: "Xã Trần Phú", code: "HP_NEW_73" },
            { name: "Xã Hợp Tiến", code: "HP_NEW_74" },
            { name: "Xã An Phú", code: "HP_NEW_75" },
            { name: "Xã Thanh Hà", code: "HP_NEW_76" },
            { name: "Xã Hà Tây", code: "HP_NEW_77" },
            { name: "Xã Hà Bắc", code: "HP_NEW_78" },
            { name: "Xã Hà Nam", code: "HP_NEW_79" },
            { name: "Xã Hà Đông", code: "HP_NEW_80" },
            { name: "Xã Mao Điền", code: "HP_NEW_81" }, // (Cẩm Giàng)
            { name: "Xã Cẩm Giàng", code: "HP_NEW_82" },
            { name: "Xã Cẩm Giang", code: "HP_NEW_83" },
            { name: "Xã Tuệ Tĩnh", code: "HP_NEW_84" },
            { name: "Xã Kẻ Sặt", code: "HP_NEW_85" }, // (Bình Giang)
            { name: "Xã Bình Giang", code: "HP_NEW_86" },
            { name: "Xã Đường An", code: "HP_NEW_87" },
            { name: "Xã Thượng Hồng", code: "HP_NEW_88" },
            { name: "Xã Gia Lộc", code: "HP_NEW_89" },
            { name: "Xã Yết Kiêu", code: "HP_NEW_90" },
            { name: "Xã Gia Phúc", code: "HP_NEW_91" },
            { name: "Xã Trường Tân", code: "HP_NEW_92" },
            { name: "Xã Tứ Kỳ", code: "HP_NEW_93" },
            { name: "Xã Tân Kỳ", code: "HP_NEW_94" },
            { name: "Xã Đại Sơn", code: "HP_NEW_95" },
            { name: "Xã Chí Minh", code: "HP_NEW_96" },
            { name: "Xã Lạc Phượng", code: "HP_NEW_97" },
            { name: "Xã Nguyên Giáp", code: "HP_NEW_98" },
            { name: "Xã Ninh Giang", code: "HP_NEW_99" },
            { name: "Xã Vĩnh Lại", code: "HP_NEW_100" },
            { name: "Xã Khúc Thừa Dụ", code: "HP_NEW_101" },
            { name: "Xã Tân An", code: "HP_NEW_102" },
            { name: "Xã Hồng Châu", code: "HP_NEW_103" },
            { name: "Xã Thanh Miện", code: "HP_NEW_104" },
            { name: "Xã Bắc Thanh Miện", code: "HP_NEW_105" },
            { name: "Xã Hải Hưng", code: "HP_NEW_106" },
            { name: "Xã Nguyễn Lương Bằng", code: "HP_NEW_107" },
            { name: "Xã Nam Thanh Miện", code: "HP_NEW_108" },
            { name: "Xã Phú Thái", code: "HP_NEW_109" },
            { name: "Xã Lai Khê", code: "HP_NEW_110" },
            { name: "Xã An Thành", code: "HP_NEW_111" },
            { name: "Xã Kim Thành", code: "HP_NEW_112" },

            // --- ĐẶC KHU ---
            { name: "Đặc khu Cát Hải", code: "HP_NEW_113" }, // (Từ Cát Bà, Cát Hải)
            { name: "Đặc khu Bạch Long Vĩ", code: "HP_NEW_114" }
        ]
    },

    // =================================================================
    // TỈNH HƯNG YÊN (MỚI - SÁP NHẬP HƯNG YÊN + THÁI BÌNH)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Hưng Yên",
        code: "33", // Mã tỉnh Hưng Yên cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC HƯNG YÊN CŨ) ---
            { name: "Xã Tân Hưng", code: "HY_NEW_01" }, // (Từ Thủ Sỹ, Phương Nam...)
            { name: "Xã Hoàng Hoa Thám", code: "HY_NEW_02" }, // (Từ TT Vương, Hưng Đạo...)
            { name: "Xã Tiên Lữ", code: "HY_NEW_03" }, // (Từ Thiện Phiến...)
            { name: "Xã Tiên Hoa", code: "HY_NEW_04" },
            { name: "Xã Quang Hưng", code: "HY_NEW_05" }, // (Từ TT Trần Cao...)
            { name: "Xã Đoàn Đào", code: "HY_NEW_06" },
            { name: "Xã Tiên Tiến", code: "HY_NEW_07" },
            { name: "Xã Tống Trân", code: "HY_NEW_08" },
            { name: "Xã Lương Bằng", code: "HY_NEW_09" }, // (Từ TT Lương Bằng...)
            { name: "Xã Nghĩa Dân", code: "HY_NEW_10" },
            { name: "Xã Hiệp Cường", code: "HY_NEW_11" },
            { name: "Xã Đức Hợp", code: "HY_NEW_12" },
            { name: "Xã Ân Thi", code: "HY_NEW_13" }, // (Từ TT Ân Thi...)
            { name: "Xã Xuân Trúc", code: "HY_NEW_14" },
            { name: "Xã Phạm Ngũ Lão", code: "HY_NEW_15" },
            { name: "Xã Nguyễn Trãi", code: "HY_NEW_16" },
            { name: "Xã Hồng Quang", code: "HY_NEW_17" },
            { name: "Xã Khoái Châu", code: "HY_NEW_18" }, // (Từ TT Khoái Châu...)
            { name: "Xã Triệu Việt Vương", code: "HY_NEW_19" },
            { name: "Xã Việt Tiến", code: "HY_NEW_20" },
            { name: "Xã Chí Minh", code: "HY_NEW_21" },
            { name: "Xã Châu Ninh", code: "HY_NEW_22" },
            { name: "Xã Yên Mỹ", code: "HY_NEW_23" }, // (Từ TT Yên Mỹ...)
            { name: "Xã Việt Yên", code: "HY_NEW_24" },
            { name: "Xã Hoàn Long", code: "HY_NEW_25" },
            { name: "Xã Nguyễn Văn Linh", code: "HY_NEW_26" },
            { name: "Xã Như Quỳnh", code: "HY_NEW_27" }, // (Từ TT Như Quỳnh...)
            { name: "Xã Lạc Đạo", code: "HY_NEW_28" },
            { name: "Xã Đại Đồng", code: "HY_NEW_29" },
            { name: "Xã Nghĩa Trụ", code: "HY_NEW_30" },
            { name: "Xã Phụng Công", code: "HY_NEW_31" },
            { name: "Xã Văn Giang", code: "HY_NEW_32" }, // (Từ TT Văn Giang...)
            { name: "Xã Mễ Sở", code: "HY_NEW_33" },

            // --- NHÓM XÃ MỚI (KHU VỰC THÁI BÌNH CŨ - THEO VĂN BẢN) ---
            { name: "Xã Thái Thụy", code: "HY_NEW_34" }, // (Từ TT Diêm Điền...)
            { name: "Xã Đông Thụy Anh", code: "HY_NEW_35" },
            { name: "Xã Bắc Thụy Anh", code: "HY_NEW_36" },
            { name: "Xã Thụy Anh", code: "HY_NEW_37" },
            { name: "Xã Nam Thụy Anh", code: "HY_NEW_38" },
            { name: "Xã Bắc Thái Ninh", code: "HY_NEW_39" },
            { name: "Xã Thái Ninh", code: "HY_NEW_40" },
            { name: "Xã Đông Thái Ninh", code: "HY_NEW_41" },
            { name: "Xã Nam Thái Ninh", code: "HY_NEW_42" },
            { name: "Xã Tây Thái Ninh", code: "HY_NEW_43" },
            { name: "Xã Tây Thụy Anh", code: "HY_NEW_44" },
            { name: "Xã Tiền Hải", code: "HY_NEW_45" }, // (Từ TT Tiền Hải...)
            { name: "Xã Tây Tiền Hải", code: "HY_NEW_46" },
            { name: "Xã Ái Quốc", code: "HY_NEW_47" },
            { name: "Xã Đồng Châu", code: "HY_NEW_48" },
            { name: "Xã Đông Tiền Hải", code: "HY_NEW_49" },
            { name: "Xã Nam Cường", code: "HY_NEW_50" },
            { name: "Xã Hưng Phú", code: "HY_NEW_51" },
            { name: "Xã Nam Tiền Hải", code: "HY_NEW_52" },
            { name: "Xã Đông Hưng", code: "HY_NEW_53" }, // (Từ TT Đông Hưng...)
            { name: "Xã Bắc Tiên Hưng", code: "HY_NEW_54" },
            { name: "Xã Đông Tiên Hưng", code: "HY_NEW_55" },
            { name: "Xã Nam Đông Hưng", code: "HY_NEW_56" },
            { name: "Xã Bắc Đông Quan", code: "HY_NEW_57" },
            { name: "Xã Bắc Đông Hưng", code: "HY_NEW_58" },
            { name: "Xã Đông Quan", code: "HY_NEW_59" },
            { name: "Xã Nam Tiên Hưng", code: "HY_NEW_60" },
            { name: "Xã Tiên Hưng", code: "HY_NEW_61" },
            { name: "Xã Quỳnh Phụ", code: "HY_NEW_62" }, // (Từ TT Quỳnh Côi...)
            { name: "Xã Minh Thọ", code: "HY_NEW_63" },
            { name: "Xã Nguyễn Du", code: "HY_NEW_64" },
            { name: "Xã Quỳnh An", code: "HY_NEW_65" },
            { name: "Xã Ngọc Lâm", code: "HY_NEW_66" },
            { name: "Xã Đồng Bằng", code: "HY_NEW_67" },
            { name: "Xã A Sào", code: "HY_NEW_68" },
            { name: "Xã Phụ Dực", code: "HY_NEW_69" }, // (Từ TT An Bài...)
            { name: "Xã Tân Tiến", code: "HY_NEW_70" },
            { name: "Xã Hưng Hà", code: "HY_NEW_71" }, // (Từ TT Hưng Hà...)
            { name: "Xã Tiên La", code: "HY_NEW_72" },
            { name: "Xã Lê Quý Đôn", code: "HY_NEW_73" },
            { name: "Xã Hồng Minh", code: "HY_NEW_74" },
            { name: "Xã Thần Khê", code: "HY_NEW_75" },
            { name: "Xã Diên Hà", code: "HY_NEW_76" },
            { name: "Xã Ngự Thiên", code: "HY_NEW_77" },
            { name: "Xã Long Hưng", code: "HY_NEW_78" }, // (Từ TT Hưng Nhân...)
            { name: "Xã Kiến Xương", code: "HY_NEW_79" }, // (Từ TT Kiến Xương...)
            { name: "Xã Lê Lợi", code: "HY_NEW_80" },
            { name: "Xã Quang Lịch", code: "HY_NEW_81" },
            { name: "Xã Vũ Quý", code: "HY_NEW_82" },
            { name: "Xã Bình Thanh", code: "HY_NEW_83" },
            { name: "Xã Bình Định", code: "HY_NEW_84" },
            { name: "Xã Hồng Vũ", code: "HY_NEW_85" },
            { name: "Xã Bình Nguyên", code: "HY_NEW_86" },
            { name: "Xã Trà Giang", code: "HY_NEW_87" },
            { name: "Xã Vũ Thư", code: "HY_NEW_88" }, // (Từ TT Vũ Thư...)
            { name: "Xã Thư Trì", code: "HY_NEW_89" },
            { name: "Xã Tân Thuận", code: "HY_NEW_90" },
            { name: "Xã Thư Vũ", code: "HY_NEW_91" },
            { name: "Xã Vũ Tiên", code: "HY_NEW_92" },
            { name: "Xã Vạn Xuân", code: "HY_NEW_93" },

            // --- NHÓM PHƯỜNG MỚI ---
            { name: "Phường Phố Hiến", code: "HY_NEW_94" }, // (TP Hưng Yên)
            { name: "Phường Sơn Nam", code: "HY_NEW_95" },
            { name: "Phường Hồng Châu", code: "HY_NEW_96" },
            { name: "Phường Mỹ Hào", code: "HY_NEW_97" }, // (TX Mỹ Hào)
            { name: "Phường Đường Hào", code: "HY_NEW_98" },
            { name: "Phường Thượng Hồng", code: "HY_NEW_99" },
            { name: "Phường Thái Bình", code: "HY_NEW_100" }, // (TP Thái Bình)
            { name: "Phường Trần Lãm", code: "HY_NEW_101" },
            { name: "Phường Trần Hưng Đạo", code: "HY_NEW_102" },
            { name: "Phường Trà Lý", code: "HY_NEW_103" },
            { name: "Phường Vũ Phúc", code: "HY_NEW_104" }
        ]
    },

    // =================================================================
    // TỈNH KHÁNH HÒA (MỚI - BAO GỒM CẢ KHU VỰC NINH THUẬN CŨ THEO VĂN BẢN)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Khánh Hòa",
        code: "56", // Mã tỉnh Khánh Hòa cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC KHÁNH HÒA CŨ) ---
            { name: "Xã Nam Cam Ranh", code: "KH_NEW_01" }, // (Từ Cam Lập, Cam Bình...)
            { name: "Xã Bắc Ninh Hòa", code: "KH_NEW_02" }, // (Từ Ninh An, Ninh Sơn...)
            { name: "Xã Tân Định", code: "KH_NEW_03" },
            { name: "Xã Nam Ninh Hòa", code: "KH_NEW_04" },
            { name: "Xã Tây Ninh Hòa", code: "KH_NEW_05" },
            { name: "Xã Hòa Trí", code: "KH_NEW_06" },
            { name: "Xã Đại Lãnh", code: "KH_NEW_07" }, // (Từ Vạn Thạnh...)
            { name: "Xã Tu Bông", code: "KH_NEW_08" },
            { name: "Xã Vạn Thắng", code: "KH_NEW_09" },
            { name: "Xã Vạn Ninh", code: "KH_NEW_10" }, // (Từ TT Vạn Giã...)
            { name: "Xã Vạn Hưng", code: "KH_NEW_11" },
            { name: "Xã Diên Khánh", code: "KH_NEW_12" }, // (Từ TT Diên Khánh...)
            { name: "Xã Diên Lạc", code: "KH_NEW_13" },
            { name: "Xã Diên Điền", code: "KH_NEW_14" },
            { name: "Xã Diên Lâm", code: "KH_NEW_15" },
            { name: "Xã Diên Thọ", code: "KH_NEW_16" },
            { name: "Xã Suối Hiệp", code: "KH_NEW_17" },
            { name: "Xã Cam Lâm", code: "KH_NEW_18" }, // (Từ TT Cam Đức...)
            { name: "Xã Suối Dầu", code: "KH_NEW_19" },
            { name: "Xã Cam Hiệp", code: "KH_NEW_20" },
            { name: "Xã Cam An", code: "KH_NEW_21" },
            { name: "Xã Bắc Khánh Vĩnh", code: "KH_NEW_22" },
            { name: "Xã Trung Khánh Vĩnh", code: "KH_NEW_23" },
            { name: "Xã Tây Khánh Vĩnh", code: "KH_NEW_24" },
            { name: "Xã Nam Khánh Vĩnh", code: "KH_NEW_25" },
            { name: "Xã Khánh Vĩnh", code: "KH_NEW_26" }, // (Từ TT Khánh Vĩnh...)
            { name: "Xã Khánh Sơn", code: "KH_NEW_27" }, // (Từ TT Tô Hạp...)
            { name: "Xã Tây Khánh Sơn", code: "KH_NEW_28" },
            { name: "Xã Đông Khánh Sơn", code: "KH_NEW_29" },

            // --- NHÓM XÃ MỚI (KHU VỰC NINH THUẬN CŨ - THEO VĂN BẢN) ---
            { name: "Xã Ninh Phước", code: "KH_NEW_30" }, // (Từ TT Phước Dân...)
            { name: "Xã Phước Hữu", code: "KH_NEW_31" },
            { name: "Xã Phước Hậu", code: "KH_NEW_32" },
            { name: "Xã Thuận Nam", code: "KH_NEW_33" },
            { name: "Xã Cà Ná", code: "KH_NEW_34" },
            { name: "Xã Phước Hà", code: "KH_NEW_35" },
            { name: "Xã Phước Dinh", code: "KH_NEW_36" },
            { name: "Xã Ninh Hải", code: "KH_NEW_37" },
            { name: "Xã Xuân Hải", code: "KH_NEW_38" },
            { name: "Xã Vĩnh Hải", code: "KH_NEW_39" },
            { name: "Xã Thuận Bắc", code: "KH_NEW_40" },
            { name: "Xã Công Hải", code: "KH_NEW_41" },
            { name: "Xã Ninh Sơn", code: "KH_NEW_42" }, // (Từ TT Tân Sơn...)
            { name: "Xã Lâm Sơn", code: "KH_NEW_43" },
            { name: "Xã Anh Dũng", code: "KH_NEW_44" },
            { name: "Xã Mỹ Sơn", code: "KH_NEW_45" },
            { name: "Xã Bác Ái Đông", code: "KH_NEW_46" },
            { name: "Xã Bác Ái", code: "KH_NEW_47" },
            { name: "Xã Bác Ái Tây", code: "KH_NEW_48" },

            // --- NHÓM PHƯỜNG MỚI (KHU VỰC NHA TRANG, CAM RANH, NINH HÒA) ---
            { name: "Phường Nha Trang", code: "KH_NEW_49" }, // (Từ Vạn Thạnh, Lộc Thọ...)
            { name: "Phường Bắc Nha Trang", code: "KH_NEW_50" }, // (Từ Vĩnh Hòa...)
            { name: "Phường Tây Nha Trang", code: "KH_NEW_51" }, // (Từ Ngọc Hiệp...)
            { name: "Phường Nam Nha Trang", code: "KH_NEW_52" }, // (Từ Phước Hải...)
            { name: "Phường Bắc Cam Ranh", code: "KH_NEW_53" }, // (Từ Cam Nghĩa...)
            { name: "Phường Cam Ranh", code: "KH_NEW_54" },
            { name: "Phường Cam Linh", code: "KH_NEW_55" },
            { name: "Phường Ba Ngòi", code: "KH_NEW_56" },
            { name: "Phường Ninh Hòa", code: "KH_NEW_57" }, // (Từ Ninh Hiệp...)
            { name: "Phường Đông Ninh Hòa", code: "KH_NEW_58" },
            { name: "Phường Hòa Thắng", code: "KH_NEW_59" },

            // --- NHÓM PHƯỜNG MỚI (KHU VỰC PHAN RANG - THÁP CHÀM CŨ) ---
            { name: "Phường Phan Rang", code: "KH_NEW_60" }, // (Từ Kinh Dinh, Phủ Hà...)
            { name: "Phường Đông Hải", code: "KH_NEW_61" },
            { name: "Phường Ninh Chử", code: "KH_NEW_62" }, // (Từ TT Khánh Hải...)
            { name: "Phường Bảo An", code: "KH_NEW_63" },
            { name: "Phường Đô Vinh", code: "KH_NEW_64" },

            // --- ĐẶC KHU ---
            { name: "Đặc khu Trường Sa", code: "KH_NEW_65" }
        ]
    },

    // =================================================================
    // TỈNH LAI CHÂU (MỚI - SAU SÁP NHẬP)
    // Cấu trúc: Bỏ cấp Huyện, Xã/Phường trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Lai Châu",
        code: "12", // Mã tỉnh Lai Châu cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC THAN UYÊN CŨ) ---
            { name: "Xã Mường Kim", code: "LC_NEW_01" }, // (Từ Tà Mung, Tà Hừa, Pha Mu, Mường Kim)
            { name: "Xã Khoen On", code: "LC_NEW_02" }, // (Từ Ta Gia, Khoen On)
            { name: "Xã Than Uyên", code: "LC_NEW_03" }, // (Từ TT Than Uyên, Mường Than, Hua Nà, Mường Cang)
            { name: "Xã Mường Than", code: "LC_NEW_04" }, // (Từ Phúc Than, Mường Mít - Lấy tên Mường Than mới)
            { name: "Xã Pắc Ta", code: "LC_NEW_05" }, // (Từ Hố Mít, Pắc Ta)
            { name: "Xã Nậm Sỏ", code: "LC_NEW_06" }, // (Từ Tà Mít, Nậm Sỏ)

            // --- NHÓM XÃ MỚI (KHU VỰC TÂN UYÊN CŨ) ---
            { name: "Xã Tân Uyên", code: "LC_NEW_07" }, // (Từ TT Tân Uyên, Trung Đồng...)
            { name: "Xã Mường Khoa", code: "LC_NEW_08" },
            { name: "Xã Bản Bo", code: "LC_NEW_09" }, // (Từ Nà Tăm, Bản Bo)

            // --- NHÓM XÃ MỚI (KHU VỰC TAM ĐƯỜNG CŨ) ---
            { name: "Xã Bình Lư", code: "LC_NEW_10" }, // (Từ TT Tam Đường, Sơn Bình, Bình Lư)
            { name: "Xã Tả Lèng", code: "LC_NEW_11" }, // (Từ Giang Ma, Hồ Thầu, Tả Lèng)
            { name: "Xã Khun Há", code: "LC_NEW_12" }, // (Từ Bản Hon, Khun Há)
            { name: "Xã Sin Suối Hồ", code: "LC_NEW_13" }, // (Từ Nậm Xe, Thèn Sin, Sin Suối Hồ)

            // --- NHÓM XÃ MỚI (KHU VỰC PHONG THỔ CŨ) ---
            { name: "Xã Phong Thổ", code: "LC_NEW_14" }, // (Từ TT Phong Thổ, Huổi Luông...)
            { name: "Xã Dào San", code: "LC_NEW_15" }, // (Từ Tung Qua Lìn, Mù Sang, Dào San)
            { name: "Xã Sì Lở Lầu", code: "LC_NEW_16" }, // (Từ Vàng Ma Chải, Mồ Sì San...)
            { name: "Xã Khổng Lào", code: "LC_NEW_17" }, // (Từ Hoang Thèn, Bản Lang, Khổng Lào)

            // --- NHÓM XÃ MỚI (KHU VỰC SÌN HỒ CŨ) ---
            { name: "Xã Tủa Sín Chải", code: "LC_NEW_18" }, // (Từ Làng Mô, Tả Ngảo...)
            { name: "Xã Sìn Hồ", code: "LC_NEW_19" }, // (Từ TT Sìn Hồ, Sà Dề Phìn...)
            { name: "Xã Hồng Thu", code: "LC_NEW_20" }, // (Từ Phìn Hồ, Ma Quai...)
            { name: "Xã Nậm Tăm", code: "LC_NEW_21" }, // (Từ Lùng Thàng, Nậm Cha...)
            { name: "Xã Pu Sam Cáp", code: "LC_NEW_22" }, // (Từ Pa Khóa, Noong Hẻo...)
            { name: "Xã Nậm Cuổi", code: "LC_NEW_23" }, // (Từ Nậm Hăn, Nậm Cuổi)
            { name: "Xã Nậm Mạ", code: "LC_NEW_24" }, // (Từ Căn Co, Nậm Mạ)
            { name: "Xã Lê Lợi", code: "LC_NEW_25" }, // (Từ Nậm Pì, Pú Đao, Chăn Nưa, Lê Lợi)

            // --- NHÓM XÃ MỚI (KHU VỰC NẬM NHÙN CŨ) ---
            { name: "Xã Nậm Hàng", code: "LC_NEW_26" }, // (Từ TT Nậm Nhùn, Nậm Manh, Nậm Hàng)
            { name: "Xã Mường Mô", code: "LC_NEW_27" }, // (Từ Nậm Chà, Mường Mô)
            { name: "Xã Hua Bum", code: "LC_NEW_28" }, // (Từ Vàng San, Hua Bum)

            // --- NHÓM XÃ MỚI (KHU VỰC MƯỜNG TÈ CŨ) ---
            { name: "Xã Pa Tần", code: "LC_NEW_29" }, // (Từ Nậm Ban, Trung Chải, Pa Tần)
            { name: "Xã Bum Nưa", code: "LC_NEW_30" }, // (Từ Pa Vệ Sủ, Bum Nưa)
            { name: "Xã Bum Tở", code: "LC_NEW_31" }, // (Từ TT Mường Tè, Can Hồ, Bum Tở)
            { name: "Xã Mường Tè", code: "LC_NEW_32" }, // (Từ Nậm Khao, Mường Tè)
            { name: "Xã Thu Lũm", code: "LC_NEW_33" }, // (Từ Ka Lăng, Thu Lũm)
            { name: "Xã Pa Ủ", code: "LC_NEW_34" }, // (Từ Tá Bạ, Pa Ủ)

            // --- NHÓM PHƯỜNG MỚI (TP LAI CHÂU CŨ) ---
            { name: "Phường Tân Phong", code: "LC_NEW_35" }, // (Từ Tân Phong, Đông Phong, San Thàng...)
            { name: "Phường Đoàn Kết", code: "LC_NEW_36" }, // (Từ Đoàn Kết, Quyết Tiến, Quyết Thắng...)

            // --- XÃ GIỮ NGUYÊN ---
            { name: "Xã Mù Cả", code: "LC_OLD_01" },
            { name: "Xã Tà Tổng", code: "LC_OLD_02" }
        ]
    },

    // =================================================================
    // TỈNH LÂM ĐỒNG (MỚI - BAO GỒM CẢ BÌNH THUẬN + ĐẮK NÔNG + ĐÀ LẠT MỞ RỘNG)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Lâm Đồng",
        code: "68", // Mã tỉnh Lâm Đồng cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC LÂM ĐỒNG CŨ) ---
            { name: "Xã Lạc Dương", code: "LD_NEW_01" }, // (Từ Đạ Sar, Đạ Nhim...)
            { name: "Xã Đơn Dương", code: "LD_NEW_02" }, // (Từ TT Thạnh Mỹ...)
            { name: "Xã Ka Đô", code: "LD_NEW_03" },
            { name: "Xã Quảng Lập", code: "LD_NEW_04" },
            { name: "Xã D’Ran", code: "LD_NEW_05" },
            { name: "Xã Hiệp Thạnh", code: "LD_NEW_06" },
            { name: "Xã Đức Trọng", code: "LD_NEW_07" }, // (Từ TT Liên Nghĩa...)
            { name: "Xã Tân Hội", code: "LD_NEW_08" },
            { name: "Xã Tà Hine", code: "LD_NEW_09" },
            { name: "Xã Tà Năng", code: "LD_NEW_10" },
            { name: "Xã Đinh Văn Lâm Hà", code: "LD_NEW_11" }, // (Từ TT Đinh Văn...)
            { name: "Xã Phú Sơn Lâm Hà", code: "LD_NEW_12" },
            { name: "Xã Nam Hà Lâm Hà", code: "LD_NEW_13" },
            { name: "Xã Nam Ban Lâm Hà", code: "LD_NEW_14" },
            { name: "Xã Tân Hà Lâm Hà", code: "LD_NEW_15" },
            { name: "Xã Phúc Thọ Lâm Hà", code: "LD_NEW_16" },
            { name: "Xã Đam Rông 1", code: "LD_NEW_17" },
            { name: "Xã Đam Rông 2", code: "LD_NEW_18" },
            { name: "Xã Đam Rông 3", code: "LD_NEW_19" },
            { name: "Xã Đam Rông 4", code: "LD_NEW_20" },
            { name: "Xã Di Linh", code: "LD_NEW_21" }, // (Từ TT Di Linh...)
            { name: "Xã Hòa Ninh", code: "LD_NEW_22" },
            { name: "Xã Hòa Bắc", code: "LD_NEW_23" },
            { name: "Xã Đinh Trang Thượng", code: "LD_NEW_24" },
            { name: "Xã Bảo Thuận", code: "LD_NEW_25" },
            { name: "Xã Sơn Điền", code: "LD_NEW_26" },
            { name: "Xã Gia Hiệp", code: "LD_NEW_27" },
            { name: "Xã Bảo Lâm 1", code: "LD_NEW_28" }, // (Từ TT Lộc Thắng...)
            { name: "Xã Bảo Lâm 2", code: "LD_NEW_29" },
            { name: "Xã Bảo Lâm 3", code: "LD_NEW_30" },
            { name: "Xã Bảo Lâm 4", code: "LD_NEW_31" },
            { name: "Xã Bảo Lâm 5", code: "LD_NEW_32" },
            { name: "Xã Đạ Huoai", code: "LD_NEW_33" }, // (Từ TT Mađaguôi...)
            { name: "Xã Đạ Huoai 2", code: "LD_NEW_34" },
            { name: "Xã Đạ Tẻh", code: "LD_NEW_35" }, // (Từ TT Đạ Tẻh...)
            { name: "Xã Đạ Tẻh 2", code: "LD_NEW_36" },
            { name: "Xã Đạ Tẻh 3", code: "LD_NEW_37" },
            { name: "Xã Cát Tiên", code: "LD_NEW_38" }, // (Từ TT Cát Tiên...)
            { name: "Xã Cát Tiên 2", code: "LD_NEW_39" },
            { name: "Xã Cát Tiên 3", code: "LD_NEW_40" },
            { name: "Xã Đạ Huoai 3", code: "LD_NEW_120" }, // (Đổi tên từ Bà Gia)

            // --- NHÓM XÃ MỚI (KHU VỰC BÌNH THUẬN CŨ - THEO VĂN BẢN) ---
            { name: "Xã Vĩnh Hảo", code: "LD_NEW_41" },
            { name: "Xã Liên Hương", code: "LD_NEW_42" }, // (Từ TT Liên Hương...)
            { name: "Xã Tuy Phong", code: "LD_NEW_43" },
            { name: "Xã Phan Rí Cửa", code: "LD_NEW_44" },
            { name: "Xã Bắc Bình", code: "LD_NEW_45" }, // (Từ TT Chợ Lầu...)
            { name: "Xã Hồng Thái", code: "LD_NEW_46" },
            { name: "Xã Hải Ninh", code: "LD_NEW_47" },
            { name: "Xã Phan Sơn", code: "LD_NEW_48" },
            { name: "Xã Sông Lũy", code: "LD_NEW_49" },
            { name: "Xã Lương Sơn", code: "LD_NEW_50" }, // (Từ TT Lương Sơn...)
            { name: "Xã Hòa Thắng", code: "LD_NEW_51" },
            { name: "Xã Đông Giang", code: "LD_NEW_52" },
            { name: "Xã La Dạ", code: "LD_NEW_53" },
            { name: "Xã Hàm Thuận Bắc", code: "LD_NEW_54" },
            { name: "Xã Hàm Thuận", code: "LD_NEW_55" }, // (Từ TT Ma Lâm...)
            { name: "Xã Hồng Sơn", code: "LD_NEW_56" },
            { name: "Xã Hàm Liêm", code: "LD_NEW_57" },
            { name: "Xã Tuyên Quang", code: "LD_NEW_58" },
            { name: "Xã Hàm Thạnh", code: "LD_NEW_59" },
            { name: "Xã Hàm Kiệm", code: "LD_NEW_60" },
            { name: "Xã Tân Thành", code: "LD_NEW_61" },
            { name: "Xã Hàm Thuận Nam", code: "LD_NEW_62" }, // (Từ TT Thuận Nam...)
            { name: "Xã Tân Lập", code: "LD_NEW_63" },
            { name: "Xã Tân Minh", code: "LD_NEW_64" },
            { name: "Xã Hàm Tân", code: "LD_NEW_65" }, // (Từ TT Tân Nghĩa...)
            { name: "Xã Sơn Mỹ", code: "LD_NEW_66" },
            { name: "Xã Tân Hải", code: "LD_NEW_67" },
            { name: "Xã Nghị Đức", code: "LD_NEW_68" },
            { name: "Xã Bắc Ruộng", code: "LD_NEW_69" },
            { name: "Xã Đồng Kho", code: "LD_NEW_70" },
            { name: "Xã Tánh Linh", code: "LD_NEW_71" }, // (Từ TT Lạc Tánh...)
            { name: "Xã Suối Kiết", code: "LD_NEW_72" },
            { name: "Xã Nam Thành", code: "LD_NEW_73" },
            { name: "Xã Đức Linh", code: "LD_NEW_74" }, // (Từ TT Võ Xu...)
            { name: "Xã Hoài Đức", code: "LD_NEW_75" },
            { name: "Xã Trà Tân", code: "LD_NEW_76" },

            // --- NHÓM XÃ MỚI (KHU VỰC ĐẮK NÔNG CŨ - THEO VĂN BẢN) ---
            { name: "Xã Đắk Wil", code: "LD_NEW_77" },
            { name: "Xã Nam Dong", code: "LD_NEW_78" },
            { name: "Xã Cư Jút", code: "LD_NEW_79" }, // (Từ TT Ea T'ling...)
            { name: "Xã Thuận An", code: "LD_NEW_80" },
            { name: "Xã Đức Lập", code: "LD_NEW_81" }, // (Từ TT Đắk Mil...)
            { name: "Xã Đắk Mil", code: "LD_NEW_82" },
            { name: "Xã Đắk Sắk", code: "LD_NEW_83" },
            { name: "Xã Nam Đà", code: "LD_NEW_84" },
            { name: "Xã Krông Nô", code: "LD_NEW_85" }, // (Từ TT Đắk Mâm...)
            { name: "Xã Nâm Nung", code: "LD_NEW_86" },
            { name: "Xã Quảng Phú", code: "LD_NEW_87" },
            { name: "Xã Đắk Song", code: "LD_NEW_88" },
            { name: "Xã Đức An", code: "LD_NEW_89" }, // (Từ TT Đức An...)
            { name: "Xã Thuận Hạnh", code: "LD_NEW_90" },
            { name: "Xã Trường Xuân", code: "LD_NEW_91" },
            { name: "Xã Tà Đùng", code: "LD_NEW_92" },
            { name: "Xã Quảng Khê", code: "LD_NEW_93" },
            { name: "Xã Quảng Tân", code: "LD_NEW_94" },
            { name: "Xã Tuy Đức", code: "LD_NEW_95" },
            { name: "Xã Kiến Đức", code: "LD_NEW_96" }, // (Từ TT Kiến Đức...)
            { name: "Xã Nhân Cơ", code: "LD_NEW_97" },
            { name: "Xã Quảng Tín", code: "LD_NEW_98" },

            // --- NHÓM PHƯỜNG MỚI (ĐÀ LẠT, BẢO LỘC, PHAN THIẾT, GIA NGHĨA) ---
            { name: "Phường Xuân Hương - Đà Lạt", code: "LD_NEW_99" }, // (Từ P1, P2 Đà Lạt...)
            { name: "Phường Cam Ly - Đà Lạt", code: "LD_NEW_100" },
            { name: "Phường Lâm Viên - Đà Lạt", code: "LD_NEW_101" },
            { name: "Phường Xuân Trường - Đà Lạt", code: "LD_NEW_102" },
            { name: "Phường Lang Biang - Đà Lạt", code: "LD_NEW_103" }, // (Từ P7, TT Lạc Dương...)
            { name: "Phường 1 Bảo Lộc", code: "LD_NEW_104" },
            { name: "Phường 2 Bảo Lộc", code: "LD_NEW_105" },
            { name: "Phường 3 Bảo Lộc", code: "LD_NEW_106" },
            { name: "Phường B’Lao", code: "LD_NEW_107" },
            { name: "Phường Hàm Thắng", code: "LD_NEW_108" },
            { name: "Phường Bình Thuận", code: "LD_NEW_109" },
            { name: "Phường Mũi Né", code: "LD_NEW_110" },
            { name: "Phường Phú Thủy", code: "LD_NEW_111" },
            { name: "Phường Phan Thiết", code: "LD_NEW_112" }, // (Từ Phú Trinh...)
            { name: "Phường Tiến Thành", code: "LD_NEW_113" },
            { name: "Phường La Gi", code: "LD_NEW_114" }, // (Từ Tân An TX La Gi...)
            { name: "Phường Phước Hội", code: "LD_NEW_115" },
            { name: "Phường Bắc Gia Nghĩa", code: "LD_NEW_116" }, // (Từ Quảng Thành...)
            { name: "Phường Nam Gia Nghĩa", code: "LD_NEW_117" },
            { name: "Phường Đông Gia Nghĩa", code: "LD_NEW_118" },

            // --- ĐẶC KHU ---
            { name: "Đặc khu Phú Quý", code: "LD_NEW_119" },

            // --- XÃ GIỮ NGUYÊN ---
            { name: "Xã Quảng Hòa", code: "LD_OLD_01" },
            { name: "Xã Quảng Sơn", code: "LD_OLD_02" },
            { name: "Xã Quảng Trực", code: "LD_OLD_03" },
            { name: "Xã Ninh Gia", code: "LD_OLD_04" }
        ]
    },

    // =================================================================
    // TỈNH LẠNG SƠN (MỚI SAU SÁP NHẬP)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Lạng Sơn",
        code: "20", // Mã tỉnh Lạng Sơn cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC TRÀNG ĐỊNH CŨ) ---
            { name: "Xã Thất Khê", code: "LS_NEW_01" }, // (Từ Chi Lăng, Chí Minh, TT Thất Khê)
            { name: "Xã Đoàn Kết", code: "LS_NEW_02" },
            { name: "Xã Tân Tiến", code: "LS_NEW_03" },
            { name: "Xã Tràng Định", code: "LS_NEW_04" },
            { name: "Xã Quốc Khánh", code: "LS_NEW_05" },
            { name: "Xã Kháng Chiến", code: "LS_NEW_06" },
            { name: "Xã Quốc Việt", code: "LS_NEW_07" },

            // --- NHÓM XÃ MỚI (KHU VỰC BÌNH GIA CŨ) ---
            { name: "Xã Bình Gia", code: "LS_NEW_08" }, // (Từ TT Bình Gia...)
            { name: "Xã Tân Văn", code: "LS_NEW_09" },
            { name: "Xã Hồng Phong", code: "LS_NEW_10" },
            { name: "Xã Hoa Thám", code: "LS_NEW_11" },
            { name: "Xã Quý Hòa", code: "LS_NEW_12" },
            { name: "Xã Thiện Hòa", code: "LS_NEW_13" },
            { name: "Xã Thiện Thuật", code: "LS_NEW_14" },
            { name: "Xã Thiện Long", code: "LS_NEW_15" },

            // --- NHÓM XÃ MỚI (KHU VỰC BẮC SƠN CŨ) ---
            { name: "Xã Bắc Sơn", code: "LS_NEW_16" }, // (Từ TT Bắc Sơn...)
            { name: "Xã Hưng Vũ", code: "LS_NEW_17" },
            { name: "Xã Vũ Lăng", code: "LS_NEW_18" },
            { name: "Xã Nhất Hòa", code: "LS_NEW_19" },
            { name: "Xã Vũ Lễ", code: "LS_NEW_20" },
            { name: "Xã Tân Tri", code: "LS_NEW_21" },

            // --- NHÓM XÃ MỚI (KHU VỰC VĂN QUAN CŨ) ---
            { name: "Xã Văn Quan", code: "LS_NEW_22" }, // (Từ TT Văn Quan...)
            { name: "Xã Điềm He", code: "LS_NEW_23" },
            { name: "Xã Yên Phúc", code: "LS_NEW_24" },
            { name: "Xã Tri Lễ", code: "LS_NEW_25" },
            { name: "Xã Tân Đoàn", code: "LS_NEW_26" },
            { name: "Xã Khánh Khê", code: "LS_NEW_27" },

            // --- NHÓM XÃ MỚI (KHU VỰC VĂN LÃNG CŨ) ---
            { name: "Xã Na Sầm", code: "LS_NEW_28" }, // (Từ TT Na Sầm...)
            { name: "Xã Hoàng Văn Thụ", code: "LS_NEW_29" },
            { name: "Xã Thụy Hùng", code: "LS_NEW_30" },
            { name: "Xã Văn Lãng", code: "LS_NEW_31" },
            { name: "Xã Hội Hoan", code: "LS_NEW_32" },

            // --- NHÓM XÃ MỚI (KHU VỰC LỘC BÌNH CŨ) ---
            { name: "Xã Lộc Bình", code: "LS_NEW_33" }, // (Từ TT Lộc Bình...)
            { name: "Xã Mẫu Sơn", code: "LS_NEW_34" },
            { name: "Xã Na Dương", code: "LS_NEW_35" },
            { name: "Xã Lợi Bác", code: "LS_NEW_36" },
            { name: "Xã Thống Nhất", code: "LS_NEW_37" },
            { name: "Xã Xuân Dương", code: "LS_NEW_38" },
            { name: "Xã Khuất Xá", code: "LS_NEW_39" },

            // --- NHÓM XÃ MỚI (KHU VỰC ĐÌNH LẬP CŨ) ---
            { name: "Xã Đình Lập", code: "LS_NEW_40" }, // (Từ TT Đình Lập...)
            { name: "Xã Thái Bình", code: "LS_NEW_41" }, // (Từ TT Nông Trường Thái Bình...)
            { name: "Xã Châu Sơn", code: "LS_NEW_42" },
            { name: "Xã Kiên Mộc", code: "LS_NEW_43" },

            // --- NHÓM XÃ MỚI (KHU VỰC HỮU LŨNG CŨ) ---
            { name: "Xã Hữu Lũng", code: "LS_NEW_44" }, // (Từ TT Hữu Lũng...)
            { name: "Xã Tuấn Sơn", code: "LS_NEW_45" },
            { name: "Xã Tân Thành", code: "LS_NEW_46" },
            { name: "Xã Vân Nham", code: "LS_NEW_47" },
            { name: "Xã Thiện Tân", code: "LS_NEW_48" },
            { name: "Xã Yên Bình", code: "LS_NEW_49" },
            { name: "Xã Hữu Liên", code: "LS_NEW_50" },
            { name: "Xã Cai Kinh", code: "LS_NEW_51" },

            // --- NHÓM XÃ MỚI (KHU VỰC CHI LĂNG CŨ) ---
            { name: "Xã Chi Lăng", code: "LS_NEW_52" }, // (Từ TT Chi Lăng...)
            { name: "Xã Quan Sơn", code: "LS_NEW_53" },
            { name: "Xã Chiến Thắng", code: "LS_NEW_54" },
            { name: "Xã Nhân Lý", code: "LS_NEW_55" },
            { name: "Xã Bằng Mạc", code: "LS_NEW_56" },
            { name: "Xã Vạn Linh", code: "LS_NEW_57" },

            // --- NHÓM XÃ MỚI (KHU VỰC CAO LỘC CŨ - Phần còn lại chưa vào TP) ---
            { name: "Xã Đồng Đăng", code: "LS_NEW_58" }, // (Từ TT Đồng Đăng...)
            { name: "Xã Cao Lộc", code: "LS_NEW_59" },
            { name: "Xã Công Sơn", code: "LS_NEW_60" },
            { name: "Xã Ba Sơn", code: "LS_NEW_61" },

            // --- NHÓM PHƯỜNG MỚI (THÀNH PHỐ LẠNG SƠN MỞ RỘNG) ---
            { name: "Phường Tam Thanh", code: "LS_NEW_62" },
            { name: "Phường Lương Văn Tri", code: "LS_NEW_63" },
            { name: "Phường Kỳ Lừa", code: "LS_NEW_64" }, // (Từ TT Cao Lộc...)
            { name: "Phường Đông Kinh", code: "LS_NEW_65" }
        ]
    },

    // =================================================================
    // TỈNH LÀO CAI (MỚI - SÁP NHẬP LÀO CAI + YÊN BÁI)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Lào Cai",
        code: "15", // Mã tỉnh Lào Cai cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC YÊN BÁI CŨ - MÙ CANG CHẢI, VĂN CHẤN...) ---
            { name: "Xã Khao Mang", code: "LC_NEW_01" }, // (Từ Hồ Bốn, Khao Mang)
            { name: "Xã Mù Cang Chải", code: "LC_NEW_02" }, // (Từ TT Mù Cang Chải...)
            { name: "Xã Púng Luông", code: "LC_NEW_03" },
            { name: "Xã Tú Lệ", code: "LC_NEW_04" },
            { name: "Xã Trạm Tấu", code: "LC_NEW_05" }, // (Từ Pá Lau...)
            { name: "Xã Hạnh Phúc", code: "LC_NEW_06" }, // (Từ TT Trạm Tấu...)
            { name: "Xã Phình Hồ", code: "LC_NEW_07" },
            { name: "Xã Liên Sơn", code: "LC_NEW_08" }, // (Từ TT NT Liên Sơn...)
            { name: "Xã Gia Hội", code: "LC_NEW_09" },
            { name: "Xã Sơn Lương", code: "LC_NEW_10" },
            { name: "Xã Văn Chấn", code: "LC_NEW_11" }, // (Từ TT Sơn Thịnh...)
            { name: "Xã Thượng Bằng La", code: "LC_NEW_12" },
            { name: "Xã Chấn Thịnh", code: "LC_NEW_13" },
            { name: "Xã Nghĩa Tâm", code: "LC_NEW_14" },
            { name: "Xã Phong Dụ Hạ", code: "LC_NEW_15" },
            { name: "Xã Châu Quế", code: "LC_NEW_16" },
            { name: "Xã Lâm Giang", code: "LC_NEW_17" },
            { name: "Xã Đông Cuông", code: "LC_NEW_18" },
            { name: "Xã Tân Hợp", code: "LC_NEW_19" },
            { name: "Xã Mậu A", code: "LC_NEW_20" }, // (Từ TT Mậu A...)
            { name: "Xã Xuân Ái", code: "LC_NEW_21" },
            { name: "Xã Mỏ Vàng", code: "LC_NEW_22" },
            { name: "Xã Lâm Thượng", code: "LC_NEW_23" },
            { name: "Xã Lục Yên", code: "LC_NEW_24" }, // (Từ TT Yên Thế...)
            { name: "Xã Tân Lĩnh", code: "LC_NEW_25" },
            { name: "Xã Khánh Hòa", code: "LC_NEW_26" },
            { name: "Xã Phúc Lợi", code: "LC_NEW_27" },
            { name: "Xã Mường Lai", code: "LC_NEW_28" },
            { name: "Xã Cảm Nhân", code: "LC_NEW_29" },
            { name: "Xã Yên Thành", code: "LC_NEW_30" },
            { name: "Xã Thác Bà", code: "LC_NEW_31" }, // (Từ TT Thác Bà...)
            { name: "Xã Yên Bình", code: "LC_NEW_32" }, // (Từ TT Yên Bình...)
            { name: "Xã Bảo Ái", code: "LC_NEW_33" },
            { name: "Xã Trấn Yên", code: "LC_NEW_34" }, // (Từ TT Cổ Phúc...)
            { name: "Xã Hưng Khánh", code: "LC_NEW_35" },
            { name: "Xã Lương Thịnh", code: "LC_NEW_36" },
            { name: "Xã Việt Hồng", code: "LC_NEW_37" },
            { name: "Xã Quy Mông", code: "LC_NEW_38" },
            { name: "Xã Cốc San", code: "LC_NEW_39" },
            { name: "Xã Hợp Thành", code: "LC_NEW_40" },
            { name: "Xã Phong Hải", code: "LC_NEW_41" }, // (Từ TT NT Phong Hải...)
            { name: "Xã Xuân Quang", code: "LC_NEW_42" },
            { name: "Xã Bảo Thắng", code: "LC_NEW_43" }, // (Từ TT Phố Lu...)
            { name: "Xã Tằng Loỏng", code: "LC_NEW_44" }, // (Từ TT Tằng Loỏng...)
            { name: "Xã Gia Phú", code: "LC_NEW_45" },

            // --- NHÓM XÃ MỚI (KHU VỰC LÀO CAI CŨ) ---
            { name: "Xã Mường Hum", code: "LC_NEW_46" },
            { name: "Xã Dền Sáng", code: "LC_NEW_47" },
            { name: "Xã Y Tý", code: "LC_NEW_48" },
            { name: "Xã A Mú Sung", code: "LC_NEW_49" },
            { name: "Xã Trịnh Tường", code: "LC_NEW_50" },
            { name: "Xã Bản Xèo", code: "LC_NEW_51" },
            { name: "Xã Bát Xát", code: "LC_NEW_52" }, // (Từ TT Bát Xát...)
            { name: "Xã Võ Lao", code: "LC_NEW_53" },
            { name: "Xã Khánh Yên", code: "LC_NEW_54" },
            { name: "Xã Văn Bàn", code: "LC_NEW_55" }, // (Từ TT Khánh Yên...)
            { name: "Xã Dương Quỳ", code: "LC_NEW_56" },
            { name: "Xã Chiềng Ken", code: "LC_NEW_57" },
            { name: "Xã Minh Lương", code: "LC_NEW_58" },
            { name: "Xã Nậm Chày", code: "LC_NEW_59" },
            { name: "Xã Bảo Yên", code: "LC_NEW_60" }, // (Từ TT Phố Ràng...)
            { name: "Xã Nghĩa Đô", code: "LC_NEW_61" },
            { name: "Xã Thượng Hà", code: "LC_NEW_62" },
            { name: "Xã Xuân Hòa", code: "LC_NEW_63" },
            { name: "Xã Phúc Khánh", code: "LC_NEW_64" },
            { name: "Xã Bảo Hà", code: "LC_NEW_65" },
            { name: "Xã Mường Bo", code: "LC_NEW_66" },
            { name: "Xã Bản Hồ", code: "LC_NEW_67" },
            { name: "Xã Tả Van", code: "LC_NEW_68" },
            { name: "Xã Tả Phìn", code: "LC_NEW_69" },
            { name: "Xã Cốc Lầu", code: "LC_NEW_70" },
            { name: "Xã Bảo Nhai", code: "LC_NEW_71" },
            { name: "Xã Bản Liền", code: "LC_NEW_72" },
            { name: "Xã Bắc Hà", code: "LC_NEW_73" }, // (Từ TT Bắc Hà...)
            { name: "Xã Tả Củ Tỷ", code: "LC_NEW_74" },
            { name: "Xã Lùng Phình", code: "LC_NEW_75" },
            { name: "Xã Pha Long", code: "LC_NEW_76" },
            { name: "Xã Mường Khương", code: "LC_NEW_77" }, // (Từ TT Mường Khương...)
            { name: "Xã Bản Lầu", code: "LC_NEW_78" },
            { name: "Xã Cao Sơn", code: "LC_NEW_79" },
            { name: "Xã Si Ma Cai", code: "LC_NEW_80" }, // (Từ TT Si Ma Cai...)
            { name: "Xã Sín Chéng", code: "LC_NEW_81" },

            // --- NHÓM PHƯỜNG MỚI (NGHĨA LỘ, YÊN BÁI, LÀO CAI, SA PA) ---
            { name: "Phường Nghĩa Lộ", code: "LC_NEW_82" }, // (Từ Tân An...)
            { name: "Phường Trung Tâm", code: "LC_NEW_83" },
            { name: "Phường Cầu Thia", code: "LC_NEW_84" },
            { name: "Phường Văn Phú", code: "LC_NEW_85" },
            { name: "Phường Yên Bái", code: "LC_NEW_86" }, // (Từ Đồng Tâm, Yên Ninh...)
            { name: "Phường Nam Cường", code: "LC_NEW_87" },
            { name: "Phường Âu Lâu", code: "LC_NEW_88" },
            { name: "Phường Cam Đường", code: "LC_NEW_89" }, // (Từ Nam Cường LC, Xuân Tăng...)
            { name: "Phường Lào Cai", code: "LC_NEW_90" }, // (Từ Duyên Hải, Cốc Lếu...)
            { name: "Phường Sa Pa", code: "LC_NEW_91" }, // (Từ Hàm Rồng, Ô Quý Hồ...)

            // --- XÃ GIỮ NGUYÊN ---
            { name: "Xã Nậm Xé", code: "LC_OLD_01" },
            { name: "Xã Ngũ Chỉ Sơn", code: "LC_OLD_02" },
            { name: "Xã Chế Tạo", code: "LC_OLD_03" },
            { name: "Xã Lao Chải", code: "LC_OLD_04" },
            { name: "Xã Nậm Có", code: "LC_OLD_05" },
            { name: "Xã Tà Xi Láng", code: "LC_OLD_06" },
            { name: "Xã Cát Thịnh", code: "LC_OLD_07" },
            { name: "Xã Phong Dụ", code: "LC_OLD_08" }
        ]
    },

    // =================================================================
    // 13. TỈNH NGHỆ AN (MỚI - THEO NGHỊ QUYẾT 1678/NQ-UBTVQH15)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Nghệ An",
        code: "40", // Old Nghe An code
        hasDistricts: false, // 🚩 Mark: Select Province -> Select Ward directly
        wards: [
            // --- NEW COMMUNES (MERGED) ---
            { name: "Xã Anh Sơn", code: "NA_NEW_01" }, // (From Kim Nhan, Duc Son, Phuc Son)
            { name: "Xã Yên Xuân", code: "NA_NEW_02" }, // (From Cao Son, Khai Son...)
            { name: "Xã Nhân Hòa", code: "NA_NEW_03" }, // (From Cam Son, Hung Son...)
            { name: "Xã Anh Sơn Đông", code: "NA_NEW_04" },
            { name: "Xã Vĩnh Tường", code: "NA_NEW_05" },
            { name: "Xã Thành Bình Thọ", code: "NA_NEW_06" },
            { name: "Xã Con Cuông", code: "NA_NEW_07" }, // (From Tra Lan, Chi Khe...)
            { name: "Xã Môn Sơn", code: "NA_NEW_08" },
            { name: "Xã Mậu Thạch", code: "NA_NEW_09" },
            { name: "Xã Cam Phục", code: "NA_NEW_10" },
            { name: "Xã Châu Khê", code: "NA_NEW_11" },
            { name: "Xã Diễn Châu", code: "NA_NEW_12" }, // (From TT Dien Thanh, Dien Hoa...)
            { name: "Xã Đức Châu", code: "NA_NEW_13" },
            { name: "Xã Quảng Châu", code: "NA_NEW_14" },
            { name: "Xã Hải Châu", code: "NA_NEW_15" },
            { name: "Xã Tân Châu", code: "NA_NEW_16" },
            { name: "Xã An Châu", code: "NA_NEW_17" },
            { name: "Xã Minh Châu", code: "NA_NEW_18" },
            { name: "Xã Hùng Châu", code: "NA_NEW_19" },
            { name: "Xã Đô Lương", code: "NA_NEW_20" }, // (From Bac Son, Nam Son...)
            { name: "Xã Bạch Ngọc", code: "NA_NEW_21" },
            { name: "Xã Văn Hiến", code: "NA_NEW_22" },
            { name: "Xã Bạch Hà", code: "NA_NEW_23" },
            { name: "Xã Thuần Trung", code: "NA_NEW_24" },
            { name: "Xã Lương Sơn", code: "NA_NEW_25" },
            { name: "Xã Hưng Nguyên", code: "NA_NEW_26" }, // (From TT Hung Nguyen...)
            { name: "Xã Yên Trung", code: "NA_NEW_27" },
            { name: "Xã Hưng Nguyên Nam", code: "NA_NEW_28" },
            { name: "Xã Lam Thành", code: "NA_NEW_29" },
            { name: "Xã Chiêu Lưu", code: "NA_NEW_30" },
            { name: "Xã Hữu Kiệm", code: "NA_NEW_31" },
            { name: "Xã Mường Típ", code: "NA_NEW_32" },
            { name: "Xã Mường Xén", code: "NA_NEW_33" }, // (From TT Muong Xen...)
            { name: "Xã Na Loi", code: "NA_NEW_34" },
            { name: "Xã Na Ngoi", code: "NA_NEW_35" },
            { name: "Xã Nậm Cắn", code: "NA_NEW_36" },
            { name: "Xã Kim Liên", code: "NA_NEW_37" }, // (From Hung Tien, Nam Cat...)
            { name: "Xã Vạn An", code: "NA_NEW_38" }, // (From TT Nam Dan...)
            { name: "Xã Nam Đàn", code: "NA_NEW_39" },
            { name: "Xã Đại Huệ", code: "NA_NEW_40" },
            { name: "Xã Thiên Nhẫn", code: "NA_NEW_41" },
            { name: "Xã Nghĩa Đàn", code: "NA_NEW_42" }, // (From TT Nghia Dan...)
            { name: "Xã Nghĩa Thọ", code: "NA_NEW_43" },
            { name: "Xã Nghĩa Lâm", code: "NA_NEW_44" },
            { name: "Xã Nghĩa Mai", code: "NA_NEW_45" },
            { name: "Xã Nghĩa Hưng", code: "NA_NEW_46" },
            { name: "Xã Nghĩa Khánh", code: "NA_NEW_47" },
            { name: "Xã Nghĩa Lộc", code: "NA_NEW_48" },
            { name: "Xã Nghi Lộc", code: "NA_NEW_49" }, // (From TT Quan Hanh...)
            { name: "Xã Phúc Lộc", code: "NA_NEW_50" },
            { name: "Xã Đông Lộc", code: "NA_NEW_51" },
            { name: "Xã Trung Lộc", code: "NA_NEW_52" },
            { name: "Xã Thần Lĩnh", code: "NA_NEW_53" },
            { name: "Xã Hải Lộc", code: "NA_NEW_54" },
            { name: "Xã Văn Kiều", code: "NA_NEW_55" },
            { name: "Xã Mường Quàng", code: "NA_NEW_56" },
            { name: "Xã Quế Phong", code: "NA_NEW_57" }, // (From TT Kim Son...)
            { name: "Xã Thông Thụ", code: "NA_NEW_58" },
            { name: "Xã Tiền Phong", code: "NA_NEW_59" },
            { name: "Xã Tri Lễ", code: "NA_NEW_60" },
            { name: "Xã Quỳ Châu", code: "NA_NEW_61" }, // (From TT Tan Lac...)
            { name: "Xã Châu Tiến", code: "NA_NEW_62" },
            { name: "Xã Hùng Chân", code: "NA_NEW_63" },
            { name: "Xã Quỳ Hợp", code: "NA_NEW_64" }, // (From TT Quy Hop...)
            { name: "Xã Tam Hợp", code: "NA_NEW_65" },
            { name: "Xã Châu Lộc", code: "NA_NEW_66" },
            { name: "Xã Châu Hồng", code: "NA_NEW_67" },
            { name: "Xã Mường Ham", code: "NA_NEW_68" },
            { name: "Xã Mường Chọng", code: "NA_NEW_69" },
            { name: "Xã Minh Hợp", code: "NA_NEW_70" },
            { name: "Xã Quỳnh Lưu", code: "NA_NEW_71" }, // (From TT Cau Giat...)
            { name: "Xã Quỳnh Văn", code: "NA_NEW_72" },
            { name: "Xã Quỳnh Anh", code: "NA_NEW_73" },
            { name: "Xã Quỳnh Tam", code: "NA_NEW_74" },
            { name: "Xã Quỳnh Phú", code: "NA_NEW_75" },
            { name: "Xã Quỳnh Sơn", code: "NA_NEW_76" },
            { name: "Xã Quỳnh Thắng", code: "NA_NEW_77" },
            { name: "Xã Tân Kỳ", code: "NA_NEW_78" }, // (From TT Tan Ky...)
            { name: "Xã Tân Phú", code: "NA_NEW_79" },
            { name: "Xã Tân An", code: "NA_NEW_80" },
            { name: "Xã Nghĩa Đồng", code: "NA_NEW_81" },
            { name: "Xã Giai Xuân", code: "NA_NEW_82" },
            { name: "Xã Nghĩa Hành", code: "NA_NEW_83" },
            { name: "Xã Tiên Đồng", code: "NA_NEW_84" },
            { name: "Xã Đông Hiếu", code: "NA_NEW_85" },
            { name: "Xã Bích Hào", code: "NA_NEW_86" },
            { name: "Xã Cát Ngạn", code: "NA_NEW_87" },
            { name: "Xã Đại Đồng", code: "NA_NEW_88" },
            { name: "Xã Hạnh Lâm", code: "NA_NEW_89" },
            { name: "Xã Hoa Quân", code: "NA_NEW_90" },
            { name: "Xã Kim Bảng", code: "NA_NEW_91" },
            { name: "Xã Sơn Lâm", code: "NA_NEW_92" },
            { name: "Xã Tam Đồng", code: "NA_NEW_93" },
            { name: "Xã Xuân Lâm", code: "NA_NEW_94" },
            { name: "Xã Nga My", code: "NA_NEW_95" },
            { name: "Xã Nhôn Mai", code: "NA_NEW_96" },
            { name: "Xã Tam Quang", code: "NA_NEW_97" },
            { name: "Xã Tam Thái", code: "NA_NEW_98" },
            { name: "Xã Tương Dương", code: "NA_NEW_99" }, // (From TT Thach Giam...)
            { name: "Xã Yên Hòa", code: "NA_NEW_100" },
            { name: "Xã Yên Na", code: "NA_NEW_101" },
            { name: "Xã Yên Thành", code: "NA_NEW_102" }, // (From TT Hoa Thanh...)
            { name: "Xã Quan Thành", code: "NA_NEW_103" },
            { name: "Xã Hợp Minh", code: "NA_NEW_104" },
            { name: "Xã Vân Tụ", code: "NA_NEW_105" },
            { name: "Xã Vân Du", code: "NA_NEW_106" },
            { name: "Xã Quang Đồng", code: "NA_NEW_107" },
            { name: "Xã Giai Lạc", code: "NA_NEW_108" },
            { name: "Xã Bình Minh", code: "NA_NEW_109" },
            { name: "Xã Đông Thành", code: "NA_NEW_110" },

            // --- NEW WARDS (PHƯỜNG) ---
            { name: "Phường Hoàng Mai", code: "NA_NEW_111" }, // (From Quynh Thien...)
            { name: "Phường Quỳnh Mai", code: "NA_NEW_112" },
            { name: "Phường Tân Mai", code: "NA_NEW_113" },
            { name: "Phường Thái Hòa", code: "NA_NEW_114" }, // (From Hoa Hieu...)
            { name: "Phường Tây Hiếu", code: "NA_NEW_115" },
            { name: "Phường Trường Vinh", code: "NA_NEW_116" }, // (From Ben Thuy...)
            { name: "Phường Thành Vinh", code: "NA_NEW_117" },
            { name: "Phường Vinh Hưng", code: "NA_NEW_118" },
            { name: "Phường Vinh Phú", code: "NA_NEW_119" },
            { name: "Phường Vinh Lộc", code: "NA_NEW_120" },
            { name: "Phường Cửa Lò", code: "NA_NEW_121" }, // (From Nghi Hai...)

            // --- EXISTING COMMUNES (NOT MERGED) ---
            { name: "Xã Keng Đu", code: "NA_OLD_01" },
            { name: "Xã Mỹ Lý", code: "NA_OLD_02" },
            { name: "Xã Bắc Lý", code: "NA_OLD_03" },
            { name: "Xã Huồi Tụ", code: "NA_OLD_04" },
            { name: "Xã Mường Lống", code: "NA_OLD_05" },
            { name: "Xã Bình Chuẩn", code: "NA_OLD_06" },
            { name: "Xã Hữu Khuông", code: "NA_OLD_07" },
            { name: "Xã Lượng Minh", code: "NA_OLD_08" },
            { name: "Xã Châu Bình", code: "NA_OLD_09" }
        ]
    },

    // =================================================================
    // TỈNH NINH BÌNH (MỚI - SÁP NHẬP NINH BÌNH + HÀ NAM + NAM ĐỊNH)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Ninh Bình",
        code: "37", // Mã tỉnh Ninh Bình cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC HÀ NAM CŨ) ---
            { name: "Xã Bình Lục", code: "NB_NEW_01" }, // (Từ Bình Nghĩa, Tràng An...)
            { name: "Xã Bình Mỹ", code: "NB_NEW_02" }, // (Từ TT Bình Mỹ...)
            { name: "Xã Bình An", code: "NB_NEW_03" },
            { name: "Xã Bình Giang", code: "NB_NEW_04" },
            { name: "Xã Bình Sơn", code: "NB_NEW_05" },
            { name: "Xã Liêm Hà", code: "NB_NEW_06" },
            { name: "Xã Tân Thanh", code: "NB_NEW_07" }, // (Từ TT Tân Thanh...)
            { name: "Xã Thanh Bình", code: "NB_NEW_08" },
            { name: "Xã Thanh Lâm", code: "NB_NEW_09" },
            { name: "Xã Thanh Liêm", code: "NB_NEW_10" },
            { name: "Xã Lý Nhân", code: "NB_NEW_11" }, // (Từ Chính Lý...)
            { name: "Xã Nam Xang", code: "NB_NEW_12" },
            { name: "Xã Bắc Lý", code: "NB_NEW_13" },
            { name: "Xã Vĩnh Trụ", code: "NB_NEW_14" }, // (Từ TT Vĩnh Trụ...)
            { name: "Xã Trần Thương", code: "NB_NEW_15" },
            { name: "Xã Nhân Hà", code: "NB_NEW_16" },
            { name: "Xã Nam Lý", code: "NB_NEW_17" },

            // --- NHÓM XÃ MỚI (KHU VỰC NAM ĐỊNH CŨ) ---
            { name: "Xã Nam Trực", code: "NB_NEW_18" }, // (Từ TT Nam Giang...)
            { name: "Xã Nam Minh", code: "NB_NEW_19" },
            { name: "Xã Nam Đồng", code: "NB_NEW_20" },
            { name: "Xã Nam Ninh", code: "NB_NEW_21" },
            { name: "Xã Nam Hồng", code: "NB_NEW_22" },
            { name: "Xã Minh Tân", code: "NB_NEW_23" },
            { name: "Xã Hiển Khánh", code: "NB_NEW_24" },
            { name: "Xã Vụ Bản", code: "NB_NEW_25" }, // (Từ TT Gôi...)
            { name: "Xã Liên Minh", code: "NB_NEW_26" },
            { name: "Xã Ý Yên", code: "NB_NEW_27" }, // (Từ TT Lâm...)
            { name: "Xã Yên Đồng", code: "NB_NEW_28" },
            { name: "Xã Yên Cường", code: "NB_NEW_29" },
            { name: "Xã Vạn Thắng", code: "NB_NEW_30" },
            { name: "Xã Vũ Dương", code: "NB_NEW_31" },
            { name: "Xã Tân Minh", code: "NB_NEW_32" },
            { name: "Xã Phong Doanh", code: "NB_NEW_33" },
            { name: "Xã Cổ Lễ", code: "NB_NEW_34" }, // (Từ TT Cổ Lễ...)
            { name: "Xã Ninh Giang", code: "NB_NEW_35" },
            { name: "Xã Cát Thành", code: "NB_NEW_36" }, // (Từ TT Cát Thành...)
            { name: "Xã Trực Ninh", code: "NB_NEW_37" },
            { name: "Xã Quang Hưng", code: "NB_NEW_38" },
            { name: "Xã Minh Thái", code: "NB_NEW_39" },
            { name: "Xã Ninh Cường", code: "NB_NEW_40" }, // (Từ TT Ninh Cường...)
            { name: "Xã Xuân Trường", code: "NB_NEW_41" }, // (Từ TT Xuân Trường...)
            { name: "Xã Xuân Hưng", code: "NB_NEW_42" },
            { name: "Xã Xuân Giang", code: "NB_NEW_43" },
            { name: "Xã Xuân Hồng", code: "NB_NEW_44" },
            { name: "Xã Hải Hậu", code: "NB_NEW_45" }, // (Từ TT Yên Định...)
            { name: "Xã Hải Anh", code: "NB_NEW_46" },
            { name: "Xã Hải Tiến", code: "NB_NEW_47" }, // (Từ TT Cồn...)
            { name: "Xã Hải Hưng", code: "NB_NEW_48" },
            { name: "Xã Hải An", code: "NB_NEW_49" },
            { name: "Xã Hải Quang", code: "NB_NEW_50" },
            { name: "Xã Hải Xuân", code: "NB_NEW_51" },
            { name: "Xã Hải Thịnh", code: "NB_NEW_52" }, // (Từ TT Thịnh Long...)
            { name: "Xã Giao Minh", code: "NB_NEW_53" },
            { name: "Xã Giao Hòa", code: "NB_NEW_54" },
            { name: "Xã Giao Thủy", code: "NB_NEW_55" }, // (Từ TT Giao Thủy...)
            { name: "Xã Giao Phúc", code: "NB_NEW_56" },
            { name: "Xã Giao Hưng", code: "NB_NEW_57" },
            { name: "Xã Giao Bình", code: "NB_NEW_58" },
            { name: "Xã Giao Ninh", code: "NB_NEW_59" }, // (Từ TT Quất Lâm...)
            { name: "Xã Đồng Thịnh", code: "NB_NEW_60" },
            { name: "Xã Nghĩa Hưng", code: "NB_NEW_61" }, // (Từ TT Liễu Đề...)
            { name: "Xã Nghĩa Sơn", code: "NB_NEW_62" },
            { name: "Xã Hồng Phong", code: "NB_NEW_63" },
            { name: "Xã Quỹ Nhất", code: "NB_NEW_64" }, // (Từ TT Quỹ Nhất...)
            { name: "Xã Nghĩa Lâm", code: "NB_NEW_65" },
            { name: "Xã Rạng Đông", code: "NB_NEW_66" }, // (Từ TT Rạng Đông...)

            // --- NHÓM XÃ MỚI (KHU VỰC NINH BÌNH CŨ) ---
            { name: "Xã Gia Viễn", code: "NB_NEW_67" }, // (Từ TT Thịnh Vượng...)
            { name: "Xã Đại Hoàng", code: "NB_NEW_68" },
            { name: "Xã Gia Hưng", code: "NB_NEW_69" },
            { name: "Xã Gia Phong", code: "NB_NEW_70" },
            { name: "Xã Gia Vân", code: "NB_NEW_71" },
            { name: "Xã Gia Trấn", code: "NB_NEW_72" },
            { name: "Xã Nho Quan", code: "NB_NEW_73" }, // (Từ TT Nho Quan...)
            { name: "Xã Gia Lâm", code: "NB_NEW_74" },
            { name: "Xã Gia Tường", code: "NB_NEW_75" },
            { name: "Xã Phú Sơn", code: "NB_NEW_76" },
            { name: "Xã Cúc Phương", code: "NB_NEW_77" },
            { name: "Xã Phú Long", code: "NB_NEW_78" },
            { name: "Xã Thanh Sơn", code: "NB_NEW_79" },
            { name: "Xã Quỳnh Lưu", code: "NB_NEW_80" },
            { name: "Xã Yên Khánh", code: "NB_NEW_81" }, // (Từ TT Yên Ninh...)
            { name: "Xã Khánh Nhạc", code: "NB_NEW_82" },
            { name: "Xã Khánh Thiện", code: "NB_NEW_83" },
            { name: "Xã Khánh Hội", code: "NB_NEW_84" },
            { name: "Xã Khánh Trung", code: "NB_NEW_85" },
            { name: "Xã Yên Mô", code: "NB_NEW_86" }, // (Từ TT Yên Thịnh...)
            { name: "Xã Yên Từ", code: "NB_NEW_87" },
            { name: "Xã Yên Mạc", code: "NB_NEW_88" },
            { name: "Xã Đồng Thái", code: "NB_NEW_89" },
            { name: "Xã Chất Bình", code: "NB_NEW_90" },
            { name: "Xã Kim Sơn", code: "NB_NEW_91" },
            { name: "Xã Quang Thiện", code: "NB_NEW_92" },
            { name: "Xã Phát Diệm", code: "NB_NEW_93" }, // (Từ TT Phát Diệm...)
            { name: "Xã Lai Thành", code: "NB_NEW_94" },
            { name: "Xã Định Hóa", code: "NB_NEW_95" },
            { name: "Xã Bình Minh", code: "NB_NEW_96" }, // (Từ TT Bình Minh...)
            { name: "Xã Kim Đông", code: "NB_NEW_97" },

            // --- NHÓM PHƯỜNG MỚI ---
            { name: "Phường Duy Tiên", code: "NB_NEW_98" }, // (Từ Hòa Mạc...)
            { name: "Phường Duy Tân", code: "NB_NEW_99" },
            { name: "Phường Đồng Văn", code: "NB_NEW_100" },
            { name: "Phường Duy Hà", code: "NB_NEW_101" },
            { name: "Phường Tiên Sơn", code: "NB_NEW_102" },
            { name: "Phường Lê Hồ", code: "NB_NEW_103" },
            { name: "Phường Nguyễn Úy", code: "NB_NEW_104" },
            { name: "Phường Lý Thường Kiệt", code: "NB_NEW_105" },
            { name: "Phường Kim Thanh", code: "NB_NEW_106" },
            { name: "Phường Tam Chúc", code: "NB_NEW_107" },
            { name: "Phường Kim Bảng", code: "NB_NEW_108" },
            { name: "Phường Hà Nam", code: "NB_NEW_109" }, // (Từ Lam Hạ, Phủ Lý...)
            { name: "Phường Phù Vân", code: "NB_NEW_110" },
            { name: "Phường Châu Sơn", code: "NB_NEW_111" },
            { name: "Phường Phủ Lý", code: "NB_NEW_112" },
            { name: "Phường Liêm Tuyền", code: "NB_NEW_113" },
            { name: "Phường Nam Định", code: "NB_NEW_114" }, // (Từ TP Nam Định...)
            { name: "Phường Thiên Trường", code: "NB_NEW_115" },
            { name: "Phường Đông A", code: "NB_NEW_116" },
            { name: "Phường Vị Khê", code: "NB_NEW_117" },
            { name: "Phường Thành Nam", code: "NB_NEW_118" },
            { name: "Phường Trường Thi", code: "NB_NEW_119" },
            { name: "Phường Hồng Quang", code: "NB_NEW_120" },
            { name: "Phường Mỹ Lộc", code: "NB_NEW_121" },
            { name: "Phường Tây Hoa Lư", code: "NB_NEW_122" },
            { name: "Phường Hoa Lư", code: "NB_NEW_123" }, // (Từ TP Ninh Bình...)
            { name: "Phường Nam Hoa Lư", code: "NB_NEW_124" },
            { name: "Phường Đông Hoa Lư", code: "NB_NEW_125" },
            { name: "Phường Tam Điệp", code: "NB_NEW_126" }, // (Từ TP Tam Điệp...)
            { name: "Phường Yên Sơn", code: "NB_NEW_127" },
            { name: "Phường Trung Sơn", code: "NB_NEW_128" },
            { name: "Phường Yên Thắng", code: "NB_NEW_129" }
        ]
    },

    // =================================================================
    // TỈNH PHÚ THỌ (MỚI - SÁP NHẬP PHÚ THỌ + VĨNH PHÚC + HÒA BÌNH)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Phú Thọ",
        code: "25", // Mã tỉnh Phú Thọ cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC PHÚ THỌ CŨ) ---
            { name: "Xã Hy Cương", code: "PT_NEW_01" }, // (Từ Thanh Đình, Chu Hóa...)
            { name: "Xã Lâm Thao", code: "PT_NEW_02" }, // (Từ TT Hùng Sơn...)
            { name: "Xã Xuân Lũng", code: "PT_NEW_03" },
            { name: "Xã Phùng Nguyên", code: "PT_NEW_04" },
            { name: "Xã Bản Nguyên", code: "PT_NEW_05" },
            { name: "Xã Phù Ninh", code: "PT_NEW_06" }, // (Từ TT Phong Châu...)
            { name: "Xã Dân Chủ", code: "PT_NEW_07" },
            { name: "Xã Phú Mỹ", code: "PT_NEW_08" },
            { name: "Xã Trạm Thản", code: "PT_NEW_09" },
            { name: "Xã Bình Phú", code: "PT_NEW_10" },
            { name: "Xã Thanh Ba", code: "PT_NEW_11" }, // (Từ TT Thanh Ba...)
            { name: "Xã Quảng Yên", code: "PT_NEW_12" },
            { name: "Xã Hoàng Cương", code: "PT_NEW_13" },
            { name: "Xã Đông Thành", code: "PT_NEW_14" },
            { name: "Xã Chí Tiên", code: "PT_NEW_15" },
            { name: "Xã Liên Minh", code: "PT_NEW_16" },
            { name: "Xã Đoan Hùng", code: "PT_NEW_17" }, // (Từ TT Đoan Hùng...)
            { name: "Xã Tây Cốc", code: "PT_NEW_18" },
            { name: "Xã Chân Mộng", code: "PT_NEW_19" },
            { name: "Xã Chí Đám", code: "PT_NEW_20" },
            { name: "Xã Bằng Luân", code: "PT_NEW_21" },
            { name: "Xã Hạ Hòa", code: "PT_NEW_22" }, // (Từ TT Hạ Hòa...)
            { name: "Xã Đan Thượng", code: "PT_NEW_23" },
            { name: "Xã Yên Kỳ", code: "PT_NEW_24" },
            { name: "Xã Vĩnh Chân", code: "PT_NEW_25" },
            { name: "Xã Văn Lang", code: "PT_NEW_26" },
            { name: "Xã Hiền Lương", code: "PT_NEW_27" },
            { name: "Xã Cẩm Khê", code: "PT_NEW_28" }, // (Từ TT Cẩm Khê...)
            { name: "Xã Phú Khê", code: "PT_NEW_29" },
            { name: "Xã Hùng Việt", code: "PT_NEW_30" },
            { name: "Xã Đồng Lương", code: "PT_NEW_31" },
            { name: "Xã Tiên Lương", code: "PT_NEW_32" },
            { name: "Xã Vân Bán", code: "PT_NEW_33" },
            { name: "Xã Tam Nông", code: "PT_NEW_34" }, // (Từ TT Hưng Hóa...)
            { name: "Xã Thọ Văn", code: "PT_NEW_35" },
            { name: "Xã Vạn Xuân", code: "PT_NEW_36" },
            { name: "Xã Hiền Quan", code: "PT_NEW_37" },
            { name: "Xã Thanh Thủy", code: "PT_NEW_38" }, // (Từ TT Thanh Thủy...)
            { name: "Xã Đào Xá", code: "PT_NEW_39" },
            { name: "Xã Tu Vũ", code: "PT_NEW_40" },
            { name: "Xã Thanh Sơn", code: "PT_NEW_41" }, // (Từ TT Thanh Sơn...)
            { name: "Xã Võ Miếu", code: "PT_NEW_42" },
            { name: "Xã Văn Miếu", code: "PT_NEW_43" },
            { name: "Xã Cự Đồng", code: "PT_NEW_44" },
            { name: "Xã Hương Cần", code: "PT_NEW_45" },
            { name: "Xã Yên Sơn", code: "PT_NEW_46" },
            { name: "Xã Khả Cửu", code: "PT_NEW_47" },
            { name: "Xã Tân Sơn", code: "PT_NEW_48" }, // (Từ TT Tân Phú...)
            { name: "Xã Minh Đài", code: "PT_NEW_49" },
            { name: "Xã Lai Đồng", code: "PT_NEW_50" },
            { name: "Xã Xuân Đài", code: "PT_NEW_51" },
            { name: "Xã Long Cốc", code: "PT_NEW_52" },
            { name: "Xã Yên Lập", code: "PT_NEW_53" }, // (Từ TT Yên Lập...)
            { name: "Xã Thượng Long", code: "PT_NEW_54" },
            { name: "Xã Sơn Lương", code: "PT_NEW_55" },
            { name: "Xã Xuân Viên", code: "PT_NEW_56" },
            { name: "Xã Minh Hòa", code: "PT_NEW_57" },

            // --- NHÓM XÃ MỚI (KHU VỰC VĨNH PHÚC CŨ) ---
            { name: "Xã Tam Sơn", code: "PT_NEW_58" }, // (Từ TT Tam Sơn...)
            { name: "Xã Sông Lô", code: "PT_NEW_59" },
            { name: "Xã Hải Lựu", code: "PT_NEW_60" },
            { name: "Xã Yên Lãng", code: "PT_NEW_61" },
            { name: "Xã Lập Thạch", code: "PT_NEW_62" }, // (Từ TT Lập Thạch...)
            { name: "Xã Tiên Lữ (VP)", code: "PT_NEW_63" }, // (Trùng tên Tiên Lữ PT)
            { name: "Xã Thái Hòa", code: "PT_NEW_64" },
            { name: "Xã Liên Hòa", code: "PT_NEW_65" },
            { name: "Xã Hợp Lý", code: "PT_NEW_66" },
            { name: "Xã Sơn Đông", code: "PT_NEW_67" },
            { name: "Xã Tam Đảo", code: "PT_NEW_68" }, // (Từ TT Tam Đảo, Hợp Châu...)
            { name: "Xã Đại Đình", code: "PT_NEW_69" },
            { name: "Xã Đạo Trù", code: "PT_NEW_70" },
            { name: "Xã Tam Dương", code: "PT_NEW_71" }, // (Từ TT Hợp Hòa...)
            { name: "Xã Hội Thịnh", code: "PT_NEW_72" },
            { name: "Xã Hoàng An", code: "PT_NEW_73" },
            { name: "Xã Tam Dương Bắc", code: "PT_NEW_74" },
            { name: "Xã Vĩnh Tường", code: "PT_NEW_75" }, // (Từ TT Vĩnh Tường...)
            { name: "Xã Thổ Tang", code: "PT_NEW_76" },
            { name: "Xã Vĩnh Hưng", code: "PT_NEW_77" },
            { name: "Xã Vĩnh An", code: "PT_NEW_78" },
            { name: "Xã Vĩnh Phú", code: "PT_NEW_79" },
            { name: "Xã Vĩnh Thành", code: "PT_NEW_80" },
            { name: "Xã Yên Lạc", code: "PT_NEW_81" }, // (Từ TT Yên Lạc...)
            { name: "Xã Tề Lỗ", code: "PT_NEW_82" },
            { name: "Xã Liên Châu", code: "PT_NEW_83" },
            { name: "Xã Tam Hồng", code: "PT_NEW_84" },
            { name: "Xã Nguyệt Đức", code: "PT_NEW_85" },
            { name: "Xã Bình Nguyên", code: "PT_NEW_86" },
            { name: "Xã Xuân Lãng", code: "PT_NEW_87" },
            { name: "Xã Bình Xuyên", code: "PT_NEW_88" }, // (Từ TT Gia Khánh...)
            { name: "Xã Bình Tuyền", code: "PT_NEW_89" },
            { name: "Xã Thịnh Minh", code: "PT_NEW_90" },

            // --- NHÓM XÃ MỚI (KHU VỰC HÒA BÌNH CŨ) ---
            { name: "Xã Cao Phong", code: "PT_NEW_91" }, // (Từ TT Cao Phong...)
            { name: "Xã Mường Thàng", code: "PT_NEW_92" },
            { name: "Xã Thung Nai", code: "PT_NEW_93" },
            { name: "Xã Đà Bắc", code: "PT_NEW_94" }, // (Từ TT Đà Bắc...)
            { name: "Xã Cao Sơn", code: "PT_NEW_95" },
            { name: "Xã Đức Nhàn", code: "PT_NEW_96" },
            { name: "Xã Quy Đức", code: "PT_NEW_97" },
            { name: "Xã Tân Pheo", code: "PT_NEW_98" },
            { name: "Xã Tiền Phong", code: "PT_NEW_99" },
            { name: "Xã Kim Bôi", code: "PT_NEW_100" }, // (Từ TT Bo...)
            { name: "Xã Mường Động", code: "PT_NEW_101" },
            { name: "Xã Dũng Tiến", code: "PT_NEW_102" },
            { name: "Xã Hợp Kim", code: "PT_NEW_103" },
            { name: "Xã Nật Sơn", code: "PT_NEW_104" },
            { name: "Xã Lạc Sơn", code: "PT_NEW_105" }, // (Từ TT Vụ Bản...)
            { name: "Xã Mường Vang", code: "PT_NEW_106" },
            { name: "Xã Đại Đồng", code: "PT_NEW_107" },
            { name: "Xã Ngọc Sơn", code: "PT_NEW_108" },
            { name: "Xã Nhân Nghĩa", code: "PT_NEW_109" },
            { name: "Xã Quyết Thắng", code: "PT_NEW_110" },
            { name: "Xã Thượng Cốc", code: "PT_NEW_111" },
            { name: "Xã Yên Phú", code: "PT_NEW_112" },
            { name: "Xã Lạc Thủy", code: "PT_NEW_113" }, // (Từ TT Chi Nê...)
            { name: "Xã An Bình", code: "PT_NEW_114" },
            { name: "Xã An Nghĩa", code: "PT_NEW_115" },
            { name: "Xã Lương Sơn", code: "PT_NEW_116" }, // (Từ TT Lương Sơn...)
            { name: "Xã Cao Dương", code: "PT_NEW_117" },
            { name: "Xã Liên Sơn", code: "PT_NEW_118" },
            { name: "Xã Mai Châu", code: "PT_NEW_119" }, // (Từ TT Mai Châu...)
            { name: "Xã Bao La", code: "PT_NEW_120" },
            { name: "Xã Mai Hạ", code: "PT_NEW_121" },
            { name: "Xã Pà Cò", code: "PT_NEW_122" },
            { name: "Xã Tân Mai", code: "PT_NEW_123" },
            { name: "Xã Tân Lạc", code: "PT_NEW_124" }, // (Từ TT Mãn Đức...)
            { name: "Xã Mường Bi", code: "PT_NEW_125" },
            { name: "Xã Mường Hoa", code: "PT_NEW_126" },
            { name: "Xã Toàn Thắng", code: "PT_NEW_127" },
            { name: "Xã Vân Sơn", code: "PT_NEW_128" },
            { name: "Xã Yên Thủy", code: "PT_NEW_129" }, // (Từ TT Hàng Trạm...)
            { name: "Xã Lạc Lương", code: "PT_NEW_130" },
            { name: "Xã Yên Trị", code: "PT_NEW_131" },

            // --- NHÓM PHƯỜNG MỚI ---
            { name: "Phường Việt Trì", code: "PT_NEW_132" }, // (Từ Tân Dân...)
            { name: "Phường Nông Trang", code: "PT_NEW_133" },
            { name: "Phường Thanh Miếu", code: "PT_NEW_134" },
            { name: "Phường Vân Phú", code: "PT_NEW_135" },
            { name: "Phường Phú Thọ", code: "PT_NEW_136" }, // (Từ Hùng Vương TX Phú Thọ...)
            { name: "Phường Phong Châu", code: "PT_NEW_137" },
            { name: "Phường Âu Cơ", code: "PT_NEW_138" },
            { name: "Phường Vĩnh Phúc", code: "PT_NEW_139" }, // (Từ Định Trung, Liên Bảo...)
            { name: "Phường Vĩnh Yên", code: "PT_NEW_140" },
            { name: "Phường Phúc Yên", code: "PT_NEW_141" }, // (Từ Hùng Vương TP Phúc Yên...)
            { name: "Phường Xuân Hòa", code: "PT_NEW_142" },
            { name: "Phường Hòa Bình", code: "PT_NEW_143" }, // (Từ Đồng Tiến TP Hòa Bình...)
            { name: "Phường Kỳ Sơn", code: "PT_NEW_144" },
            { name: "Phường Tân Hòa", code: "PT_NEW_145" },
            { name: "Phường Thống Nhất", code: "PT_NEW_146" },

            // --- XÃ GIỮ NGUYÊN ---
            { name: "Xã Thu Cúc", code: "PT_OLD_01" },
            { name: "Xã Trung Sơn", code: "PT_OLD_02" }
        ]
    },

    // =================================================================
    // TỈNH QUẢNG NGÃI (MỚI - SÁP NHẬP QUẢNG NGÃI + KON TUM)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Quảng Ngãi",
        code: "51", // Mã tỉnh Quảng Ngãi cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC QUẢNG NGÃI CŨ) ---
            { name: "Xã Tịnh Khê", code: "QNG_NEW_01" }, // (Từ Tịnh Kỳ, Tịnh Châu...)
            { name: "Xã An Phú", code: "QNG_NEW_02" }, // (Từ Nghĩa Hà, Nghĩa Dũng...)
            { name: "Xã Nguyễn Nghiêm", code: "QNG_NEW_03" }, // (Từ Phổ Nhơn, Phổ Phong)
            { name: "Xã Khánh Cường", code: "QNG_NEW_04" }, // (Từ Phổ Khánh, Phổ Cường)
            { name: "Xã Bình Minh", code: "QNG_NEW_05" },
            { name: "Xã Bình Chương", code: "QNG_NEW_06" },
            { name: "Xã Bình Sơn", code: "QNG_NEW_07" }, // (Từ TT Châu Ổ...)
            { name: "Xã Vạn Tường", code: "QNG_NEW_08" },
            { name: "Xã Đông Sơn", code: "QNG_NEW_09" },
            { name: "Xã Trường Giang", code: "QNG_NEW_10" },
            { name: "Xã Ba Gia", code: "QNG_NEW_11" },
            { name: "Xã Sơn Tịnh", code: "QNG_NEW_12" }, // (Từ TT Tịnh Hà...)
            { name: "Xã Thọ Phong", code: "QNG_NEW_13" },
            { name: "Xã Tư Nghĩa", code: "QNG_NEW_14" }, // (Từ TT La Hà...)
            { name: "Xã Vệ Giang", code: "QNG_NEW_15" }, // (Từ TT Sông Vệ...)
            { name: "Xã Nghĩa Giang", code: "QNG_NEW_16" },
            { name: "Xã Trà Giang", code: "QNG_NEW_17" },
            { name: "Xã Nghĩa Hành", code: "QNG_NEW_18" }, // (Từ TT Chợ Chùa...)
            { name: "Xã Đình Cương", code: "QNG_NEW_19" },
            { name: "Xã Thiện Tín", code: "QNG_NEW_20" },
            { name: "Xã Phước Giang", code: "QNG_NEW_21" },
            { name: "Xã Long Phụng", code: "QNG_NEW_22" },
            { name: "Xã Mỏ Cày", code: "QNG_NEW_23" },
            { name: "Xã Mộ Đức", code: "QNG_NEW_24" }, // (Từ TT Mộ Đức...)
            { name: "Xã Lân Phong", code: "QNG_NEW_25" },
            { name: "Xã Trà Bồng", code: "QNG_NEW_26" }, // (Từ TT Trà Xuân...)
            { name: "Xã Đông Trà Bồng", code: "QNG_NEW_27" },
            { name: "Xã Tây Trà", code: "QNG_NEW_28" },
            { name: "Xã Thanh Bồng", code: "QNG_NEW_29" },
            { name: "Xã Cà Đam", code: "QNG_NEW_30" },
            { name: "Xã Tây Trà Bồng", code: "QNG_NEW_31" },
            { name: "Xã Sơn Hạ", code: "QNG_NEW_32" },
            { name: "Xã Sơn Linh", code: "QNG_NEW_33" },
            { name: "Xã Sơn Hà", code: "QNG_NEW_34" }, // (Từ TT Di Lăng...)
            { name: "Xã Sơn Thủy", code: "QNG_NEW_35" },
            { name: "Xã Sơn Kỳ", code: "QNG_NEW_36" },
            { name: "Xã Sơn Tây", code: "QNG_NEW_37" },
            { name: "Xã Sơn Tây Thượng", code: "QNG_NEW_38" },
            { name: "Xã Sơn Tây Hạ", code: "QNG_NEW_39" },
            { name: "Xã Minh Long", code: "QNG_NEW_40" },
            { name: "Xã Sơn Mai", code: "QNG_NEW_41" },
            { name: "Xã Ba Vì", code: "QNG_NEW_42" },
            { name: "Xã Ba Tô", code: "QNG_NEW_43" },
            { name: "Xã Ba Dinh", code: "QNG_NEW_44" },
            { name: "Xã Ba Tơ", code: "QNG_NEW_45" }, // (Từ TT Ba Tơ...)
            { name: "Xã Ba Vinh", code: "QNG_NEW_46" },
            { name: "Xã Ba Động", code: "QNG_NEW_47" },
            { name: "Xã Đặng Thùy Trâm", code: "QNG_NEW_48" },

            // --- NHÓM XÃ MỚI (KHU VỰC KON TUM CŨ - THEO VĂN BẢN) ---
            { name: "Xã Ngọk Bay", code: "QNG_NEW_49" },
            { name: "Xã Ia Chim", code: "QNG_NEW_50" },
            { name: "Xã Đăk Rơ Wa", code: "QNG_NEW_51" },
            { name: "Xã Đăk Pxi", code: "QNG_NEW_52" },
            { name: "Xã Đăk Mar", code: "QNG_NEW_53" },
            { name: "Xã Đăk Ui", code: "QNG_NEW_54" },
            { name: "Xã Ngọk Réo", code: "QNG_NEW_55" },
            { name: "Xã Đăk Hà", code: "QNG_NEW_56" }, // (Từ TT Đăk Hà...)
            { name: "Xã Ngọk Tụ", code: "QNG_NEW_57" },
            { name: "Xã Đăk Tô", code: "QNG_NEW_58" }, // (Từ TT Đăk Tô...)
            { name: "Xã Kon Đào", code: "QNG_NEW_59" },
            { name: "Xã Đăk Sao", code: "QNG_NEW_60" },
            { name: "Xã Đăk Tờ Kan", code: "QNG_NEW_61" },
            { name: "Xã Tu Mơ Rông", code: "QNG_NEW_62" },
            { name: "Xã Măng Ri", code: "QNG_NEW_63" },
            { name: "Xã Bờ Y", code: "QNG_NEW_64" }, // (Từ TT Plei Kần...)
            { name: "Xã Sa Loong", code: "QNG_NEW_65" },
            { name: "Xã Dục Nông", code: "QNG_NEW_66" },
            { name: "Xã Xốp", code: "QNG_NEW_67" },
            { name: "Xã Ngọc Linh", code: "QNG_NEW_68" },
            { name: "Xã Đăk Plô", code: "QNG_NEW_69" },
            { name: "Xã Đăk Pék", code: "QNG_NEW_70" }, // (Từ TT Đăk Glei...)
            { name: "Xã Đăk Môn", code: "QNG_NEW_71" },
            { name: "Xã Sa Thầy", code: "QNG_NEW_72" }, // (Từ TT Sa Thầy...)
            { name: "Xã Sa Bình", code: "QNG_NEW_73" },
            { name: "Xã Ya Ly", code: "QNG_NEW_74" },
            { name: "Xã Ia Tơi", code: "QNG_NEW_75" },
            { name: "Xã Đăk Kôi", code: "QNG_NEW_76" },
            { name: "Xã Kon Braih", code: "QNG_NEW_77" },
            { name: "Xã Đăk Rve", code: "QNG_NEW_78" }, // (Từ TT Đăk Rve...)
            { name: "Xã Măng Đen", code: "QNG_NEW_79" }, // (Từ TT Măng Đen...)
            { name: "Xã Măng Bút", code: "QNG_NEW_80" },
            { name: "Xã Kon Plông", code: "QNG_NEW_81" },

            // --- NHÓM PHƯỜNG MỚI (QUẢNG NGÃI + ĐỨC PHỔ + KON TUM) ---
            { name: "Phường Trương Quang Trọng", code: "QNG_NEW_82" },
            { name: "Phường Cẩm Thành", code: "QNG_NEW_83" },
            { name: "Phường Nghĩa Lộ", code: "QNG_NEW_84" },
            { name: "Phường Trà Câu", code: "QNG_NEW_85" }, // (Từ Phổ Văn...)
            { name: "Phường Đức Phổ", code: "QNG_NEW_86" }, // (Từ P.Nguyễn Nghiêm TX Đức Phổ...)
            { name: "Phường Sa Huỳnh", code: "QNG_NEW_87" }, // (Từ Phổ Thạnh...)
            { name: "Phường Kon Tum", code: "QNG_NEW_88" }, // (Từ P.Quang Trung TP Kon Tum...)
            { name: "Phường Đăk Cấm", code: "QNG_NEW_89" }, // (Từ P.Ngô Mây TP Kon Tum...)
            { name: "Phường Đăk Bla", code: "QNG_NEW_90" }, // (Từ P.Trần Hưng Đạo TP Kon Tum...)

            // --- ĐẶC KHU ---
            { name: "Đặc khu Lý Sơn", code: "QNG_NEW_91" },

            // --- XÃ GIỮ NGUYÊN ---
            { name: "Xã Đăk Long", code: "QNG_OLD_01" },
            { name: "Xã Ba Xa", code: "QNG_OLD_02" },
            { name: "Xã Rờ Kơi", code: "QNG_OLD_03" },
            { name: "Xã Mô Rai", code: "QNG_OLD_04" },
            { name: "Xã Ia Đal", code: "QNG_OLD_05" }
        ]
    },

    // =================================================================
    // TỈNH QUẢNG NINH (MỚI - SAU SÁP NHẬP)
    // Cấu trúc: Bỏ cấp Huyện, Xã/Phường/Đặc khu trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Quảng Ninh",
        code: "22", // Mã tỉnh Quảng Ninh cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI ---
            { name: "Xã Quảng La", code: "QN_NEW_01" }, // (Từ Bằng Cả, Dân Chủ...)
            { name: "Xã Thống Nhất", code: "QN_NEW_02" }, // (Từ Vũ Oai, Hòa Bình...)
            { name: "Xã Hải Hòa", code: "QN_NEW_03" }, // (Từ Hải Lạng...)
            { name: "Xã Tiên Yên", code: "QN_NEW_04" }, // (Từ TT Tiên Yên...)
            { name: "Xã Điền Xá", code: "QN_NEW_05" }, // (Từ Hà Lâu...)
            { name: "Xã Đông Ngũ", code: "QN_NEW_06" }, // (Từ Đông Hải...)
            { name: "Xã Hải Lạng", code: "QN_NEW_07" }, // (Từ Đồng Rui...)
            { name: "Xã Lương Minh", code: "QN_NEW_08" }, // (Từ Đồng Sơn, Lương Minh)
            { name: "Xã Kỳ Thượng", code: "QN_NEW_09" }, // (Từ Thanh Lâm, Đạp Thanh...)
            { name: "Xã Ba Chẽ", code: "QN_NEW_10" }, // (Từ TT Ba Chẽ...)
            { name: "Xã Quảng Tân", code: "QN_NEW_11" }, // (Từ Quảng An, Dực Yên...)
            { name: "Xã Đầm Hà", code: "QN_NEW_12" }, // (Từ TT Đầm Hà...)
            { name: "Xã Quảng Hà", code: "QN_NEW_13" }, // (Từ TT Quảng Hà...)
            { name: "Xã Đường Hoa", code: "QN_NEW_14" }, // (Từ Quảng Sơn...)
            { name: "Xã Quảng Đức", code: "QN_NEW_15" }, // (Từ Quảng Thành...)
            { name: "Xã Hoành Mô", code: "QN_NEW_16" }, // (Từ Đồng Văn...)
            { name: "Xã Lục Hồn", code: "QN_NEW_17" }, // (Từ Đồng Tâm...)
            { name: "Xã Bình Liêu", code: "QN_NEW_18" }, // (Từ TT Bình Liêu...)
            { name: "Xã Hải Sơn", code: "QN_NEW_19" }, // (Từ Bắc Sơn...)
            { name: "Xã Hải Ninh", code: "QN_NEW_20" }, // (Từ Quảng Nghĩa...)
            { name: "Xã Vĩnh Thực", code: "QN_NEW_21" }, // (Từ Vĩnh Trung...)

            // --- NHÓM PHƯỜNG MỚI (ĐÔNG TRIỀU, UÔNG BÍ, QUẢNG YÊN) ---
            { name: "Phường An Sinh", code: "QN_NEW_22" }, // (Từ Bình Dương, An Sinh...)
            { name: "Phường Đông Triều", code: "QN_NEW_23" }, // (Từ Thủy An, Hưng Đạo...)
            { name: "Phường Bình Khê", code: "QN_NEW_24" },
            { name: "Phường Mạo Khê", code: "QN_NEW_25" }, // (Từ Xuân Sơn...)
            { name: "Phường Hoàng Quế", code: "QN_NEW_26" }, // (Từ Yên Đức...)
            { name: "Phường Yên Tử", code: "QN_NEW_27" }, // (Từ Phương Đông...)
            { name: "Phường Vàng Danh", code: "QN_NEW_28" }, // (Từ Bắc Sơn, Nam Khê...)
            { name: "Phường Uông Bí", code: "QN_NEW_29" }, // (Từ Quang Trung...)
            { name: "Phường Đông Mai", code: "QN_NEW_30" },
            { name: "Phường Hiệp Hòa", code: "QN_NEW_31" }, // (Từ Cộng Hòa...)
            { name: "Phường Quảng Yên", code: "QN_NEW_32" }, // (Từ Yên Giang...)
            { name: "Phường Hà An", code: "QN_NEW_33" }, // (Từ Tân An...)
            { name: "Phường Phong Cốc", code: "QN_NEW_34" }, // (Từ Nam Hòa...)
            { name: "Phường Liên Hòa", code: "QN_NEW_35" }, // (Từ Phong Hải...)

            // --- NHÓM PHƯỜNG MỚI (HẠ LONG, CẨM PHẢ, MÓNG CÁI) ---
            { name: "Phường Tuần Châu", code: "QN_NEW_36" }, // (Từ Đại Yên...)
            { name: "Phường Việt Hưng", code: "QN_NEW_37" }, // (Từ Giếng Đáy...)
            { name: "Phường Bãi Cháy", code: "QN_NEW_38" },
            { name: "Phường Hà Tu", code: "QN_NEW_39" }, // (Từ Hà Phong...)
            { name: "Phường Hà Lầm", code: "QN_NEW_40" }, // (Từ Cao Thắng...)
            { name: "Phường Cao Xanh", code: "QN_NEW_41" }, // (Từ Hà Khánh...)
            { name: "Phường Hồng Gai", code: "QN_NEW_42" }, // (Từ Bạch Đằng...)
            { name: "Phường Hạ Long", code: "QN_NEW_43" }, // (Từ Hồng Hà...)
            { name: "Phường Hoành Bồ", code: "QN_NEW_44" }, // (Từ TT Trới cũ/P.Hoành Bồ...)
            { name: "Phường Mông Dương", code: "QN_NEW_45" },
            { name: "Phường Quang Hanh", code: "QN_NEW_46" },
            { name: "Phường Cẩm Phả", code: "QN_NEW_47" }, // (Từ Cẩm Trung, Cẩm Thành...)
            { name: "Phường Cửa Ông", code: "QN_NEW_48" }, // (Từ Cẩm Phú...)
            { name: "Phường Thủy Nguyên", code: "QN_NEW_01B" }, // (Trùng tên Xã Thủy Nguyên ở Hải Phòng, nhưng đây là Phường Thủy Nguyên Quảng Ninh - À khoan, mục 1 trong văn bản là Phường Thủy Nguyên của Hải Phòng? Kiểm tra lại văn bản gốc.
            // Dựa vào ngữ cảnh "Danh sách 54 đơn vị", có vẻ mục 1 văn bản bạn gửi là của Hải Phòng lọt vào?
            // À không, mục 1: "xã Quảng La" là của Quảng Ninh.
            // Mục 1 Hải Phòng là "phường Thủy Nguyên".
            // Xin lỗi, tôi sẽ tiếp tục list theo đúng văn bản Quảng Ninh bạn gửi)

            { name: "Phường Móng Cái 1", code: "QN_NEW_49" }, // (Từ Trần Phú, Hải Hòa...)
            { name: "Phường Móng Cái 2", code: "QN_NEW_50" }, // (Từ Ninh Dương...)
            { name: "Phường Móng Cái 3", code: "QN_NEW_51" }, // (Từ Hải Yên...)

            // --- ĐẶC KHU ---
            { name: "Đặc khu Vân Đồn", code: "QN_NEW_52" }, // (Từ Cái Rồng...)
            { name: "Đặc khu Cô Tô", code: "QN_NEW_53" }, // (Từ TT Cô Tô...)

            // --- XÃ GIỮ NGUYÊN ---
            { name: "Xã Cái Chiên", code: "QN_OLD_01" } // (Văn bản ghi Cái Chiên, bạn check lại tên nhé)
        ]
    },

    // =================================================================
    // TỈNH QUẢNG TRỊ (MỚI - BAO GỒM CẢ KHU VỰC QUẢNG BÌNH CŨ)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Quảng Trị",
        code: "44", // Mã tỉnh Quảng Trị cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC QUẢNG BÌNH CŨ - THEO VĂN BẢN) ---
            { name: "Xã Nam Gianh", code: "QT_NEW_01" }, // (Từ Quảng Hòa, Quảng Lộc...)
            { name: "Xã Nam Ba Đồn", code: "QT_NEW_02" },
            { name: "Xã Dân Hóa", code: "QT_NEW_03" },
            { name: "Xã Kim Điền", code: "QT_NEW_04" },
            { name: "Xã Kim Phú", code: "QT_NEW_05" },
            { name: "Xã Minh Hóa", code: "QT_NEW_06" }, // (Từ TT Quy Đạt...)
            { name: "Xã Tuyên Lâm", code: "QT_NEW_07" },
            { name: "Xã Tuyên Sơn", code: "QT_NEW_08" },
            { name: "Xã Đồng Lê", code: "QT_NEW_09" }, // (Từ TT Đồng Lê...)
            { name: "Xã Tuyên Phú", code: "QT_NEW_10" },
            { name: "Xã Tuyên Bình", code: "QT_NEW_11" },
            { name: "Xã Tuyên Hóa", code: "QT_NEW_12" },
            { name: "Xã Tân Gianh", code: "QT_NEW_13" },
            { name: "Xã Trung Thuần", code: "QT_NEW_14" },
            { name: "Xã Quảng Trạch", code: "QT_NEW_15" },
            { name: "Xã Hòa Trạch", code: "QT_NEW_16" },
            { name: "Xã Phú Trạch", code: "QT_NEW_17" },
            { name: "Xã Thượng Trạch", code: "QT_NEW_18" },
            { name: "Xã Phong Nha", code: "QT_NEW_19" }, // (Từ TT Phong Nha...)
            { name: "Xã Bắc Trạch", code: "QT_NEW_20" },
            { name: "Xã Đông Trạch", code: "QT_NEW_21" },
            { name: "Xã Hoàn Lão", code: "QT_NEW_22" }, // (Từ TT Hoàn Lão...)
            { name: "Xã Bố Trạch", code: "QT_NEW_23" },
            { name: "Xã Nam Trạch", code: "QT_NEW_24" },
            { name: "Xã Quảng Ninh", code: "QT_NEW_25" }, // (Từ TT Quán Hàu...)
            { name: "Xã Ninh Châu", code: "QT_NEW_26" },
            { name: "Xã Trường Ninh", code: "QT_NEW_27" },
            { name: "Xã Trường Sơn", code: "QT_NEW_28" },
            { name: "Xã Lệ Thủy", code: "QT_NEW_29" }, // (Từ TT Kiến Giang...)
            { name: "Xã Cam Hồng", code: "QT_NEW_30" },
            { name: "Xã Sen Ngư", code: "QT_NEW_31" },
            { name: "Xã Tân Mỹ", code: "QT_NEW_32" },
            { name: "Xã Trường Phú", code: "QT_NEW_33" },
            { name: "Xã Lệ Ninh", code: "QT_NEW_34" },
            { name: "Xã Kim Ngân", code: "QT_NEW_35" },

            // --- NHÓM XÃ MỚI (KHU VỰC QUẢNG TRỊ CŨ) ---
            { name: "Xã Vĩnh Linh", code: "QT_NEW_36" }, // (Từ TT Hồ Xá...)
            { name: "Xã Cửa Tùng", code: "QT_NEW_37" }, // (Từ TT Cửa Tùng...)
            { name: "Xã Vĩnh Hoàng", code: "QT_NEW_38" },
            { name: "Xã Vĩnh Thủy", code: "QT_NEW_39" },
            { name: "Xã Bến Quan", code: "QT_NEW_40" }, // (Từ TT Bến Quan...)
            { name: "Xã Cồn Tiên", code: "QT_NEW_41" },
            { name: "Xã Cửa Việt", code: "QT_NEW_42" }, // (Từ TT Cửa Việt...)
            { name: "Xã Gio Linh", code: "QT_NEW_43" }, // (Từ TT Gio Linh...)
            { name: "Xã Bến Hải", code: "QT_NEW_44" },
            { name: "Xã Cam Lộ", code: "QT_NEW_45" }, // (Từ TT Cam Lộ...)
            { name: "Xã Hiếu Giang", code: "QT_NEW_46" },
            { name: "Xã La Lay", code: "QT_NEW_47" },
            { name: "Xã Tà Rụt", code: "QT_NEW_48" },
            { name: "Xã Đakrông", code: "QT_NEW_49" },
            { name: "Xã Ba Lòng", code: "QT_NEW_50" },
            { name: "Xã Hướng Hiệp", code: "QT_NEW_51" }, // (Từ TT Krông Klang...)
            { name: "Xã Hướng Lập", code: "QT_NEW_52" },
            { name: "Xã Hướng Phùng", code: "QT_NEW_53" },
            { name: "Xã Khe Sanh", code: "QT_NEW_54" }, // (Từ TT Khe Sanh...)
            { name: "Xã Tân Lập", code: "QT_NEW_55" },
            { name: "Xã Lao Bảo", code: "QT_NEW_56" }, // (Từ TT Lao Bảo...)
            { name: "Xã Lìa", code: "QT_NEW_57" },
            { name: "Xã A Dơi", code: "QT_NEW_58" },
            { name: "Xã Triệu Phong", code: "QT_NEW_59" }, // (Từ TT Ái Tử...)
            { name: "Xã Ái Tử", code: "QT_NEW_60" },
            { name: "Xã Triệu Bình", code: "QT_NEW_61" },
            { name: "Xã Triệu Cơ", code: "QT_NEW_62" },
            { name: "Xã Nam Cửa Việt", code: "QT_NEW_63" },
            { name: "Xã Diên Sanh", code: "QT_NEW_64" }, // (Từ TT Diên Sanh...)
            { name: "Xã Mỹ Thủy", code: "QT_NEW_65" },
            { name: "Xã Hải Lăng", code: "QT_NEW_66" },
            { name: "Xã Nam Hải Lăng", code: "QT_NEW_67" },
            { name: "Xã Vĩnh Định", code: "QT_NEW_68" },

            // --- NHÓM PHƯỜNG MỚI (ĐỒNG HỚI, BA ĐỒN, ĐÔNG HÀ, QUẢNG TRỊ) ---
            { name: "Phường Đồng Hới", code: "QT_NEW_69" }, // (Từ Đồng Hải, Đồng Phú...)
            { name: "Phường Đồng Thuận", code: "QT_NEW_70" }, // (Từ Bắc Lý...)
            { name: "Phường Đồng Sơn", code: "QT_NEW_71" },
            { name: "Phường Ba Đồn", code: "QT_NEW_72" }, // (Từ Quảng Phong, Ba Đồn...)
            { name: "Phường Bắc Gianh", code: "QT_NEW_73" },
            { name: "Phường Đông Hà", code: "QT_NEW_74" }, // (Từ P1, P3 Đông Hà...)
            { name: "Phường Nam Đông Hà", code: "QT_NEW_75" },
            { name: "Phường Quảng Trị", code: "QT_NEW_76" }, // (Từ TX Quảng Trị...)

            // --- ĐẶC KHU ---
            { name: "Đặc khu Cồn Cỏ", code: "QT_NEW_77" },

            // --- XÃ GIỮ NGUYÊN ---
            { name: "Xã Tân Thành", code: "QT_OLD_01" }
        ]
    },

    // =================================================================
    // TỈNH SƠN LA (MỚI - SAU SÁP NHẬP)
    // Cấu trúc: Bỏ cấp Huyện, Xã/Phường trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Sơn La",
        code: "14", // Mã tỉnh Sơn La cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC MỘC CHÂU & VÂN HỒ CŨ) ---
            { name: "Xã Đoàn Kết", code: "SL_NEW_01" }, // (Từ Chiềng Chung, Đoàn Kết)
            { name: "Xã Lóng Sập", code: "SL_NEW_02" }, // (Từ Chiềng Khừa, Lóng Sập)
            { name: "Xã Chiềng Sơn", code: "SL_NEW_03" }, // (Từ Chiềng Xuân, Chiềng Sơn)
            { name: "Xã Vân Hồ", code: "SL_NEW_04" }, // (Từ Lóng Luông, Chiềng Yên...)
            { name: "Xã Song Khủa", code: "SL_NEW_05" }, // (Từ Mường Tè, Liên Hòa...)
            { name: "Xã Tô Múa", code: "SL_NEW_06" }, // (Từ Chiềng Khoa, Suối Bàng...)
            { name: "Xã Xuân Nha", code: "SL_NEW_07" }, // (Từ Tân Xuân, Xuân Nha)

            // --- NHÓM XÃ MỚI (KHU VỰC QUỲNH NHAI CŨ) ---
            { name: "Xã Quỳnh Nhai", code: "SL_NEW_08" }, // (Từ TT Mường Giàng...)
            { name: "Xã Mường Chiên", code: "SL_NEW_09" }, // (Từ Chiềng Khay, Cà Nàng...)
            { name: "Xã Mường Giôn", code: "SL_NEW_10" }, // (Từ Pá Ma Pha Khinh...)
            { name: "Xã Mường Sại", code: "SL_NEW_11" }, // (Từ Nặm Ét, Mường Sại)

            // --- NHÓM XÃ MỚI (KHU VỰC THUẬN CHÂU CŨ) ---
            { name: "Xã Thuận Châu", code: "SL_NEW_12" }, // (Từ TT Thuận Châu, Phổng Ly...)
            { name: "Xã Chiềng La", code: "SL_NEW_13" }, // (Từ Chiềng Ngàm, Nong Lay...)
            { name: "Xã Nậm Lầu", code: "SL_NEW_14" }, // (Từ Chiềng Bôm, Púng Tra...)
            { name: "Xã Muổi Nọi", code: "SL_NEW_15" }, // (Từ Bản Lầm, Bon Phặng...)
            { name: "Xã Mường Khiêng", code: "SL_NEW_16" }, // (Từ Liệp Tè, Bó Mười...)
            { name: "Xã Co Mạ", code: "SL_NEW_17" }, // (Từ Co Tòng, Pá Lông...)
            { name: "Xã Bình Thuận", code: "SL_NEW_18" }, // (Từ Phổng Lái, Chiềng Pha)
            { name: "Xã Mường É", code: "SL_NEW_19" }, // (Từ Phổng Lập, Mường É)
            { name: "Xã Long Hẹ", code: "SL_NEW_20" }, // (Từ É Tòng, Long Hẹ)
            { name: "Xã Bó Sinh", code: "SL_NEW_50" }, // (Từ Pú Bẩu, Chiềng En...) - Sông Mã

            // --- NHÓM XÃ MỚI (KHU VỰC MƯỜNG LA CŨ) ---
            { name: "Xã Mường La", code: "SL_NEW_21" }, // (Từ TT Ít Ong, Nặm Păm...)
            { name: "Xã Chiềng Lao", code: "SL_NEW_22" }, // (Từ Nậm Giôn, Hua Trai...)
            { name: "Xã Mường Bú", code: "SL_NEW_23" }, // (Từ Mường Chùm, Tạ Bú...)
            { name: "Xã Chiềng Hoa", code: "SL_NEW_24" }, // (Từ Chiềng Ân, Chiềng Công...)

            // --- NHÓM XÃ MỚI (KHU VỰC BẮC YÊN CŨ) ---
            { name: "Xã Bắc Yên", code: "SL_NEW_25" }, // (Từ TT Bắc Yên, Phiêng Ban...)
            { name: "Xã Tà Xùa", code: "SL_NEW_26" }, // (Từ Làng Chếu, Háng Đồng...)
            { name: "Xã Tạ Khoa", code: "SL_NEW_27" }, // (Từ Mường Khoa, Hua Nhàn...)
            { name: "Xã Xím Vàng", code: "SL_NEW_28" }, // (Từ Hang Chú, Xím Vàng)
            { name: "Xã Pắc Ngà", code: "SL_NEW_29" }, // (Từ Chim Vàn, Pắc Ngà)
            { name: "Xã Chiềng Sại", code: "SL_NEW_30" }, // (Từ Phiêng Côn, Chiềng Sại)

            // --- NHÓM XÃ MỚI (KHU VỰC PHÙ YÊN CŨ) ---
            { name: "Xã Phù Yên", code: "SL_NEW_31" }, // (Từ TT Quang Huy, Huy Hạ...)
            { name: "Xã Gia Phù", code: "SL_NEW_32" }, // (Từ Tường Phù, Suối Bau...)
            { name: "Xã Tường Hạ", code: "SL_NEW_33" }, // (Từ Tường Thượng, Tường Phong...)
            { name: "Xã Mường Cơi", code: "SL_NEW_34" }, // (Từ Mường Thải, Tân Lang...)
            { name: "Xã Mường Bang", code: "SL_NEW_35" }, // (Từ Mường Do, Mường Lang...)
            { name: "Xã Tân Phong", code: "SL_NEW_36" }, // (Từ Bắc Phong, Nam Phong...)
            { name: "Xã Kim Bon", code: "SL_NEW_37" }, // (Từ Đá Đỏ, Kim Bon)

            // --- NHÓM XÃ MỚI (KHU VỰC YÊN CHÂU CŨ) ---
            { name: "Xã Yên Châu", code: "SL_NEW_38" }, // (Từ TT Yên Châu, Chiềng Đông...)
            { name: "Xã Chiềng Hặc", code: "SL_NEW_39" }, // (Từ Tú Nang, Mường Lựm...)
            { name: "Xã Lóng Phiêng", code: "SL_NEW_40" }, // (Từ Chiềng Tương, Lóng Phiêng)
            { name: "Xã Yên Sơn", code: "SL_NEW_41" }, // (Từ Chiềng On, Yên Sơn)
            { name: "Xã Chiềng Mai", code: "SL_NEW_42" }, // (Từ Chiềng Ban, Chiềng Kheo...)

            // --- NHÓM XÃ MỚI (KHU VỰC MAI SƠN CŨ) ---
            { name: "Xã Mai Sơn", code: "SL_NEW_43" }, // (Từ TT Hát Lót...)
            { name: "Xã Phiêng Pằn", code: "SL_NEW_44" }, // (Từ Nà Ớt, Chiềng Lương...)
            { name: "Xã Chiềng Mung", code: "SL_NEW_45" }, // (Từ Mường Bằng, Mường Bon...)
            { name: "Xã Phiêng Cằm", code: "SL_NEW_46" }, // (Từ Chiềng Nơi, Phiêng Cằm)
            { name: "Xã Mường Chanh", code: "SL_NEW_47" }, // (Từ Chiềng Chung, Mường Chanh)
            { name: "Xã Tà Hộc", code: "SL_NEW_48" }, // (Từ Nà Bó, Tà Hộc)
            { name: "Xã Chiềng Sung", code: "SL_NEW_49" }, // (Từ Chiềng Chăn, Chiềng Sung)

            // --- NHÓM XÃ MỚI (KHU VỰC SÔNG MÃ CŨ) ---
            { name: "Xã Chiềng Khương", code: "SL_NEW_51" }, // (Từ Mường Sai, Chiềng Khương)
            { name: "Xã Mường Hung", code: "SL_NEW_52" }, // (Từ Chiềng Cang, Mường Hung)
            { name: "Xã Chiềng Khoong", code: "SL_NEW_53" }, // (Từ Mường Cai, Chiềng Khoong)
            { name: "Xã Mường Lầm", code: "SL_NEW_54" }, // (Từ Đứa Mòn, Mường Lầm)
            { name: "Xã Nậm Ty", code: "SL_NEW_55" }, // (Từ Chiềng Phung, Nậm Ty)
            { name: "Xã Sông Mã", code: "SL_NEW_56" }, // (Từ TT Sông Mã, Nà Nghịu)
            { name: "Xã Huổi Một", code: "SL_NEW_57" }, // (Từ Nậm Mằn, Huổi Một)
            { name: "Xã Chiềng Sơ", code: "SL_NEW_58" }, // (Từ Yên Hưng, Chiềng Sơ)

            // --- NHÓM XÃ MỚI (KHU VỰC SỐP CỘP CŨ) ---
            { name: "Xã Sốp Cộp", code: "SL_NEW_59" }, // (Từ Mường Và, Nậm Lạnh...)
            { name: "Xã Púng Bánh", code: "SL_NEW_60" }, // (Từ Dồm Cang, Sam Kha...)

            // --- NHÓM PHƯỜNG MỚI (TP SƠN LA) ---
            { name: "Phường Tô Hiệu", code: "SL_NEW_61" }, // (Từ Quyết Thắng, Quyết Tâm...)
            { name: "Phường Chiềng An", code: "SL_NEW_62" }, // (Từ Chiềng An, Chiềng Xôm...)
            { name: "Phường Chiềng Cơi", code: "SL_NEW_63" }, // (Từ Chiềng Cơi, Hua La...)
            { name: "Phường Chiềng Sinh", code: "SL_NEW_64" }, // (Từ Chiềng Sinh, Chiềng Ngần)

            // --- NHÓM PHƯỜNG MỚI (THỊ XÃ MỘC CHÂU - CŨ) ---
            { name: "Phường Mộc Châu", code: "SL_NEW_65" }, // (Từ Mộc Lỵ, Mường Sang...)
            { name: "Phường Mộc Sơn", code: "SL_NEW_66" }, // (Từ Đông Sang...)
            { name: "Phường Vân Sơn", code: "SL_NEW_67" }, // (Từ Bình Minh...)
            { name: "Phường Thảo Nguyên", code: "SL_NEW_68" }, // (Từ Cờ Đỏ...)

            // --- XÃ GIỮ NGUYÊN ---
            { name: "Xã Mường Lạn", code: "SL_OLD_01" },
            { name: "Xã Phiêng Khoài", code: "SL_OLD_02" },
            { name: "Xã Suối Tọ", code: "SL_OLD_03" },
            { name: "Xã Ngọc Chiến", code: "SL_OLD_04" },
            { name: "Xã Tân Yên", code: "SL_OLD_05" },
            { name: "Xã Mường Bám", code: "SL_OLD_06" },
            { name: "Xã Mường Lèo", code: "SL_OLD_07" }
        ]
    },

    // =================================================================
    // TỈNH TÂY NINH (MỚI - BAO GỒM CẢ KHU VỰC LONG AN CŨ THEO VĂN BẢN)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Tây Ninh",
        code: "80", // Mã tỉnh Tây Ninh cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC LONG AN CŨ - THEO VĂN BẢN) ---
            { name: "Xã Hưng Điền", code: "TN_NEW_01" }, // (Từ Hưng Hà...)
            { name: "Xã Vĩnh Thạnh", code: "TN_NEW_02" },
            { name: "Xã Tân Hưng", code: "TN_NEW_03" }, // (Từ TT Tân Hưng...)
            { name: "Xã Vĩnh Châu", code: "TN_NEW_04" },
            { name: "Xã Tuyên Bình", code: "TN_NEW_05" },
            { name: "Xã Vĩnh Hưng", code: "TN_NEW_06" }, // (Từ TT Vĩnh Hưng...)
            { name: "Xã Khánh Hưng", code: "TN_NEW_07" },
            { name: "Xã Tuyên Thạnh", code: "TN_NEW_08" },
            { name: "Xã Bình Hiệp", code: "TN_NEW_09" },
            { name: "Xã Bình Hòa", code: "TN_NEW_10" },
            { name: "Xã Mộc Hóa", code: "TN_NEW_11" }, // (Từ TT Bình Phong Thạnh...)
            { name: "Xã Hậu Thạnh", code: "TN_NEW_12" },
            { name: "Xã Nhơn Hòa Lập", code: "TN_NEW_13" },
            { name: "Xã Nhơn Ninh", code: "TN_NEW_14" },
            { name: "Xã Tân Thạnh", code: "TN_NEW_15" }, // (Từ TT Tân Thạnh...)
            { name: "Xã Bình Thành", code: "TN_NEW_16" },
            { name: "Xã Thạnh Phước", code: "TN_NEW_17" },
            { name: "Xã Thạnh Hóa", code: "TN_NEW_18" }, // (Từ TT Thạnh Hóa...)
            { name: "Xã Tân Tây", code: "TN_NEW_19" },
            { name: "Xã Thủ Thừa", code: "TN_NEW_20" }, // (Từ TT Thủ Thừa...)
            { name: "Xã Mỹ An", code: "TN_NEW_21" },
            { name: "Xã Mỹ Thạnh", code: "TN_NEW_22" },
            { name: "Xã Tân Long", code: "TN_NEW_23" },
            { name: "Xã Mỹ Quý", code: "TN_NEW_24" },
            { name: "Xã Đông Thành", code: "TN_NEW_25" },
            { name: "Xã Đức Huệ", code: "TN_NEW_26" }, // (Từ Bình Hòa Bắc...)
            { name: "Xã An Ninh", code: "TN_NEW_27" },
            { name: "Xã Hiệp Hòa", code: "TN_NEW_28" },
            { name: "Xã Hậu Nghĩa", code: "TN_NEW_29" }, // (Từ TT Hậu Nghĩa...)
            { name: "Xã Hòa Khánh", code: "TN_NEW_30" },
            { name: "Xã Đức Lập", code: "TN_NEW_31" },
            { name: "Xã Mỹ Hạnh", code: "TN_NEW_32" },
            { name: "Xã Đức Hòa", code: "TN_NEW_33" }, // (Từ TT Đức Hòa...)
            { name: "Xã Thạnh Lợi", code: "TN_NEW_34" },
            { name: "Xã Bình Đức", code: "TN_NEW_35" },
            { name: "Xã Lương Hòa", code: "TN_NEW_36" },
            { name: "Xã Bến Lức", code: "TN_NEW_37" }, // (Từ TT Bến Lức...)
            { name: "Xã Mỹ Yên", code: "TN_NEW_38" },
            { name: "Xã Long Cang", code: "TN_NEW_39" },
            { name: "Xã Rạch Kiến", code: "TN_NEW_40" },
            { name: "Xã Mỹ Lệ", code: "TN_NEW_41" },
            { name: "Xã Tân Lân", code: "TN_NEW_42" },
            { name: "Xã Cần Đước", code: "TN_NEW_43" }, // (Từ TT Cần Đước...)
            { name: "Xã Long Hựu", code: "TN_NEW_44" },
            { name: "Xã Phước Lý", code: "TN_NEW_45" },
            { name: "Xã Mỹ Lộc", code: "TN_NEW_46" },
            { name: "Xã Cần Giuộc", code: "TN_NEW_47" }, // (Từ TT Cần Giuộc...)
            { name: "Xã Phước Vĩnh Tây", code: "TN_NEW_48" },
            { name: "Xã Tân Tập", code: "TN_NEW_49" },
            { name: "Xã Vàm Cỏ", code: "TN_NEW_50" },
            { name: "Xã Tân Trụ", code: "TN_NEW_51" }, // (Từ TT Tân Trụ...)
            { name: "Xã Nhựt Tảo", code: "TN_NEW_52" },
            { name: "Xã Thuận Mỹ", code: "TN_NEW_53" },
            { name: "Xã An Lục Long", code: "TN_NEW_54" },
            { name: "Xã Tầm Vu", code: "TN_NEW_55" }, // (Từ TT Tầm Vu...)
            { name: "Xã Vĩnh Công", code: "TN_NEW_56" },

            // --- NHÓM XÃ MỚI (KHU VỰC TÂY NINH CŨ) ---
            { name: "Xã Phước Chỉ", code: "TN_NEW_57" },
            { name: "Xã Hưng Thuận", code: "TN_NEW_58" },
            { name: "Xã Thạnh Đức", code: "TN_NEW_59" },
            { name: "Xã Phước Thạnh", code: "TN_NEW_60" },
            { name: "Xã Truông Mít", code: "TN_NEW_61" },
            { name: "Xã Lộc Ninh", code: "TN_NEW_62" },
            { name: "Xã Cầu Khởi", code: "TN_NEW_63" },
            { name: "Xã Dương Minh Châu", code: "TN_NEW_64" }, // (Từ TT Dương Minh Châu...)
            { name: "Xã Tân Đông", code: "TN_NEW_65" },
            { name: "Xã Tân Châu", code: "TN_NEW_66" }, // (Từ TT Tân Châu...)
            { name: "Xã Tân Phú", code: "TN_NEW_67" },
            { name: "Xã Tân Hội", code: "TN_NEW_68" },
            { name: "Xã Tân Thành", code: "TN_NEW_69" },
            { name: "Xã Tân Hòa", code: "TN_NEW_70" },
            { name: "Xã Tân Lập", code: "TN_NEW_71" },
            { name: "Xã Tân Biên", code: "TN_NEW_72" }, // (Từ TT Tân Biên...)
            { name: "Xã Thạnh Bình", code: "TN_NEW_73" },
            { name: "Xã Trà Vong", code: "TN_NEW_74" },
            { name: "Xã Phước Vinh", code: "TN_NEW_75" },
            { name: "Xã Hòa Hội", code: "TN_NEW_76" },
            { name: "Xã Ninh Điền", code: "TN_NEW_77" },
            { name: "Xã Châu Thành", code: "TN_NEW_78" }, // (Từ TT Châu Thành...)
            { name: "Xã Hảo Đước", code: "TN_NEW_79" },
            { name: "Xã Long Chữ", code: "TN_NEW_80" },
            { name: "Xã Long Thuận", code: "TN_NEW_81" },
            { name: "Xã Bến Cầu", code: "TN_NEW_82" }, // (Từ TT Bến Cầu...)

            // --- NHÓM PHƯỜNG MỚI (KHU VỰC LONG AN CŨ - THEO VĂN BẢN) ---
            { name: "Phường Kiến Tường", code: "TN_NEW_83" }, // (Từ P1, P2, P3 TX Kiến Tường)
            { name: "Phường Long An", code: "TN_NEW_84" }, // (Từ P1, P3, P4... TP Tân An)
            { name: "Phường Tân An", code: "TN_NEW_85" }, // (Từ P7 TP Tân An...)
            { name: "Phường Khánh Hậu", code: "TN_NEW_86" },

            // --- NHÓM PHƯỜNG MỚI (KHU VỰC TP TÂY NINH CŨ) ---
            { name: "Phường Tân Ninh", code: "TN_NEW_87" }, // (Từ P1, P2, P3...)
            { name: "Phường Bình Minh", code: "TN_NEW_88" },
            { name: "Phường Ninh Thạnh", code: "TN_NEW_89" },

            // --- NHÓM PHƯỜNG MỚI (KHU VỰC HÒA THÀNH CŨ) ---
            { name: "Phường Long Hoa", code: "TN_NEW_90" }, // (Từ Long Thành Bắc...)
            { name: "Phường Hòa Thành", code: "TN_NEW_91" },

            // --- NHÓM PHƯỜNG MỚI (KHU VỰC GÒ DẦU & TRẢNG BÀNG CŨ) ---
            { name: "Phường Thanh Điền", code: "TN_NEW_92" },
            { name: "Phường Trảng Bàng", code: "TN_NEW_93" }, // (Từ An Hòa, Trảng Bàng)
            { name: "Phường An Tịnh", code: "TN_NEW_94" },
            { name: "Phường Gò Dầu", code: "TN_NEW_95" }, // (Từ Gia Bình, TT Gò Dầu...)
            { name: "Phường Gia Lộc", code: "TN_NEW_96" }
        ]
    },

    // =================================================================
    // TỈNH THÁI NGUYÊN (MỚI - BAO GỒM CẢ KHU VỰC BẮC KẠN CŨ)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Thái Nguyên",
        code: "19", // Mã tỉnh Thái Nguyên cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC THÁI NGUYÊN CŨ) ---
            { name: "Xã Tân Cương", code: "TN_NEW_01" }, // (Từ Thịnh Đức, Bình Sơn...)
            { name: "Xã Đại Phúc", code: "TN_NEW_02" }, // (Từ TT Hùng Sơn...)
            { name: "Xã Thành Công", code: "TN_NEW_03" },
            { name: "Xã Định Hóa", code: "TN_NEW_04" }, // (Từ TT Chợ Chu...)
            { name: "Xã Bình Yên", code: "TN_NEW_05" },
            { name: "Xã Trung Hội", code: "TN_NEW_06" },
            { name: "Xã Phượng Tiến", code: "TN_NEW_07" },
            { name: "Xã Phú Đình", code: "TN_NEW_08" },
            { name: "Xã Bình Thành", code: "TN_NEW_09" },
            { name: "Xã Kim Phượng", code: "TN_NEW_10" },
            { name: "Xã Lam Vỹ", code: "TN_NEW_11" },
            { name: "Xã Võ Nhai", code: "TN_NEW_12" }, // (Từ TT Đình Cả...)
            { name: "Xã Dân Tiến", code: "TN_NEW_13" },
            { name: "Xã Nghinh Tường", code: "TN_NEW_14" },
            { name: "Xã Thần Sa", code: "TN_NEW_15" },
            { name: "Xã La Hiên", code: "TN_NEW_16" },
            { name: "Xã Tràng Xá", code: "TN_NEW_17" },
            { name: "Xã Phú Lương", code: "TN_NEW_18" }, // (Từ TT Đu...)
            { name: "Xã Vô Tranh", code: "TN_NEW_19" },
            { name: "Xã Yên Trạch", code: "TN_NEW_20" },
            { name: "Xã Hợp Thành", code: "TN_NEW_21" },
            { name: "Xã Đồng Hỷ", code: "TN_NEW_22" }, // (Từ TT Hóa Thượng...)
            { name: "Xã Quang Sơn", code: "TN_NEW_23" },
            { name: "Xã Trại Cau", code: "TN_NEW_24" },
            { name: "Xã Nam Hòa", code: "TN_NEW_25" },
            { name: "Xã Văn Hán", code: "TN_NEW_26" },
            { name: "Xã Văn Lăng", code: "TN_NEW_27" },
            { name: "Xã Đại Từ", code: "TN_NEW_28" },
            { name: "Xã Đức Lương", code: "TN_NEW_29" },
            { name: "Xã Phú Thịnh", code: "TN_NEW_30" },
            { name: "Xã La Bằng", code: "TN_NEW_31" },
            { name: "Xã Phú Lạc", code: "TN_NEW_32" },
            { name: "Xã An Khánh", code: "TN_NEW_33" },
            { name: "Xã Quân Chu", code: "TN_NEW_34" },
            { name: "Xã Vạn Phú", code: "TN_NEW_35" },
            { name: "Xã Phú Xuyên", code: "TN_NEW_36" },
            { name: "Xã Phú Bình", code: "TN_NEW_37" }, // (Từ TT Hương Sơn...)
            { name: "Xã Tân Thành", code: "TN_NEW_38" },
            { name: "Xã Điềm Thụy", code: "TN_NEW_39" },
            { name: "Xã Kha Sơn", code: "TN_NEW_40" },
            { name: "Xã Tân Khánh", code: "TN_NEW_41" },

            // --- NHÓM XÃ MỚI (KHU VỰC BẮC KẠN CŨ - THEO VĂN BẢN) ---
            { name: "Xã Bằng Thành", code: "TN_NEW_42" }, // (Pác Nặm)
            { name: "Xã Nghiên Loan", code: "TN_NEW_43" },
            { name: "Xã Cao Minh", code: "TN_NEW_44" },
            { name: "Xã Ba Bể", code: "TN_NEW_45" },
            { name: "Xã Chợ Rã", code: "TN_NEW_46" },
            { name: "Xã Phúc Lộc", code: "TN_NEW_47" },
            { name: "Xã Thượng Minh", code: "TN_NEW_48" },
            { name: "Xã Đồng Phúc", code: "TN_NEW_49" },
            { name: "Xã Bằng Vân", code: "TN_NEW_50" }, // (Ngân Sơn)
            { name: "Xã Ngân Sơn", code: "TN_NEW_51" },
            { name: "Xã Nà Phặc", code: "TN_NEW_52" },
            { name: "Xã Hiệp Lực", code: "TN_NEW_53" },
            { name: "Xã Nam Cường", code: "TN_NEW_54" }, // (Chợ Đồn)
            { name: "Xã Quảng Bạch", code: "TN_NEW_55" },
            { name: "Xã Yên Thịnh", code: "TN_NEW_56" },
            { name: "Xã Chợ Đồn", code: "TN_NEW_57" },
            { name: "Xã Yên Phong", code: "TN_NEW_58" },
            { name: "Xã Nghĩa Tá", code: "TN_NEW_59" },
            { name: "Xã Phủ Thông", code: "TN_NEW_60" }, // (Bạch Thông)
            { name: "Xã Cẩm Giàng", code: "TN_NEW_61" },
            { name: "Xã Vĩnh Thông", code: "TN_NEW_62" },
            { name: "Xã Bạch Thông", code: "TN_NEW_63" },
            { name: "Xã Phong Quang", code: "TN_NEW_64" },
            { name: "Xã Văn Lang", code: "TN_NEW_65" }, // (Na Rì)
            { name: "Xã Cường Lợi", code: "TN_NEW_66" },
            { name: "Xã Na Rì", code: "TN_NEW_67" },
            { name: "Xã Trần Phú", code: "TN_NEW_68" },
            { name: "Xã Côn Minh", code: "TN_NEW_69" },
            { name: "Xã Xuân Dương", code: "TN_NEW_70" },
            { name: "Xã Tân Kỳ", code: "TN_NEW_71" }, // (Chợ Mới)
            { name: "Xã Thanh Mai", code: "TN_NEW_72" },
            { name: "Xã Thanh Thịnh", code: "TN_NEW_73" },
            { name: "Xã Chợ Mới", code: "TN_NEW_74" },
            { name: "Xã Yên Bình", code: "TN_NEW_75" },

            // --- NHÓM PHƯỜNG MỚI (TP THÁI NGUYÊN, SÔNG CÔNG, PHỔ YÊN) ---
            { name: "Phường Phan Đình Phùng", code: "TN_NEW_76" }, // (Từ Trưng Vương, Túc Duyên...)
            { name: "Phường Linh Sơn", code: "TN_NEW_77" }, // (Từ Chùa Hang...)
            { name: "Phường Tích Lương", code: "TN_NEW_78" },
            { name: "Phường Gia Sàng", code: "TN_NEW_79" },
            { name: "Phường Quyết Thắng", code: "TN_NEW_80" },
            { name: "Phường Quan Triều", code: "TN_NEW_81" },
            { name: "Phường Sông Công", code: "TN_NEW_82" }, // (Từ Thắng Lợi...)
            { name: "Phường Bá Xuyên", code: "TN_NEW_83" },
            { name: "Phường Bách Quang", code: "TN_NEW_84" },
            { name: "Phường Phổ Yên", code: "TN_NEW_85" }, // (Từ Ba Hàng...)
            { name: "Phường Vạn Xuân", code: "TN_NEW_86" },
            { name: "Phường Trung Thành", code: "TN_NEW_87" },
            { name: "Phường Phúc Thuận", code: "TN_NEW_88" },

            // --- NHÓM PHƯỜNG MỚI (KHU VỰC TP BẮC KẠN CŨ) ---
            { name: "Phường Đức Xuân", code: "TN_NEW_89" }, // (Từ Minh Khai, Huyền Tụng...)
            { name: "Phường Bắc Kạn", code: "TN_NEW_90" }, // (Từ Sông Cầu, Phùng Chí Kiên...)

            // --- XÃ GIỮ NGUYÊN ---
            { name: "Xã Sảng Mộc", code: "TN_OLD_01" },
            { name: "Xã Thượng Quan", code: "TN_OLD_02" }
        ]
    },

    // =================================================================
    // TỈNH THANH HÓA (MỚI - SAU SÁP NHẬP)
    // Cấu trúc: Bỏ cấp Huyện, Xã/Phường trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Thanh Hóa",
        code: "38", // Mã tỉnh Thanh Hóa cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC NÔNG THÔN) ---
            { name: "Xã Các Sơn", code: "TH_NEW_01" }, // (Từ Anh Sơn, Các Sơn)
            { name: "Xã Trường Lâm", code: "TH_NEW_02" }, // (Từ Tân Trường, Trường Lâm)
            { name: "Xã Hà Trung", code: "TH_NEW_03" }, // (Từ Hà Đông, Hà Ngọc...)
            { name: "Xã Tống Sơn", code: "TH_NEW_04" }, // (Từ TT Hà Lĩnh...)
            { name: "Xã Hà Long", code: "TH_NEW_05" }, // (Từ TT Hà Long...)
            { name: "Xã Hoạt Giang", code: "TH_NEW_06" },
            { name: "Xã Lĩnh Toại", code: "TH_NEW_07" },
            { name: "Xã Triệu Lộc", code: "TH_NEW_08" },
            { name: "Xã Đông Thành", code: "TH_NEW_09" },
            { name: "Xã Hậu Lộc", code: "TH_NEW_10" }, // (Từ TT Hậu Lộc...)
            { name: "Xã Hoa Lộc", code: "TH_NEW_11" },
            { name: "Xã Vạn Lộc", code: "TH_NEW_12" },
            { name: "Xã Nga Sơn", code: "TH_NEW_13" }, // (Từ TT Nga Sơn...)
            { name: "Xã Nga Thắng", code: "TH_NEW_14" },
            { name: "Xã Hồ Vương", code: "TH_NEW_15" },
            { name: "Xã Tân Tiến", code: "TH_NEW_16" },
            { name: "Xã Nga An", code: "TH_NEW_17" },
            { name: "Xã Ba Đình", code: "TH_NEW_18" },
            { name: "Xã Hoằng Hóa", code: "TH_NEW_19" }, // (Từ TT Bút Sơn...)
            { name: "Xã Hoằng Tiến", code: "TH_NEW_20" },
            { name: "Xã Hoằng Thanh", code: "TH_NEW_21" },
            { name: "Xã Hoằng Lộc", code: "TH_NEW_22" },
            { name: "Xã Hoằng Châu", code: "TH_NEW_23" },
            { name: "Xã Hoằng Sơn", code: "TH_NEW_24" },
            { name: "Xã Hoằng Phú", code: "TH_NEW_25" },
            { name: "Xã Hoằng Giang", code: "TH_NEW_26" },
            { name: "Xã Lưu Vệ", code: "TH_NEW_27" }, // (Từ TT Tân Phong...)
            { name: "Xã Quảng Yên", code: "TH_NEW_28" },
            { name: "Xã Quảng Ngọc", code: "TH_NEW_29" },
            { name: "Xã Quảng Ninh", code: "TH_NEW_30" },
            { name: "Xã Quảng Bình", code: "TH_NEW_31" },
            { name: "Xã Tiên Trang", code: "TH_NEW_32" },
            { name: "Xã Quảng Chính", code: "TH_NEW_33" },
            { name: "Xã Nông Cống", code: "TH_NEW_34" }, // (Từ TT Nông Cống...)
            { name: "Xã Thắng Lợi", code: "TH_NEW_35" },
            { name: "Xã Trung Chính", code: "TH_NEW_36" },
            { name: "Xã Trường Văn", code: "TH_NEW_37" },
            { name: "Xã Thăng Bình", code: "TH_NEW_38" },
            { name: "Xã Tượng Lĩnh", code: "TH_NEW_39" },
            { name: "Xã Công Chính", code: "TH_NEW_40" },
            { name: "Xã Thiệu Hóa", code: "TH_NEW_41" }, // (Từ Thiệu Phúc...)
            { name: "Xã Thiệu Quang", code: "TH_NEW_42" },
            { name: "Xã Thiệu Tiến", code: "TH_NEW_43" },
            { name: "Xã Thiệu Toán", code: "TH_NEW_44" },
            { name: "Xã Thiệu Trung", code: "TH_NEW_45" },
            { name: "Xã Yên Định", code: "TH_NEW_46" }, // (Từ TT Quán Lào...)
            { name: "Xã Yên Trường", code: "TH_NEW_47" },
            { name: "Xã Yên Phú", code: "TH_NEW_48" },
            { name: "Xã Quý Lộc", code: "TH_NEW_49" },
            { name: "Xã Yên Ninh", code: "TH_NEW_50" },
            { name: "Xã Định Tân", code: "TH_NEW_51" },
            { name: "Xã Định Hòa", code: "TH_NEW_52" },
            { name: "Xã Thọ Xuân", code: "TH_NEW_53" }, // (Từ TT Thọ Xuân...)
            { name: "Xã Thọ Long", code: "TH_NEW_54" },
            { name: "Xã Xuân Hòa", code: "TH_NEW_55" },
            { name: "Xã Sao Vàng", code: "TH_NEW_56" }, // (Từ TT Sao Vàng...)
            { name: "Xã Lam Sơn", code: "TH_NEW_57" },
            { name: "Xã Thọ Lập", code: "TH_NEW_58" },
            { name: "Xã Xuân Tín", code: "TH_NEW_59" },
            { name: "Xã Xuân Lập", code: "TH_NEW_60" },
            { name: "Xã Vĩnh Lộc", code: "TH_NEW_61" }, // (Từ TT Vĩnh Lộc...)
            { name: "Xã Tây Đô", code: "TH_NEW_62" },
            { name: "Xã Biện Thượng", code: "TH_NEW_63" },
            { name: "Xã Triệu Sơn", code: "TH_NEW_64" }, // (Từ TT Triệu Sơn...)
            { name: "Xã Thọ Bình", code: "TH_NEW_65" },
            { name: "Xã Thọ Ngọc", code: "TH_NEW_66" },
            { name: "Xã Thọ Phú", code: "TH_NEW_67" },
            { name: "Xã Hợp Tiến", code: "TH_NEW_68" },
            { name: "Xã An Nông", code: "TH_NEW_69" },
            { name: "Xã Tân Ninh", code: "TH_NEW_70" }, // (Từ TT Nưa...)
            { name: "Xã Đồng Tiến", code: "TH_NEW_71" },
            { name: "Xã Hồi Xuân", code: "TH_NEW_72" }, // (Từ TT Hồi Xuân...)
            { name: "Xã Nam Xuân", code: "TH_NEW_73" },
            { name: "Xã Thiên Phủ", code: "TH_NEW_74" },
            { name: "Xã Hiền Kiệt", code: "TH_NEW_75" },
            { name: "Xã Phú Lệ", code: "TH_NEW_76" },
            { name: "Xã Trung Thành", code: "TH_NEW_77" },
            { name: "Xã Tam Lư", code: "TH_NEW_78" },
            { name: "Xã Quan Sơn", code: "TH_NEW_79" },
            { name: "Xã Trung Hạ", code: "TH_NEW_80" },
            { name: "Xã Linh Sơn", code: "TH_NEW_81" }, // (Từ TT Lang Chánh...)
            { name: "Xã Đồng Lương", code: "TH_NEW_82" },
            { name: "Xã Văn Phú", code: "TH_NEW_83" },
            { name: "Xã Giao An", code: "TH_NEW_84" },
            { name: "Xã Bá Thước", code: "TH_NEW_85" }, // (Từ TT Cành Nàng...)
            { name: "Xã Thiết Ống", code: "TH_NEW_86" },
            { name: "Xã Văn Nho", code: "TH_NEW_87" },
            { name: "Xã Điền Quang", code: "TH_NEW_88" },
            { name: "Xã Điền Lư", code: "TH_NEW_89" },
            { name: "Xã Quý Lương", code: "TH_NEW_90" },
            { name: "Xã Cổ Lũng", code: "TH_NEW_91" },
            { name: "Xã Pù Luông", code: "TH_NEW_92" },
            { name: "Xã Ngọc Lặc", code: "TH_NEW_93" }, // (Từ TT Ngọc Lặc...)
            { name: "Xã Thạch Lập", code: "TH_NEW_94" },
            { name: "Xã Ngọc Liên", code: "TH_NEW_95" },
            { name: "Xã Minh Sơn", code: "TH_NEW_96" },
            { name: "Xã Nguyệt Ấn", code: "TH_NEW_97" },
            { name: "Xã Kiên Thọ", code: "TH_NEW_98" },
            { name: "Xã Cẩm Thạch", code: "TH_NEW_99" },
            { name: "Xã Cẩm Thủy", code: "TH_NEW_100" }, // (Từ TT Phong Sơn...)
            { name: "Xã Cẩm Tú", code: "TH_NEW_101" },
            { name: "Xã Cẩm Vân", code: "TH_NEW_102" },
            { name: "Xã Cẩm Tân", code: "TH_NEW_103" },
            { name: "Xã Kim Tân", code: "TH_NEW_104" }, // (Từ TT Kim Tân...)
            { name: "Xã Vân Du", code: "TH_NEW_105" }, // (Từ TT Vân Du...)
            { name: "Xã Ngọc Trạo", code: "TH_NEW_106" },
            { name: "Xã Thạch Bình", code: "TH_NEW_107" },
            { name: "Xã Thành Vinh", code: "TH_NEW_108" },
            { name: "Xã Thạch Quảng", code: "TH_NEW_109" },
            { name: "Xã Như Xuân", code: "TH_NEW_110" }, // (Từ TT Yên Cát...)
            { name: "Xã Thượng Ninh", code: "TH_NEW_111" },
            { name: "Xã Xuân Bình", code: "TH_NEW_112" },
            { name: "Xã Hóa Quỳ", code: "TH_NEW_113" },
            { name: "Xã Thanh Phong", code: "TH_NEW_114" },
            { name: "Xã Thanh Quân", code: "TH_NEW_115" },
            { name: "Xã Xuân Du", code: "TH_NEW_116" },
            { name: "Xã Mậu Lâm", code: "TH_NEW_117" },
            { name: "Xã Như Thanh", code: "TH_NEW_118" }, // (Từ TT Bến Sung...)
            { name: "Xã Yên Thọ", code: "TH_NEW_119" },
            { name: "Xã Thanh Kỳ", code: "TH_NEW_120" },
            { name: "Xã Thường Xuân", code: "TH_NEW_121" }, // (Từ TT Thường Xuân...)
            { name: "Xã Luận Thành", code: "TH_NEW_122" },
            { name: "Xã Tân Thành", code: "TH_NEW_123" },
            { name: "Xã Thắng Lộc", code: "TH_NEW_124" },
            { name: "Xã Xuân Chinh", code: "TH_NEW_125" },
            { name: "Xã Mường Lát", code: "TH_NEW_126" }, // (Từ TT Mường Lát)

            // --- NHÓM PHƯỜNG MỚI (TP THANH HÓA, SẦM SƠN, BỈM SƠN, NGHI SƠN) ---
            { name: "Phường Hạc Thành", code: "TH_NEW_127" }, // (Từ Phú Sơn, Lam Sơn...)
            { name: "Phường Quảng Phú", code: "TH_NEW_128" }, // (Từ Quảng Hưng...)
            { name: "Phường Đông Quang", code: "TH_NEW_129" }, // (Từ Quảng Thắng...)
            { name: "Phường Đông Sơn", code: "TH_NEW_130" }, // (Từ Rừng Thông...)
            { name: "Phường Đông Tiến", code: "TH_NEW_131" }, // (Từ Đông Lĩnh...)
            { name: "Phường Hàm Rồng", code: "TH_NEW_132" }, // (Từ Thiệu Dương...)
            { name: "Phường Nguyệt Viên", code: "TH_NEW_133" }, // (Từ Tào Xuyên...)
            { name: "Phường Sầm Sơn", code: "TH_NEW_134" }, // (Từ Bắc Sơn...)
            { name: "Phường Nam Sầm Sơn", code: "TH_NEW_135" }, // (Từ Quảng Vinh...)
            { name: "Phường Bỉm Sơn", code: "TH_NEW_136" }, // (Từ Đông Sơn...)
            { name: "Phường Quang Trung", code: "TH_NEW_137" }, // (Từ Bắc Sơn...)
            { name: "Phường Ngọc Sơn", code: "TH_NEW_138" }, // (Từ Thanh Sơn...)
            { name: "Phường Tân Dân", code: "TH_NEW_139" },
            { name: "Phường Hải Lĩnh", code: "TH_NEW_140" },
            { name: "Phường Tĩnh Gia", code: "TH_NEW_141" }, // (Từ Hải Hòa...)
            { name: "Phường Đào Duy Từ", code: "TH_NEW_142" },
            { name: "Phường Hải Bình", code: "TH_NEW_143" },
            { name: "Phường Trúc Lâm", code: "TH_NEW_144" },
            { name: "Phường Nghi Sơn", code: "TH_NEW_145" },

            // --- CÁC XÃ GIỮ NGUYÊN ---
            { name: "Xã Phú Xuân (Quan Hóa)", code: "TH_OLD_01" },
            { name: "Xã Mường Chanh", code: "TH_OLD_02" },
            { name: "Xã Quang Chiểu", code: "TH_OLD_03" },
            { name: "Xã Tam Chung", code: "TH_OLD_04" },
            { name: "Xã Pù Nhi", code: "TH_OLD_05" },
            { name: "Xã Nhi Sơn", code: "TH_OLD_06" },
            { name: "Xã Mường Lý", code: "TH_OLD_07" },
            { name: "Xã Trung Lý", code: "TH_OLD_08" },
            { name: "Xã Trung Sơn", code: "TH_OLD_09" },
            { name: "Xã Na Mèo", code: "TH_OLD_10" },
            { name: "Xã Sơn Thủy", code: "TH_OLD_11" },
            { name: "Xã Sơn Điện", code: "TH_OLD_12" },
            { name: "Xã Mường Mìn", code: "TH_OLD_13" },
            { name: "Xã Tam Thanh", code: "TH_OLD_14" },
            { name: "Xã Yên Khương", code: "TH_OLD_15" },
            { name: "Xã Yên Thắng", code: "TH_OLD_16" },
            { name: "Xã Xuân Thái", code: "TH_OLD_17" },
            { name: "Xã Bát Mọt", code: "TH_OLD_18" },
            { name: "Xã Yên Nhân", code: "TH_OLD_19" },
            { name: "Xã Lương Sơn", code: "TH_OLD_20" },
            { name: "Xã Vạn Xuân", code: "TH_OLD_21" }
        ]
    },

    // =================================================================
    // THÀNH PHỐ HỒ CHÍ MINH (MỚI - SÁP NHẬP CỰC LỚN 5 TỈNH/THÀNH)
    // Cấu trúc: Bỏ cấp Quận/Huyện, Phường/Xã trực thuộc Thành phố
    // =================================================================
    {
        name: "Thành phố Hồ Chí Minh",
        code: "79", // Mã TPHCM cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn TP -> Chọn Phường/Xã luôn
        wards: [
            // --- NHÓM PHƯỜNG MỚI (KHU VỰC NỘI ĐÔ TPHCM CŨ) ---
            { name: "Phường Sài Gòn", code: "HCM_NEW_01" }, // (Từ Bến Nghé, Đa Kao...)
            { name: "Phường Tân Định", code: "HCM_NEW_02" },
            { name: "Phường Bến Thành", code: "HCM_NEW_03" }, // (Từ Phạm Ngũ Lão...)
            { name: "Phường Cầu Ông Lãnh", code: "HCM_NEW_04" }, // (Từ Nguyễn Cư Trinh...)
            { name: "Phường Bàn Cờ", code: "HCM_NEW_05" }, // (Từ P1, P2, P3 Q3...)
            { name: "Phường Xuân Hòa", code: "HCM_NEW_06" }, // (Từ Võ Thị Sáu...)
            { name: "Phường Nhiêu Lộc", code: "HCM_NEW_07" }, // (Từ P9, P11... Q3)
            { name: "Phường Xóm Chiếu", code: "HCM_NEW_08" }, // (Từ P13, P16... Q4)
            { name: "Phường Khánh Hội", code: "HCM_NEW_09" }, // (Từ P8, P9... Q4)
            { name: "Phường Vĩnh Hội", code: "HCM_NEW_10" }, // (Từ P1, P3... Q4)
            { name: "Phường Chợ Quán", code: "HCM_NEW_11" }, // (Từ P1, P2, P4 Q5)
            { name: "Phường An Đông", code: "HCM_NEW_12" }, // (Từ P5, P7, P9 Q5)
            { name: "Phường Chợ Lớn", code: "HCM_NEW_13" }, // (Từ P11, P12... Q5)
            { name: "Phường Bình Tây", code: "HCM_NEW_14" }, // (Từ P2, P9 Q6)
            { name: "Phường Bình Tiên", code: "HCM_NEW_15" }, // (Từ P1, P7, P8 Q6)
            { name: "Phường Bình Phú", code: "HCM_NEW_16" }, // (Từ P10, P11 Q6)
            { name: "Phường Phú Lâm", code: "HCM_NEW_17" }, // (Từ P12, P13, P14 Q6)
            { name: "Phường Tân Thuận", code: "HCM_NEW_18" }, // (Từ Bình Thuận, Tân Thuận Đông/Tây Q7)
            { name: "Phường Phú Thuận", code: "HCM_NEW_19" },
            { name: "Phường Tân Mỹ", code: "HCM_NEW_20" }, // (Từ Tân Phú, Phú Mỹ Q7)
            { name: "Phường Tân Hưng", code: "HCM_NEW_21" }, // (Từ Tân Phong, Tân Quy... Q7)
            { name: "Phường Chánh Hưng", code: "HCM_NEW_22" }, // (Từ P4, Rạch Ông Q8)
            { name: "Phường Phú Định", code: "HCM_NEW_23" }, // (Từ P14, P15... Q8)
            { name: "Phường Bình Đông", code: "HCM_NEW_24" }, // (Từ P6, P7... Q8)
            { name: "Phường Diên Hồng", code: "HCM_NEW_25" }, // (Từ P6, P8 Q10)
            { name: "Phường Vườn Lài", code: "HCM_NEW_26" }, // (Từ P1, P2... Q10)
            { name: "Phường Hòa Hưng", code: "HCM_NEW_27" }, // (Từ P12, P13... Q10)
            { name: "Phường Minh Phụng", code: "HCM_NEW_28" }, // (Từ P1, P7... Q11)
            { name: "Phường Bình Thới", code: "HCM_NEW_29" }, // (Từ P3, P10... Q11)
            { name: "Phường Hòa Bình", code: "HCM_NEW_30" }, // (Từ P5, P14 Q11)
            { name: "Phường Phú Thọ", code: "HCM_NEW_31" }, // (Từ P11, P15 Q11)
            { name: "Phường Đông Hưng Thuận", code: "HCM_NEW_32" }, // (Từ Tân Thới Nhất... Q12)
            { name: "Phường Trung Mỹ Tây", code: "HCM_NEW_33" },
            { name: "Phường Tân Thới Hiệp", code: "HCM_NEW_34" },
            { name: "Phường Thới An", code: "HCM_NEW_35" },
            { name: "Phường An Phú Đông", code: "HCM_NEW_36" },
            { name: "Phường An Lạc", code: "HCM_NEW_37" }, // (Bình Tân)
            { name: "Phường Bình Tân", code: "HCM_NEW_38" }, // (Từ Bình Hưng Hòa B...)
            { name: "Phường Tân Tạo", code: "HCM_NEW_39" },
            { name: "Phường Bình Trị Đông", code: "HCM_NEW_40" },
            { name: "Phường Bình Hưng Hòa", code: "HCM_NEW_41" },
            { name: "Phường Gia Định", code: "HCM_NEW_42" }, // (Từ P1, P2... Bình Thạnh)
            { name: "Phường Bình Thạnh", code: "HCM_NEW_43" }, // (Từ P12, P14...)
            { name: "Phường Bình Lợi Trung", code: "HCM_NEW_44" }, // (Từ P5, P11...)
            { name: "Phường Thạnh Mỹ Tây", code: "HCM_NEW_45" }, // (Từ P19, P22...)
            { name: "Phường Bình Quới", code: "HCM_NEW_46" }, // (Từ P27, P28)
            { name: "Phường Hạnh Thông", code: "HCM_NEW_47" }, // (Từ P1, P3 Gò Vấp)
            { name: "Phường An Nhơn", code: "HCM_NEW_48" }, // (Từ P5, P6...)
            { name: "Phường Gò Vấp", code: "HCM_NEW_49" }, // (Từ P10, P17...)
            { name: "Phường An Hội Đông", code: "HCM_NEW_50" }, // (Từ P15, P16...)
            { name: "Phường Thông Tây Hội", code: "HCM_NEW_51" }, // (Từ P8, P11...)
            { name: "Phường An Hội Tây", code: "HCM_NEW_52" }, // (Từ P12, P14...)
            { name: "Phường Đức Nhuận", code: "HCM_NEW_53" }, // (Từ P4, P5... Phú Nhuận)
            { name: "Phường Cầu Kiệu", code: "HCM_NEW_54" }, // (Từ P1, P2...)
            { name: "Phường Phú Nhuận", code: "HCM_NEW_55" }, // (Từ P8, P10...)
            { name: "Phường Tân Sơn Hòa", code: "HCM_NEW_56" }, // (Từ P1, P2... Tân Bình)
            { name: "Phường Tân Sơn Nhất", code: "HCM_NEW_57" }, // (Từ P4, P5...)
            { name: "Phường Tân Hòa", code: "HCM_NEW_58" }, // (Từ P6, P8...)
            { name: "Phường Bảy Hiền", code: "HCM_NEW_59" }, // (Từ P10, P11...)
            { name: "Phường Tân Bình", code: "HCM_NEW_60" }, // (Từ P13, P14...)
            { name: "Phường Tân Sơn", code: "HCM_NEW_61" },
            { name: "Phường Tây Thạnh", code: "HCM_NEW_62" }, // (Tân Phú)
            { name: "Phường Tân Sơn Nhì", code: "HCM_NEW_63" },
            { name: "Phường Phú Thọ Hòa", code: "HCM_NEW_64" },
            { name: "Phường Tân Phú", code: "HCM_NEW_65" },
            { name: "Phường Phú Thạnh", code: "HCM_NEW_66" },
            { name: "Phường Hiệp Bình", code: "HCM_NEW_67" }, // (Thủ Đức)
            { name: "Phường Thủ Đức", code: "HCM_NEW_68" },
            { name: "Phường Tam Bình", code: "HCM_NEW_69" },
            { name: "Phường Linh Xuân", code: "HCM_NEW_70" },
            { name: "Phường Tăng Nhơn Phú", code: "HCM_NEW_71" },
            { name: "Phường Long Bình", code: "HCM_NEW_72" },
            { name: "Phường Long Phước", code: "HCM_NEW_73" },
            { name: "Phường Long Trường", code: "HCM_NEW_74" },
            { name: "Phường Cát Lái", code: "HCM_NEW_75" },
            { name: "Phường Bình Trưng", code: "HCM_NEW_76" },
            { name: "Phường Phước Long", code: "HCM_NEW_77" },
            { name: "Phường An Khánh", code: "HCM_NEW_78" }, // (Thủ Thiêm, Thảo Điền...)

            // --- NHÓM PHƯỜNG MỚI (BÌNH DƯƠNG CŨ - SÁP NHẬP VÀO TPHCM) ---
            { name: "Phường Đông Hòa", code: "HCM_NEW_79" }, // (Dĩ An)
            { name: "Phường Dĩ An", code: "HCM_NEW_80" },
            { name: "Phường Tân Đông Hiệp", code: "HCM_NEW_81" },
            { name: "Phường An Phú", code: "HCM_NEW_82" }, // (Thuận An)
            { name: "Phường Bình Hòa", code: "HCM_NEW_83" },
            { name: "Phường Lái Thiêu", code: "HCM_NEW_84" },
            { name: "Phường Thuận An", code: "HCM_NEW_85" },
            { name: "Phường Thuận Giao", code: "HCM_NEW_86" },
            { name: "Phường Thủ Dầu Một", code: "HCM_NEW_87" }, // (Phú Cường...)
            { name: "Phường Phú Lợi", code: "HCM_NEW_88" },
            { name: "Phường Chánh Hiệp", code: "HCM_NEW_89" },
            { name: "Phường Bình Dương", code: "HCM_NEW_90" }, // (Phú Mỹ, Hòa Phú...)
            { name: "Phường Hòa Lợi", code: "HCM_NEW_91" }, // (Bến Cát)
            { name: "Phường Phú An", code: "HCM_NEW_92" },
            { name: "Phường Tây Nam", code: "HCM_NEW_93" },
            { name: "Phường Long Nguyên", code: "HCM_NEW_94" },
            { name: "Phường Bến Cát", code: "HCM_NEW_95" },
            { name: "Phường Chánh Phú Hòa", code: "HCM_NEW_96" },
            { name: "Phường Vĩnh Tân", code: "HCM_NEW_97" },
            { name: "Phường Bình Cơ", code: "HCM_NEW_98" },
            { name: "Phường Tân Uyên", code: "HCM_NEW_99" }, // (Uyên Hưng...)
            { name: "Phường Tân Hiệp", code: "HCM_NEW_100" },
            { name: "Phường Tân Khánh", code: "HCM_NEW_101" },

            // --- NHÓM PHƯỜNG MỚI (BÀ RỊA - VŨNG TÀU CŨ - SÁP NHẬP VÀO TPHCM) ---
            { name: "Phường Vũng Tàu", code: "HCM_NEW_102" }, // (Từ P1, P2... P5 Vũng Tàu)
            { name: "Phường Tam Thắng", code: "HCM_NEW_103" }, // (Từ P7, P8...)
            { name: "Phường Rạch Dừa", code: "HCM_NEW_104" }, // (Từ P10...)
            { name: "Phường Phước Thắng", code: "HCM_NEW_105" },
            { name: "Phường Long Hương", code: "HCM_NEW_106" }, // (Bà Rịa)
            { name: "Phường Bà Rịa", code: "HCM_NEW_107" },
            { name: "Phường Tam Long", code: "HCM_NEW_108" },
            { name: "Phường Tân Hải", code: "HCM_NEW_109" },
            { name: "Phường Tân Phước", code: "HCM_NEW_110" }, // (Phú Mỹ)
            { name: "Phường Phú Mỹ", code: "HCM_NEW_111" },
            { name: "Phường Tân Thành", code: "HCM_NEW_112" },

            // --- NHÓM XÃ MỚI (KHU VỰC NGOẠI THÀNH CŨ + LONG AN + TÂY NINH) ---
            { name: "Xã Vĩnh Lộc", code: "HCM_NEW_113" }, // (Bình Chánh)
            { name: "Xã Tân Vĩnh Lộc", code: "HCM_NEW_114" },
            { name: "Xã Bình Lợi", code: "HCM_NEW_115" },
            { name: "Xã Tân Nhựt", code: "HCM_NEW_116" },
            { name: "Xã Bình Chánh", code: "HCM_NEW_117" },
            { name: "Xã Hưng Long", code: "HCM_NEW_118" },
            { name: "Xã Bình Hưng", code: "HCM_NEW_119" },
            { name: "Xã Bình Khánh", code: "HCM_NEW_120" }, // (Cần Giờ)
            { name: "Xã An Thới Đông", code: "HCM_NEW_121" },
            { name: "Xã Cần Giờ", code: "HCM_NEW_122" }, // (Từ Cần Thạnh...)
            { name: "Xã Củ Chi", code: "HCM_NEW_123" }, // (Củ Chi)
            { name: "Xã Tân An Hội", code: "HCM_NEW_124" },
            { name: "Xã Thái Mỹ", code: "HCM_NEW_125" },
            { name: "Xã An Nhơn Tây", code: "HCM_NEW_126" },
            { name: "Xã Nhuận Đức", code: "HCM_NEW_127" },
            { name: "Xã Phú Hòa Đông", code: "HCM_NEW_128" },
            { name: "Xã Bình Mỹ", code: "HCM_NEW_129" },
            { name: "Xã Đông Thạnh", code: "HCM_NEW_130" }, // (Hóc Môn)
            { name: "Xã Hóc Môn", code: "HCM_NEW_131" },
            { name: "Xã Xuân Thới Sơn", code: "HCM_NEW_132" },
            { name: "Xã Bà Điểm", code: "HCM_NEW_133" },
            { name: "Xã Nhà Bè", code: "HCM_NEW_134" }, // (Nhà Bè)
            { name: "Xã Hiệp Phước", code: "HCM_NEW_135" },
            { name: "Xã Thường Tân", code: "HCM_NEW_136" }, // (Bình Dương)
            { name: "Xã Bắc Tân Uyên", code: "HCM_NEW_137" },
            { name: "Xã Phú Giáo", code: "HCM_NEW_138" },
            { name: "Xã Phước Hòa", code: "HCM_NEW_139" },
            { name: "Xã Phước Thành", code: "HCM_NEW_140" },
            { name: "Xã An Long", code: "HCM_NEW_141" },
            { name: "Xã Trừ Văn Thố", code: "HCM_NEW_142" },
            { name: "Xã Bàu Bàng", code: "HCM_NEW_143" },
            { name: "Xã Long Hòa", code: "HCM_NEW_144" },
            { name: "Xã Thanh An", code: "HCM_NEW_145" },
            { name: "Xã Dầu Tiếng", code: "HCM_NEW_146" },
            { name: "Xã Minh Thạnh", code: "HCM_NEW_147" },
            { name: "Xã Châu Pha", code: "HCM_NEW_148" }, // (BRVT)
            { name: "Xã Long Hải", code: "HCM_NEW_149" },
            { name: "Xã Long Điền", code: "HCM_NEW_150" },
            { name: "Xã Phước Hải", code: "HCM_NEW_151" },
            { name: "Xã Đất Đỏ", code: "HCM_NEW_152" },
            { name: "Xã Nghĩa Thành", code: "HCM_NEW_153" },
            { name: "Xã Ngãi Giao", code: "HCM_NEW_154" },
            { name: "Xã Kim Long", code: "HCM_NEW_155" },
            { name: "Xã Châu Đức", code: "HCM_NEW_156" },
            { name: "Xã Bình Giã", code: "HCM_NEW_157" },
            { name: "Xã Xuân Sơn", code: "HCM_NEW_158" },
            { name: "Xã Hồ Tràm", code: "HCM_NEW_159" },
            { name: "Xã Xuyên Mộc", code: "HCM_NEW_160" },
            { name: "Xã Hòa Hội", code: "HCM_NEW_161" },
            { name: "Xã Bàu Lâm", code: "HCM_NEW_162" },

            // --- ĐẶC KHU ---
            { name: "Đặc khu Côn Đảo", code: "HCM_NEW_163" },

            // --- XÃ/PHƯỜNG GIỮ NGUYÊN (THEO VĂN BẢN) ---
            { name: "Phường Thới Hòa", code: "HCM_OLD_01" },
            { name: "Xã Long Sơn", code: "HCM_OLD_02" },
            { name: "Xã Hòa Hiệp", code: "HCM_OLD_03" },
            { name: "Xã Bình Châu", code: "HCM_OLD_04" },
            { name: "Xã Thạnh An", code: "HCM_OLD_05" }
        ]
    },

    // =================================================================
    // TỈNH TUYÊN QUANG (MỚI - SÁP NHẬP TUYÊN QUANG + HÀ GIANG)
    // Cấu trúc: Bỏ cấp Huyện, Xã trực thuộc Tỉnh
    // =================================================================
    {
        name: "Tỉnh Tuyên Quang",
        code: "08", // Mã tỉnh Tuyên Quang cũ
        hasDistricts: false, // 🚩 Đánh dấu: Chọn Tỉnh -> Chọn Xã luôn
        wards: [
            // --- NHÓM XÃ MỚI (KHU VỰC TUYÊN QUANG CŨ) ---
            { name: "Xã Thượng Lâm", code: "TQ_NEW_01" }, // (Từ Khuôn Hà...)
            { name: "Xã Lâm Bình", code: "TQ_NEW_02" }, // (Từ TT Lăng Can...)
            { name: "Xã Minh Quang", code: "TQ_NEW_03" }, // (Từ Phúc Sơn...)
            { name: "Xã Bình An", code: "TQ_NEW_04" },
            { name: "Xã Côn Lôn", code: "TQ_NEW_05" },
            { name: "Xã Yên Hoa", code: "TQ_NEW_06" },
            { name: "Xã Thượng Nông", code: "TQ_NEW_07" },
            { name: "Xã Hồng Thái", code: "TQ_NEW_08" },
            { name: "Xã Nà Hang", code: "TQ_NEW_09" }, // (Từ TT Na Hang...)
            { name: "Xã Tân Mỹ", code: "TQ_NEW_10" },
            { name: "Xã Yên Lập", code: "TQ_NEW_11" },
            { name: "Xã Tân An", code: "TQ_NEW_12" },
            { name: "Xã Chiêm Hóa", code: "TQ_NEW_13" }, // (Từ TT Vĩnh Lộc...)
            { name: "Xã Hòa An", code: "TQ_NEW_14" },
            { name: "Xã Kiên Đài", code: "TQ_NEW_15" },
            { name: "Xã Tri Phú", code: "TQ_NEW_16" },
            { name: "Xã Kim Bình", code: "TQ_NEW_17" },
            { name: "Xã Yên Nguyên", code: "TQ_NEW_18" },
            { name: "Xã Yên Phú", code: "TQ_NEW_19" },
            { name: "Xã Bạch Xa", code: "TQ_NEW_20" },
            { name: "Xã Phù Lưu", code: "TQ_NEW_21" },
            { name: "Xã Hàm Yên", code: "TQ_NEW_22" }, // (Từ TT Tân Yên...)
            { name: "Xã Bình Xa", code: "TQ_NEW_23" },
            { name: "Xã Thái Sơn", code: "TQ_NEW_24" },
            { name: "Xã Thái Hòa", code: "TQ_NEW_25" },
            { name: "Xã Hùng Lợi", code: "TQ_NEW_26" },
            { name: "Xã Trung Sơn", code: "TQ_NEW_27" },
            { name: "Xã Thái Bình", code: "TQ_NEW_28" },
            { name: "Xã Tân Long", code: "TQ_NEW_29" },
            { name: "Xã Xuân Vân", code: "TQ_NEW_30" },
            { name: "Xã Lực Hành", code: "TQ_NEW_31" },
            { name: "Xã Yên Sơn", code: "TQ_NEW_32" }, // (Từ TT Yên Sơn...)
            { name: "Xã Nhữ Khê", code: "TQ_NEW_33" },
            { name: "Xã Tân Trào", code: "TQ_NEW_34" },
            { name: "Xã Minh Thanh", code: "TQ_NEW_35" },
            { name: "Xã Sơn Dương", code: "TQ_NEW_36" }, // (Từ TT Sơn Dương...)
            { name: "Xã Bình Ca", code: "TQ_NEW_37" },
            { name: "Xã Tân Thanh", code: "TQ_NEW_38" },
            { name: "Xã Sơn Thủy", code: "TQ_NEW_39" },
            { name: "Xã Phú Lương", code: "TQ_NEW_40" },
            { name: "Xã Trường Sinh", code: "TQ_NEW_41" },
            { name: "Xã Hồng Sơn", code: "TQ_NEW_42" },
            { name: "Xã Đông Thọ", code: "TQ_NEW_43" },

            // --- NHÓM XÃ MỚI (KHU VỰC HÀ GIANG CŨ - THEO VĂN BẢN) ---
            { name: "Xã Lũng Cú", code: "TQ_NEW_44" },
            { name: "Xã Đồng Văn", code: "TQ_NEW_45" }, // (Từ TT Đồng Văn...)
            { name: "Xã Sà Phìn", code: "TQ_NEW_46" },
            { name: "Xã Phố Bảng", code: "TQ_NEW_47" }, // (Từ TT Phố Bảng...)
            { name: "Xã Lũng Phìn", code: "TQ_NEW_48" },
            { name: "Xã Sủng Máng", code: "TQ_NEW_49" },
            { name: "Xã Sơn Vĩ", code: "TQ_NEW_50" },
            { name: "Xã Mèo Vạc", code: "TQ_NEW_51" }, // (Từ TT Mèo Vạc...)
            { name: "Xã Khâu Vai", code: "TQ_NEW_52" },
            { name: "Xã Niêm Sơn", code: "TQ_NEW_53" },
            { name: "Xã Tát Ngà", code: "TQ_NEW_54" },
            { name: "Xã Thắng Mố", code: "TQ_NEW_55" },
            { name: "Xã Bạch Đích", code: "TQ_NEW_56" },
            { name: "Xã Yên Minh", code: "TQ_NEW_57" }, // (Từ TT Yên Minh...)
            { name: "Xã Mậu Duệ", code: "TQ_NEW_58" },
            { name: "Xã Du Già", code: "TQ_NEW_59" },
            { name: "Xã Đường Thượng", code: "TQ_NEW_60" },
            { name: "Xã Lùng Tám", code: "TQ_NEW_61" },
            { name: "Xã Cán Tỷ", code: "TQ_NEW_62" },
            { name: "Xã Nghĩa Thuận", code: "TQ_NEW_63" },
            { name: "Xã Quản Bạ", code: "TQ_NEW_64" }, // (Từ TT Tam Sơn...)
            { name: "Xã Tùng Vài", code: "TQ_NEW_65" },
            { name: "Xã Yên Cường", code: "TQ_NEW_66" },
            { name: "Xã Đường Hồng", code: "TQ_NEW_67" },
            { name: "Xã Bắc Mê", code: "TQ_NEW_68" }, // (Từ TT Yên Phú...)
            { name: "Xã Minh Ngọc", code: "TQ_NEW_69" },
            { name: "Xã Ngọc Đường", code: "TQ_NEW_70" },
            { name: "Xã Lao Chải", code: "TQ_NEW_71" },
            { name: "Xã Thanh Thủy", code: "TQ_NEW_72" },
            { name: "Xã Phú Linh", code: "TQ_NEW_73" },
            { name: "Xã Linh Hồ", code: "TQ_NEW_74" },
            { name: "Xã Bạch Ngọc (HG)", code: "TQ_NEW_75" }, // (Trùng tên Bạch Ngọc ở trên, thêm suffix)
            { name: "Xã Vị Xuyên", code: "TQ_NEW_76" }, // (Từ TT Vị Xuyên...)
            { name: "Xã Việt Lâm", code: "TQ_NEW_77" },
            { name: "Xã Tân Quang", code: "TQ_NEW_78" },
            { name: "Xã Đồng Tâm", code: "TQ_NEW_79" },
            { name: "Xã Liên Hiệp", code: "TQ_NEW_80" },
            { name: "Xã Bằng Hành", code: "TQ_NEW_81" },
            { name: "Xã Bắc Quang", code: "TQ_NEW_82" }, // (Từ TT Việt Quang...)
            { name: "Xã Hùng An", code: "TQ_NEW_83" },
            { name: "Xã Vĩnh Tuy", code: "TQ_NEW_84" }, // (Từ TT Vĩnh Tuy...)
            { name: "Xã Đồng Yên", code: "TQ_NEW_85" },
            { name: "Xã Tiên Yên", code: "TQ_NEW_86" },
            { name: "Xã Xuân Giang", code: "TQ_NEW_87" },
            { name: "Xã Bằng Lang", code: "TQ_NEW_88" },
            { name: "Xã Yên Thành", code: "TQ_NEW_89" },
            { name: "Xã Quang Bình", code: "TQ_NEW_90" }, // (Từ TT Yên Bình...)
            { name: "Xã Tân Trịnh", code: "TQ_NEW_91" },
            { name: "Xã Thông Nguyên", code: "TQ_NEW_92" },
            { name: "Xã Hồ Thầu", code: "TQ_NEW_93" },
            { name: "Xã Nậm Dịch", code: "TQ_NEW_94" },
            { name: "Xã Tân Tiến", code: "TQ_NEW_95" },
            { name: "Xã Hoàng Su Phì", code: "TQ_NEW_96" }, // (Từ TT Vinh Quang...)
            { name: "Xã Thàng Tín", code: "TQ_NEW_97" },
            { name: "Xã Bản Máy", code: "TQ_NEW_98" },
            { name: "Xã Pờ Ly Ngài", code: "TQ_NEW_99" },
            { name: "Xã Xín Mần", code: "TQ_NEW_100" },
            { name: "Xã Pà Vầy Sủ", code: "TQ_NEW_101" }, // (Từ TT Cốc Pài...)
            { name: "Xã Nấm Dẩn", code: "TQ_NEW_102" },
            { name: "Xã Trung Thịnh", code: "TQ_NEW_103" },
            { name: "Xã Khuôn Lùng", code: "TQ_NEW_104" },

            // --- NHÓM PHƯỜNG MỚI (TP TUYÊN QUANG & HÀ GIANG) ---
            { name: "Phường Mỹ Lâm", code: "TQ_NEW_105" }, // (Từ Mỹ Lâm, Mỹ Bằng...)
            { name: "Phường Minh Xuân", code: "TQ_NEW_106" }, // (Từ Ỷ La, Tân Hà...)
            { name: "Phường Nông Tiến", code: "TQ_NEW_107" },
            { name: "Phường An Tường", code: "TQ_NEW_108" }, // (Từ Hưng Thành, An Tường...)
            { name: "Phường Bình Thuận", code: "TQ_NEW_109" }, // (Từ Đội Cấn...)
            { name: "Phường Hà Giang 1", code: "TQ_NEW_110" }, // (Từ Nguyễn Trãi...)
            { name: "Phường Hà Giang 2", code: "TQ_NEW_111" }, // (Từ Ngọc Hà...)

            // --- XÃ GIỮ NGUYÊN ---
            { name: "Xã Trung Hà", code: "TQ_OLD_01" },
            { name: "Xã Kiến Thiết", code: "TQ_OLD_02" },
            { name: "Xã Hùng Đức", code: "TQ_OLD_03" },
            { name: "Xã Minh Sơn", code: "TQ_OLD_04" },
            { name: "Xã Minh Tân", code: "TQ_OLD_05" },
            { name: "Xã Thuận Hòa", code: "TQ_OLD_06" },
            { name: "Xã Tùng Bá", code: "TQ_OLD_07" },
            { name: "Xã Thượng Sơn", code: "TQ_OLD_08" },
            { name: "Xã Cao Bồ", code: "TQ_OLD_09" },
            { name: "Xã Ngọc Long", code: "TQ_OLD_10" },
            { name: "Xã Giáp Trung", code: "TQ_OLD_11" },
            { name: "Xã Tiên Nguyên", code: "TQ_OLD_12" },
            { name: "Xã Quảng Nguyên", code: "TQ_OLD_13" }
        ]
    },
]