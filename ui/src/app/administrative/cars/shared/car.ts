export interface Car {
  id?: number;
  license_plate?: string;
  year?: number;
  mileage?: number;
  color?: string;
  model?: Model;
  brand?: Brand;
  model_id?: number;
  brand_id?: number;
}

export interface Model extends Brand {}

export interface Brand {
  id?: number;
  name?: string;
}
