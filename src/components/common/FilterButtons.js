export function FilterButtons({ filters, activeFilter, onFilterChange }) {
  return (
    <div className="flex gap-3 mb-4">
      {filters.map((filter) => (
        <button
          key={filter.label}
          onClick={() => onFilterChange(filter.label)}
          className={`px-4 py-2 border rounded ${
            activeFilter === filter.label ? "bg-black text-white" : "bg-white"
          }`}
        >
          {filter.label} <span className="text-gray-500">{filter.value}</span>
        </button>
      ))}
    </div>
  );
}

