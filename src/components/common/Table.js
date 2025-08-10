import { useNavigate } from "react-router-dom";

function formatLargeNumber(num) {
  if (num === null || num === undefined) return "";
  if (num < 1000) return num.toString();

  const units = ["", "K", "M", "B", "T"];
  const order = Math.floor(Math.log10(num) / 3);
  const unitName = units[order];
  const scaled = num / Math.pow(10, order * 3);
  const formatted = scaled % 1 === 0 ? scaled.toFixed(0) : scaled.toFixed(1);

  return `${formatted}${unitName}`;
}

export function Table({ columns, data, isDrilldown = false }) {
  const navigate = useNavigate();

  return (
    <div className="mb-8 overflow-x-auto">
      <table className="table-auto w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="border-b border-gray-300 px-4 py-2 text-left"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-500 border border-gray-300"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={idx}
                className={`${
                  isDrilldown ? "cursor-pointer hover:bg-gray-100 transition" : ""
                } ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                onClick={() => {
                  if (isDrilldown && row["id"]) {
                    navigate(`${row["id"]}/commitments`);
                  }
                }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`border-b border-gray-300 px-4 py-2 text-${col.align || "left"}`}
                    style={{
                      color: col.key === "totalCommitment" ? "blue" : "inherit",
                      textDecoration:
                        col.key === "totalCommitment" && isDrilldown ? "underline" : "none",
                    }}
                  >
                    {
                      col.isFinancial? formatLargeNumber(row[col.key])
                      :  row[col.key]
                    }
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
