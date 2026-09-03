import { useState, useEffect, useRef, useCallback } from "react";
import { Microsoft365CatalogService } from "@/services/catalog/microsoft-365-catalog.service";
import { Microsoft365Plan } from "@/services/catalog/microsoft-365-catalog.types";

export function useMicrosoft365Plans() {
  const [plans, setPlans] = useState<Microsoft365Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const requestCountRef = useRef(0);

  const fetchPlans = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    
    const requestId = ++requestCountRef.current;
    
    try {
      const data = await Microsoft365CatalogService.getPlans();
      if (requestId !== requestCountRef.current) return;
      
      // Sort plans according to sortOrder provided by Backend
      const sortedPlans = [...data].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      setPlans(sortedPlans);
    } catch {
      if (requestId !== requestCountRef.current) return;
      setError(true);
    } finally {
      if (requestId === requestCountRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchPlans();
    const ref = requestCountRef;
    return () => {
      ref.current++; // Invalidate pending requests on unmount
    };
  }, [fetchPlans]);

  return { plans, isLoading, error, fetchPlans };
}
