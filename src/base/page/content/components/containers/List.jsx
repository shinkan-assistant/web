import ItemLink from "../atoms/ItemLink";
import ContentHeader from "../organisms/Header";

export function ListItemContainer({ pageInfo, record, children }) {
  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 p-6"
    >
      <div className="mb-4">
        <ContentHeader
          info={pageInfo.getItemContent({record: record})}
        />
      </div>
      {children}
      <div className="mt-4">
        <ItemLink
          info={pageInfo.getItemContent({record: record})}
        />
      </div>
    </div>
  );
}

export function ListContainer({ children }) {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {children}
    </div>
  );
}
