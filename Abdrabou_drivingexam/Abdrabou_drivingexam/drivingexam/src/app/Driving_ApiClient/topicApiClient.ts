"use server";

import { axiosInstance, createErrorResponse, ErrorResponse } from "@/app/utils/apiClient";
import { Topic } from "@/app/types/Topic";

// get topics todo

export async function getTopics(): Promise<Topic[] | ErrorResponse> {

  try {
    const res = await axiosInstance.get<Topic[]>("topics");
    return res.data;
  } 

  catch (e) {
    return createErrorResponse(e);
  }
}

export async function getTopicsByModule(moduleGuid: string): Promise<Topic[] | ErrorResponse> {

  try {
    const res = await axiosInstance.get<Topic[]>(`topics?assignedModule=${moduleGuid}`);
    return res.data;
  } 
  
  catch (e) {
    return createErrorResponse(e);
  }
}
