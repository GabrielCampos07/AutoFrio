export interface Car {
  id?: number;
  model_id?: number;
  brand_id?: number;
  license_plate?: string;
  year?: number;
  mileage?: number;
  color?: string;
  model?: Model;
  brand?: Brand;
}

export interface Model extends Brand {}

export interface Brand {
  id?: number;
  name?: string;
}
