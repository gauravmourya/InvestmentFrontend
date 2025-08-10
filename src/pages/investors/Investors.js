import { useState } from "react";
import { Pagination, Table } from "../../components";
import usePaginatedInvestorData from "../../hooks/usePaginatedInvestorData";


export function Investors() {
  const [page, setPage] = useState(1);

  
  const columns = [
    { key: "id", label: "Id" },
    { key: "investorName", label: "Name" },
    { key: "investorType", label: "Type" },
    { key: "dateAdded", label: "Date Added" },
    { key: "address", label: "Address" },
    { key: "totalCommitment", label: "Total Commitment", isFinancial:true }
  ];

  const { data, loading, error, totalPages } = usePaginatedInvestorData(
    `/investor/allInvestorDetails`, page, 10
  );

  console.log(data);
  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>

          <h1 className="text-2xl font-bold mb-4">Investors</h1>

          <Table
            title='Investors'
            columns={columns}
            data={data.investorDetails || []}
            isDrilldown={true}
          />

          < Pagination currentPage={page} totalPages={data.totalPages} onPageChange={setPage} />
          
        </>
      )}
    </div>
  );
};

