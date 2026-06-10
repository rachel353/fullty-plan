export type Subcategory = {
  id: string;
  name: string;
  active: boolean;
};

export type Category = {
  id: string;
  name: string;
  active: boolean;
  subcategories: Subcategory[];
};

export const categories: Category[] = [
  {
    id: "cat_furniture",
    name: "가구",
    active: true,
    subcategories: [
      { id: "sub_chair", name: "의자", active: true },
      { id: "sub_sofa", name: "소파", active: true },
      { id: "sub_table", name: "테이블", active: true },
      { id: "sub_storage", name: "수납 / 선반", active: true },
      { id: "sub_bed", name: "침대 / 침구", active: true },
      { id: "sub_etc", name: "기타", active: true },
    ],
  },
  {
    id: "cat_lighting",
    name: "조명",
    active: true,
    subcategories: [
      { id: "sub_pendant", name: "펜던트 조명", active: true },
      { id: "sub_floor_lamp", name: "플로어 램프", active: true },
      { id: "sub_table_lamp", name: "테이블 램프", active: true },
    ],
  },
  {
    id: "cat_tableware",
    name: "테이블웨어",
    active: true,
    subcategories: [
      { id: "sub_dinnerware", name: "식기", active: true },
      { id: "sub_glassware", name: "글라스웨어", active: true },
      { id: "sub_cutlery", name: "커트러리", active: true },
    ],
  },
  {
    id: "cat_homedeco",
    name: "홈데코",
    active: true,
    subcategories: [
      { id: "sub_rug", name: "러그 / 카펫", active: true },
      { id: "sub_cushion", name: "쿠션 / 패브릭", active: true },
      { id: "sub_vase", name: "화병 / 오브제", active: true },
    ],
  },
  {
    id: "cat_art",
    name: "아트",
    active: true,
    subcategories: [
      { id: "sub_painting", name: "회화", active: true },
      { id: "sub_print", name: "판화 / 포스터", active: true },
      { id: "sub_sculpture", name: "조각", active: true },
    ],
  },
];

export function getActiveCategoryNames(): string[] {
  return categories.filter((c) => c.active).map((c) => c.name);
}
