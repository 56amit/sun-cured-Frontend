import axiosClient from "./axiosClient";

export interface TestimonialPayload {
  userId: number;
  rating: number;
  content: string;
}

export interface TestimonialResponse {
  id: number;
  rating: number;
  content: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

export const getApprovedTestimonials = async (): Promise<TestimonialResponse[]> => {
  const { data } = await axiosClient.get<TestimonialResponse[]>("/testimonials/approved");
  return data;
};

export const submitTestimonial = async (payload: TestimonialPayload) => {
  const token = localStorage.getItem("token");
  const { data } = await axiosClient.post("/testimonials", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
