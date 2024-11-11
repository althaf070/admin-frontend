import { useEffect } from "react";
import { useProviderStore } from "../store/providerStore";
import { Card, Spinner, Badge } from "flowbite-react";
import { Link } from "react-router-dom";

const ProviderPage = () => {
  const { providers, isLoading, error, fetchProvider } = useProviderStore();

  useEffect(() => {
    fetchProvider(); 
  }, [fetchProvider]);

  if (isLoading) {
    return (
      <div className="flex justify-center w-full min-h-screen items-center">
        <Spinner color="info" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {providers?.length > 0 ? (
        providers.map((prov) => (
          <Link key={prov._id} to={`/admin/providers/${prov._id}`} className="w-full">
            <Card className="p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-full w-full">
              <div className="mb-3">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 capitalize">
                  {prov.username}
                </h5>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 break-words">
                  {prov.email}
                </p>
                <p className="text-sm text-gray-600">Phone: {prov.phoneNumber}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-800 font-medium">Total Services: {prov.services.length}</span>
                <Badge color={prov.verified ? "success" : "failure"}>
                  {prov.verified ? "Verified" : "Not Verified"}
                </Badge>
              </div>
            </Card>
          </Link>
        ))
      ) : (
        <div className="text-center text-gray-600 w-full">No provider available</div>
      )}
    </div>
  );
};

export default ProviderPage;
