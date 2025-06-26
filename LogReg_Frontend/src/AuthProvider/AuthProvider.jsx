import AuthContext from "../AuthContext/AuthContext";
import useAxiosInstance from "../Hooks/useAxiosinstance";

export default function AuthProvider({ children }) {
  const axiosInstance = useAxiosInstance();

  const handleSubmit = async (url, body) => {
    try {
      console.log("Submitting body:", body); // Debug log
      const res = await axiosInstance.post(url, body);

      console.log("Backend response:", res.data); // Debug log
      return {
        status: res?.status,
        message: res?.data?.message || res?.data,
      };
    } catch (error) {
      console.error("Error submitting:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ handleSubmit }}>
      {children}
    </AuthContext.Provider>
  );
}
