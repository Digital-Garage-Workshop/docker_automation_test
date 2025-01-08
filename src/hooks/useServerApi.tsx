import { AxiosRequestConfig, AxiosResponse } from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { createDecipheriv } from "crypto";

type ServiceParams = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

type ApiResponse<T = any> = AxiosResponse<T> & {
  success?: boolean;
  message?: string;
  pagination?: any;
  iv?: string;
};

type FetchDataProps = {
  service: (args: ServiceParams) => Promise<ApiResponse>;
  body?: any;
  params?: any;
  config?: AxiosRequestConfig;
};

// Utility function to build the Axios config
const buildConfig = async (
  myConfig?: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const session = await getServerSession(authOptions);

  return {
    ...myConfig,
    headers: {
      ...myConfig?.headers,
      Authorization: session?.user?.accessToken
        ? `Bearer ${session.user.accessToken}`
        : "",
    },
  };
};

const decrypt = (
  encryptedData: string,
  base64Iv: string,
  sharedKey: string
): string | null => {
  try {
    const algorithm = "aes-256-cbc";
    const iv = Buffer.from(base64Iv, "base64");
    // Ensure the key is exactly 32 bytes long
    const key = Buffer.from(sharedKey, "utf8")
      .slice(0, 32)
      .toString()
      .padEnd(32, "\0");

    const decipher = createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(encryptedData, "base64", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    // console.error("Decryption failed:", error);
    return null;
  }
};

export async function useServerApi({
  service,
  body,
  params,
  config: myConfig,
}: FetchDataProps) {
  try {
    const config = await buildConfig(myConfig);
    const startTime = Date.now();

    const response = await service({ config, body, params });
    const responseTime = Date.now() - startTime;

    if (response.success === false) {
      throw new Error(response.message);
    }

    if (response.iv) {
      const decrypted = decrypt(
        response.data,
        response.iv,
        process.env.NEXT_PUBLIC_ENCRYPTION_SHARED_KEY || ""
      );
      return {
        data: JSON.parse(decrypted || ""),
        pagination: response.pagination,
        responseTime,
        error: null,
      };
    }

    return {
      data: response.data,
      pagination: response.pagination,
      responseTime,
      error: null,
    };
  } catch (err: any) {
    let errorMessage = err.message;

    if (err.response?.status === 500) {
      errorMessage =
        "Сервертэй холбогдоход алдаа гарлаа. Та түр хүлээгээд дахин оролдоно уу.";
    }

    return {
      data: null,
      pagination: null,
      responseTime: null,
      error: errorMessage,
    };
  }
}
