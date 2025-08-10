import { useState, useEffect } from "react";

export default function usePaginatedInvestorData(url, page, pageSize , filters = {}) {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
            console.log(url);

      setLoading(true);
      setError(null);
      try {
        const fullUrl = `https://localhost:7204${url}`;

        const fetchOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pageNumber:page,
            pageSize: pageSize,
            ...filters,
          }),
        };

        const res = await fetch(fullUrl, fetchOptions);
        const text = await res.text();

        let json;
        try {
          json = JSON.parse(text);
        } catch (parseError) {
          throw new Error(`Invalid JSON: ${parseError.message}`);
        }

        if (isMounted) {
          setData(json);
          setTotalPages(json.totalPages || 0);
        }
      } catch (err) {
        console.error("Error fetching paginated data:", err);
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, page, pageSize, JSON.stringify(filters)]);

  return { data, totalPages, loading, error };
}
