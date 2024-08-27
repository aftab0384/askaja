import axios from 'axios';
import { useEffect } from 'react';
// aftab sir IP ADDRESS
export const BackendUrl = 'http://192.168.1.167:3000';

// AWS S3Bucket
export const AwsBucketUrl = 'http://13.200.168.251:3000';

// cafe project
export const cafeBackend = 'http://localhost:8080';
export const aavgbackend = 'http://localhost:3000';
export const createAxiosInstance = () => {
    const token = localStorage.getItem('token');
    return axios.create({
      baseURL: cafeBackend,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
  };

