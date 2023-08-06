"use client";
import { useRouter, useSearchParams } from "next/navigation";

const Error = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMsg = searchParams.get("error");
  return (
    <div>
      <h3 className="text-red-500">{errorMsg}</h3>
      <button
        onClick={() => {
          router.back();
        }}
      >
        Try again
      </button>
    </div>
  );
};

export default Error;
