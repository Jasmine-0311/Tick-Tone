
export const SPEC_BY_CATEGORY = {
  各式錶帶: {
    材質: '請依款式對照商品說明（尼龍 / 皮革 / 矽膠材質不同）',
    相容機型: 'Apple Watch 38 / 40 / 41 mm、42 / 44 / 45 / 49 mm',
    內容物: '錶帶 x 1',
    產地: 'CHINA',
  },
  // 可依需求新增其他分類...
};

export const SPEC_OVERRIDE_BY_ID = {};

export function getProductSpecs(product) {
  if (!product) return null;
  return (
    SPEC_OVERRIDE_BY_ID[product.id] ||
    SPEC_BY_CATEGORY[product.category] ||
    null
  );
}