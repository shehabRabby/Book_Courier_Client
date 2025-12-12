import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../Hooks/useAuth";

const useRole = () => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setIsRoleLoading(true);

      user
        .getIdToken()
        .then((token) => {
          axios
            .get(`${import.meta.env.VITE_API_URL}/users/role/${user.email}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setRole(res.data.role);
            })
            .catch((error) => {
              console.error("Error fetching user role:", error);
              setRole("user");
            })
            .finally(() => {
              setIsRoleLoading(false);
            });
        })
        .catch((tokenError) => {
          console.error("Failed to retrieve ID Token:", tokenError);
          setRole("user");
          setIsRoleLoading(false);
        });
    } else if (!loading) {
      setRole(null);
      setIsRoleLoading(false);
    }
  }, [user, loading]);
  return [role, isRoleLoading];
};

export default useRole;
