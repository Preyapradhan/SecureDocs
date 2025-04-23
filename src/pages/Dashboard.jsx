import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import UploadDocument from "./UploadDocument";
import LogoutButton from "../components/LogoutButton";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        navigate("/login");
      } else {
        setUser(data.user);
        fetchDocuments(data.user.id);
      }
    };

    fetchUser();
  }, [navigate]);

  const fetchDocuments = async (userId) => {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching documents:", error.message);
      return;
    }

    const updatedDocs = await Promise.all(
      data.map(async (doc) => {
        if (!doc.file_path) {
          console.error("File path is missing for document", doc.id);
          return doc;
        }

        const { data: signedUrlData, error: signedUrlError } = await supabase.storage
          .from("documents")
          .createSignedUrl(doc.file_path, 604800); // Expiry time: 7 days

        if (signedUrlError) {
          console.error("Error creating signed URL:", signedUrlError.message);
          return doc;
        }

        return { ...doc, signed_url: signedUrlData?.signedUrl };
      })
    );

    setDocuments(updatedDocs);
  };

  const handleDelete = async (docId, filePath) => {
    const { error: storageError } = await supabase.storage
      .from("documents")
      .remove([filePath]);

    if (storageError) {
      console.error("Error deleting from storage:", storageError.message);
      return;
    }

    const { error: dbError } = await supabase
      .from("documents")
      .delete()
      .eq("id", docId);

    if (dbError) {
      console.error("Error deleting from database:", dbError.message);
      return;
    }

    setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== docId));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {user ? (
        <>
          <p className="mt-2">Welcome, {user.email}!</p>

          <UploadDocument userId={user.id} onUploadSuccess={() => fetchDocuments(user.id)} />

          <h2 className="text-xl font-semibold mt-6">Your Documents</h2>

          <div className="w-full max-w-2xl bg-white p-4 rounded shadow">
            {documents.length > 0 ? (
              documents.map((doc) => (
                <div key={doc.id} className="flex justify-between items-center border-b p-2">
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {doc.filename}
                  </a>

                  <button
                    onClick={() => handleDelete(doc.id, doc.file_path)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No documents uploaded yet.</p>
            )}
          </div>

          <LogoutButton />
        </>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}

export default Dashboard;
