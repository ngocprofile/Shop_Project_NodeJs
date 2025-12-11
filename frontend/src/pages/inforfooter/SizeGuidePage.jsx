import { Footprints, Ruler, Scissors, Shirt } from 'lucide-react';
import { useState } from 'react';
import styles from './InfoPage.module.css';

const SizeGuidePage = () => {
    const [activeTab, setActiveTab] = useState('men'); // 'men', 'women', 'shoes'

    return (
        <div className={styles.container}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className={styles.title}>Hướng Dẫn Chọn Size</h1>
                <p className={styles.subtitle}>Bảng quy đổi kích cỡ chuẩn cho sản phẩm Style Code</p>

                {/* Tabs chuyển đổi Nam/Nữ/Giày */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setActiveTab('men')}
                        style={{
                            padding: '10px 30px',
                            borderRadius: '30px',
                            border: activeTab === 'men' ? '1px solid #000' : '1px solid #ddd',
                            background: activeTab === 'men' ? '#000' : '#fff',
                            color: activeTab === 'men' ? '#fff' : '#555',
                            cursor: 'pointer',
                            fontWeight: '600',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        <Shirt size={18} /> Nam
                    </button>
                    <button
                        onClick={() => setActiveTab('women')}
                        style={{
                            padding: '10px 30px',
                            borderRadius: '30px',
                            border: activeTab === 'women' ? '1px solid #000' : '1px solid #ddd',
                            background: activeTab === 'women' ? '#000' : '#fff',
                            color: activeTab === 'women' ? '#fff' : '#555',
                            cursor: 'pointer',
                            fontWeight: '600',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        <Scissors size={18} /> Nữ
                    </button>
                    <button
                        onClick={() => setActiveTab('shoes')}
                        style={{
                            padding: '10px 30px',
                            borderRadius: '30px',
                            border: activeTab === 'shoes' ? '1px solid #000' : '1px solid #ddd',
                            background: activeTab === 'shoes' ? '#000' : '#fff',
                            color: activeTab === 'shoes' ? '#fff' : '#555',
                            cursor: 'pointer',
                            fontWeight: '600',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        <Footprints size={18} /> Giày Dép
                    </button>
                </div>
            </div>

            {/* Nội dung Tab: NAM */}
            {activeTab === 'men' && (
                <div className="animate-fade-in">
                    <div className={styles.section}>
                        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                             Áo Thun / Áo Khoác / Sơ Mi Nam
                        </h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Size</th>
                                    <th>Chiều cao (cm)</th>
                                    <th>Cân nặng (kg)</th>
                                    <th>Vòng ngực (cm)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td><strong>XS</strong></td><td>155 - 160</td><td>45 - 50</td><td>84 - 88</td></tr>
                                <tr><td><strong>S</strong></td><td>160 - 165</td><td>50 - 58</td><td>88 - 92</td></tr>
                                <tr><td><strong>M</strong></td><td>165 - 170</td><td>59 - 68</td><td>92 - 96</td></tr>
                                <tr><td><strong>L</strong></td><td>170 - 175</td><td>69 - 78</td><td>96 - 100</td></tr>
                                <tr><td><strong>XL</strong></td><td>175 - 180</td><td>79 - 85</td><td>100 - 104</td></tr>
                                <tr><td><strong>XXL</strong></td><td>180 - 185</td><td>86 - 95</td><td>104 - 108</td></tr>
                                <tr><td><strong>3XL</strong></td><td> 185</td><td> 95</td><td>108 - 112</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.section}>
                        <h2>Quần Nam (Jeans / Kaki / Short)</h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Size</th>
                                    <th>Vòng eo (cm)</th>
                                    <th>Vòng mông (cm)</th>
                                    <th>Chiều dài (cm)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td><strong>29 (S)</strong></td><td>72 - 75</td><td>88 - 91</td><td>96</td></tr>
                                <tr><td><strong>30 (M)</strong></td><td>75 - 78</td><td>91 - 94</td><td>98</td></tr>
                                <tr><td><strong>31 (M+)</strong></td><td>78 - 81</td><td>94 - 97</td><td>99</td></tr>
                                <tr><td><strong>32 (L)</strong></td><td>81 - 84</td><td>97 - 100</td><td>100</td></tr>
                                <tr><td><strong>34 (XL)</strong></td><td>84 - 87</td><td>100 - 103</td><td>102</td></tr>
                                <tr><td><strong>36 (XXL)</strong></td><td>87 - 90</td><td>103 - 106</td><td>103</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Nội dung Tab: NỮ */}
            {activeTab === 'women' && (
                <div className="animate-fade-in">
                    <div className={styles.section}>
                        <h2>Áo & Đầm Nữ</h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Size</th>
                                    <th>Chiều cao (cm)</th>
                                    <th>Cân nặng (kg)</th>
                                    <th>Vòng 1 (cm)</th>
                                    <th>Vòng 2 (cm)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td><strong>XS</strong></td><td>148 - 153</td><td>38 - 42</td><td>78 - 81</td><td>58 - 61</td></tr>
                                <tr><td><strong>S</strong></td><td>153 - 158</td><td>43 - 47</td><td>82 - 85</td><td>62 - 65</td></tr>
                                <tr><td><strong>M</strong></td><td>158 - 163</td><td>48 - 54</td><td>86 - 89</td><td>66 - 69</td></tr>
                                <tr><td><strong>L</strong></td><td>163 - 168</td><td>55 - 60</td><td>90 - 94</td><td>70 - 74</td></tr>
                                <tr><td><strong>XL</strong></td><td>168 - 173</td><td>61 - 68</td><td>95 - 100</td><td>75 - 80</td></tr>
                                <tr><td><strong>One Size</strong></td><td>155 - 165</td><td>45 - 60</td><td colSpan={2}>Free Size (Co giãn)</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Nội dung Tab: GIÀY DÉP */}
            {activeTab === 'shoes' && (
                <div className="animate-fade-in">
                    <div className={styles.section}>
                        <h2>Bảng Quy Đổi Size Giày (EU Standard)</h2>
                        <p style={{ marginBottom: '15px', fontStyle: 'italic', color: '#666' }}>
                            * Lưu ý: Nếu chân bạn bè ngang hoặc dày, vui lòng cộng thêm 0.5 - 1 size so với bảng chuẩn.
                        </p>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Chiều dài chân (cm)</th>
                                    <th>Size Việt Nam / EU</th>
                                    <th>Size US (Tham khảo)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>22.0 - 22.5</td><td><strong>35 - 35.5</strong></td><td>5 - 5.5</td></tr>
                                <tr><td>22.5 - 23.0</td><td><strong>36 - 36.5</strong></td><td>6 - 6.5</td></tr>
                                <tr><td>23.0 - 23.5</td><td><strong>37 - 37.5</strong></td><td>7 - 7.5</td></tr>
                                <tr><td>23.5 - 24.0</td><td><strong>38 - 38.5</strong></td><td>8 - 8.5</td></tr>
                                <tr><td>24.0 - 24.5</td><td><strong>39 - 39.5</strong></td><td>6.5 - 7 (Men)</td></tr>
                                <tr><td>24.5 - 25.0</td><td><strong>40 - 40.5</strong></td><td>7.5 - 8</td></tr>
                                <tr><td>25.0 - 26.0</td><td><strong>41 - 41.5</strong></td><td>8.5 - 9</td></tr>
                                <tr><td>26.0 - 26.5</td><td><strong>42 - 42.5</strong></td><td>9.5 - 10</td></tr>
                                <tr><td>26.5 - 27.5</td><td><strong>43 - 43.5</strong></td><td>10.5 - 11</td></tr>
                                <tr><td>27.5 - 28.5</td><td><strong>44 - 44.5</strong></td><td>11.5 - 12</td></tr>
                                <tr><td>28.5 - 29.5</td><td><strong>45 - 46</strong></td><td>12.5 - 13</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Hướng dẫn cách đo */}
            <div className={styles.section} style={{ marginTop: '60px', background: '#f9f9f9', padding: '30px', borderRadius: '8px' }}>
                <h2><Ruler size={24} style={{ verticalAlign: 'middle', marginRight: '10px' }}/>Cách Lấy Số Đo Cơ Thể</h2>
                

[Image of size chart measurement guide]

                <ul style={{ listStyleType: 'circle', paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li><strong>Vòng ngực:</strong> Đo quanh vòng ngực chỗ lớn nhất.</li>
                    <li><strong>Vòng eo:</strong> Đo quanh vòng eo chỗ nhỏ nhất (thường trên rốn 2cm).</li>
                    <li><strong>Vòng mông:</strong> Đo quanh vòng mông chỗ lớn nhất.</li>
                    <li><strong>Chiều dài chân (đo giày):</strong> Đặt bàn chân lên tờ giấy trắng, đánh dấu điểm gót chân và ngón chân dài nhất, sau đó đo khoảng cách giữa 2 điểm.</li>
                </ul>
            </div>
        </div>
    );
};

export default SizeGuidePage;