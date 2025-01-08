"use client";

import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import { getSession, signOut } from "next-auth/react";
import { createDecipheriv, randomBytes } from "crypto";
import { useCustomToast } from "./useCustomToast";

type ServiceParams = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};
//
type ApiResponse<T = any> = AxiosResponse<T> & {
  success?: boolean;
  message?: string;
  iv?: string;
};

type UseApiProps = {
  service: (args: ServiceParams) => Promise<ApiResponse>;
  params?: any;
  useAuth?: boolean;
};

type ConfigProps = {
  myConfig?: AxiosRequestConfig;
  token: string | undefined;
};

export const buildConfig = async ({
  myConfig,
  token,
}: ConfigProps): Promise<AxiosRequestConfig> => {
  return {
    ...myConfig,
    headers: {
      ...myConfig?.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

export const decrypt = (
  encryptedData: string,
  base64Iv: string,
  sharedKey: string
): string | null => {
  try {
    const algorithm = "aes-256-cbc";
    const iv = Buffer.from(base64Iv, "base64");
    const key = Buffer.from(sharedKey, "utf8")
      .slice(0, 32)
      .toString()
      .padEnd(32, "\0");

    const decipher = createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(encryptedData, "base64", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    return null;
  }
};

export function UseApi({ service, params, useAuth }: UseApiProps) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null); 
  const [pagination, setPagination] = useState<any>(null);
  const toast = useCustomToast()

  const fetch = async (body?: any, myConfig?: AxiosRequestConfig) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    setResponseTime(null);
    setPagination(null);

    const startTime = Date.now();

    try {
      let config = myConfig

      if (useAuth) {
        const session = await getSession();
         config = await buildConfig({
          myConfig,
          token: session?.user.accessToken,
        });
     
      }

      const response = (await service({ config, body, params })) as any;

      const endTime = Date.now();
      setResponseTime(endTime - startTime);

      if (response.success === false) {
        setError(response.message);

        return;
      }

      if (response.iv) {
        try {
          const decrypted = decrypt(
            response.data,
            response.iv,
            process.env.NEXT_PUBLIC_ENCRYPTION_SHARED_KEY || ""
          );
          setData(JSON.parse(decrypted || ""));
        } catch (error) {
          setError("Failed to decrypt data");
        }
      } else {
        setData(response.data);
        setPagination(response.pagination);
      }


    } catch (err: any) {
      const endTime = Date.now();
      setResponseTime(endTime - startTime);
      // Calculate and set the response time in case of an error

      if (err.response) {
        setError(err.response.data);
      } else if (err.request) {
      } else {
        setError(err.message);
      }
      if (err.response?.status === 500) {
        setError(
          "Сервертэй холбогдоход алдаа гарлаа. Та түр хүлээгээд дахин оролдоно уу."
        );
      }
      if (err?.response?.status === 401) {
        
        signOut({redirect: false,});
        // localStorage.clear();
        toast({
          type:'warning',
          title:'Системээс гарлаа.',
          description:'Та дахин нэвтрэн орно уу.'
        })
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [{ data, isLoading, error, responseTime, pagination }, fetch] as const;
}
