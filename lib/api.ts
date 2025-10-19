// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface RoomFeatures {
  volume_m3: number;
  area_m2: number;
  total_heating_load_kw: number;
}

export interface PredictionResponse {
  Room_Type_No: number;
  input: RoomFeatures;
}

export interface ApiHealthResponse {
  status: string;
  message: string;
}

/**
 * Predict room type based on room features
 */
export async function predictRoomType(
  features: RoomFeatures
): Promise<PredictionResponse> {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(features),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Check API health status
 */
export async function checkApiHealth(): Promise<ApiHealthResponse> {
  const response = await fetch(`${API_URL}/`);
  
  if (!response.ok) {
    throw new Error(`API Health Check Failed: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Get room type name from number
 */
export function getRoomTypeName(roomTypeNo: number): string {
  const roomTypes: Record<number, string> = {
    1: "Büro / Office",
    2: "Besprechungsraum / Meeting Room",
    3: "Labor / Laboratory",
    4: "Lager / Storage",
    5: "Technikraum / Technical Room",
    6: "Sanitärraum / Sanitary Room",
    7: "Küche / Kitchen",
    8: "Flur / Corridor",
    9: "Serverraum / Server Room",
    10: "Empfang / Reception",
  };
  
  return roomTypes[roomTypeNo] || `Raumtyp ${roomTypeNo}`;
}

