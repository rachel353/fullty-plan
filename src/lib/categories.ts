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
    name: "Furniture",
    active: true,
    subcategories: [
      { id: "sub_chair", name: "Chair", active: true },
      { id: "sub_sofa", name: "Sofa", active: true },
      { id: "sub_table", name: "Table", active: true },
      { id: "sub_storage", name: "Storage / Shelving", active: true },
      { id: "sub_bed", name: "Bed / Bedding", active: true },
      { id: "sub_etc", name: "Other", active: true },
    ],
  },
  {
    id: "cat_lighting",
    name: "Lighting",
    active: true,
    subcategories: [
      { id: "sub_pendant", name: "Pendant Light", active: true },
      { id: "sub_floor_lamp", name: "Floor Lamp", active: true },
      { id: "sub_table_lamp", name: "Table Lamp", active: true },
    ],
  },
  {
    id: "cat_tableware",
    name: "Tableware",
    active: true,
    subcategories: [
      { id: "sub_dinnerware", name: "Dinnerware", active: true },
      { id: "sub_glassware", name: "Glassware", active: true },
      { id: "sub_cutlery", name: "Cutlery", active: true },
    ],
  },
  {
    id: "cat_homedeco",
    name: "Home Decor",
    active: true,
    subcategories: [
      { id: "sub_rug", name: "Rug / Carpet", active: true },
      { id: "sub_cushion", name: "Cushion / Fabric", active: true },
      { id: "sub_vase", name: "Vase / Objet", active: true },
    ],
  },
  {
    id: "cat_art",
    name: "Art",
    active: true,
    subcategories: [
      { id: "sub_painting", name: "Painting", active: true },
      { id: "sub_print", name: "Print / Poster", active: true },
      { id: "sub_sculpture", name: "Sculpture", active: true },
    ],
  },
];

export function getActiveCategoryNames(): string[] {
  return categories.filter((c) => c.active).map((c) => c.name);
}
