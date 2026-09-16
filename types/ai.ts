export interface AIRequest {
  tool: string;
  prompt: string;
}

export interface AIResponse {
  success: boolean;
  result: string;
  error?: string;
}