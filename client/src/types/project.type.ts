export interface ProjectRequest {
  name: string;
}

export interface ProjectResponse {
  id: number;
  name: string;
}

export interface ProjectListResponse {
    success: boolean;
  data: ProjectResponse[];
  message: string;
}
