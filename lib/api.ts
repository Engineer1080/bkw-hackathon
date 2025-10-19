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

// ============================================================================
// AI Report Generation
// ============================================================================

export interface ReportRequest {
  project_name: string;
  location: string;
  project_type: "office" | "laboratory" | "hospital" | "school" | "residential";
  federal_state: string;
}

export interface ReportOptions {
  request: ReportRequest;
  room_book?: File;
  cost_estimate?: File;
  export_format: "docx" | "markdown";
}

/**
 * Generate AI-powered report using Claude Sonnet 4.5
 * Returns a Blob that can be downloaded
 */
export async function generateAIReport(options: ReportOptions): Promise<Blob> {
  const formData = new FormData();
  
  // Add request data as JSON string
  formData.append("request", JSON.stringify(options.request));
  
  // Add optional files
  if (options.room_book) {
    formData.append("room_book", options.room_book);
  }
  if (options.cost_estimate) {
    formData.append("cost_estimate", options.cost_estimate);
  }
  
  // Add export format
  formData.append("export_format", options.export_format);
  
  const response = await fetch(`${API_URL}/generate_report`, {
    method: "POST",
    body: formData,
    // Don't set Content-Type header - browser will set it with boundary
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `API Error: ${response.statusText}`);
  }
  
  return response.blob();
}

/**
 * Download a blob as a file
 */
export function downloadBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

// ============================================================================
// AI Cost Estimation
// ============================================================================

export interface CostEstimationRequest {
  project_name: string;
  location: string;
  project_type: "office" | "laboratory" | "hospital" | "school" | "residential";
  federal_state: string;
  total_area_m2: number;
  number_of_rooms?: number;
  building_height_m?: number;
}

export interface CostGroup {
  betrag: number;
  pro_m2: number;
  beschreibung: string;
}

export interface CostEstimationResponse {
  success: boolean;
  project_name: string;
  total_area_m2: number;
  cost_estimation: {
    kg_410: CostGroup;
    kg_420: CostGroup;
    kg_430: CostGroup;
    kg_434: CostGroup;
    kg_440: CostGroup;
    kg_470: CostGroup;
    kg_480: CostGroup;
    gesamt_kg_400: { betrag: number; pro_m2: number };
    genauigkeit: string;
    hinweise: string[];
  };
  generated_by: string;
  disclaimer: string;
}

/**
 * Generate AI-powered cost estimation using Claude Sonnet 4.5
 * Returns detailed cost breakdown by cost groups (KG 410-480)
 */
export async function estimateCosts(
  request: CostEstimationRequest
): Promise<CostEstimationResponse> {
  const response = await fetch(`${API_URL}/estimate-costs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `API Error: ${response.statusText}`);
  }

  return response.json();
}

