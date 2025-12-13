import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    // 1. Set the default role to 'user' for safety and clarity
    data: role = "user",
    isLoading: isRoleLoading, // 2. Destructure the refetch function
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email], // Ensures query only runs if Firebase auth is done AND we have an email

    enabled: !loading && !!user?.email,

    queryFn: async () => {
      try {
        // Backend endpoint is correct: /users/role/:email
        const res = await axiosSecure.get(`/users/role/${user.email}`);
        return res.data.role;
      } catch (error) {
        console.error(
          "Error fetching user role from server (403 or 404 expected if no role):",
          error
        ); // Fallback to 'user' if the API fails or returns an error status
        return "user";
      }
    }, // 3. IMPORTANT CHANGE: Removed initialData: "user". // The default role assignment (data: role = 'user') handles the initial value. // 4. Increased cache time to 15 minutes, as roles don't change often.
    staleTime: 1000 * 60 * 15,
  }); // Clean up the final return logic
  if (loading) {
    return ["user", true, refetch]; // Return 'user' as a safer default role
  } // Return role, loading status, and the refetch function

  return [role, isRoleLoading, refetch];
};

export default useRole;
