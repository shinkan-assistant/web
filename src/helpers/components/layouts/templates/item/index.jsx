import ContentHeader from "../base/ui/header";

export default function ItemTemplateLayout({ pageInfo, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 font-inter text-gray-800">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="ml-3 mb-4">
            <ContentHeader
              info={pageInfo.getItemContent()}
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
