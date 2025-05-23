import { userAtom } from "@/stores/user";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface UseCheckUserFieldParams {
  field: string;
  condition: (value: any) => boolean;
  redirectTo: string;
}

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

function useCheckUserFields(conditions: UseCheckUserFieldParams[]) {
  const [loaded, setLoaded] = React.useState(false);
  const router = useRouter();
  const user = useAtomValue(userAtom);

  useEffect(() => {
    const userData = user?.user;
    if (!userData || !loaded) return;
    for (const { field, condition, redirectTo } of conditions) {
      const fieldValue = getNestedValue(userData, field);
      if (fieldValue === undefined) return;
      if (condition(fieldValue)) {
        router.push(redirectTo);
        break;
      }
    }
  }, [user, conditions, router, loaded]);

  useEffect(() => {
    setLoaded(true);
    return () => setLoaded(false);
  }, []);
}

export default useCheckUserFields;
