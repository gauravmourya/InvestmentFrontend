import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { FilterButtons, Pagination, Table } from "../../components";
import usePagineatedCommitmentData from "../../hooks/usePagineatedCommitmentData";

export function Commitments() {
  const { investorId } = useParams();
  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = useMemo(() => ({
    investorId: Number(investorId),
    assetClass: activeFilter === "All" ? "" : activeFilter
  }), [investorId, activeFilter]);

  const { data, loading, error } = usePagineatedCommitmentData(
    `/investor/investorCommitment`,
    page,
    10,
    filters
  );

  const commitments = data?.commitments || [];
  const totalPages = data?.totalPages || 1;
  const assetClassGroups = data?.groupedAssetClassDetails || [];

  const dynamicFilters = useMemo(() => {
    const total = assetClassGroups.reduce((sum, g) => sum + g.totalSum, 0);
    return [
      { label: "All", value: `£${(total / 1_000_000).toFixed(1)}M` },
      ...assetClassGroups.map(group => ({
        label: group.name,
        value: `£${(group.totalSum / 1_000_000).toFixed(1)}M`
      }))
    ];
  }, [assetClassGroups]);

  const columns = [
    { key: "id", label: "Id" },
    { key: "assetClass", label: "Asset Class" },
    { key: "currency", label: "Currency" },
    { key: "amount", label: "Amount", isFinancial:true }
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Commitments</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="text-red-500">{error.message || "Error loading data."}</div>
      ) : (
        <>
          <FilterButtons
            filters={dynamicFilters}
            activeFilter={activeFilter}
            onFilterChange={(label) => {
              setActiveFilter(label);
              setPage(1);
            }}
          />

          <Table columns={columns} data={commitments} />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
