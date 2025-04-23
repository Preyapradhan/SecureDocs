"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";

export default function UploadDocument() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [documents, setDocuments] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.error(error?.message || "User not found");
        setMessage("❌ Authentication error. Please login again.");
        return;
      }
      setUserId(data.user.id);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) fetchDocuments();
  }, [userId]);

  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("user_id", userId)
      .order("uploaded_at", { ascending: false });

    if (error) console.error(error.message);
    else setDocuments(data || []);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (e) => {
    e.preventDefault();

    if (!userId) return setMessage("❌ Please login first.");
    if (!file) return setMessage("❌ Please select a file to upload.");

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type))
      return setMessage("❌ Only PDF, DOCX, JPG, and PNG files allowed.");

    if (file.size > 10 * 1024 * 1024)
      return setMessage("❌ File size must be under 10MB.");

    setUploading(true);
    const filePath = `${userId}/${Date.now()}_${file.name}`;

    try {
      const { error: uploadError } = await supabase
        .storage
        .from("documents")
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const { data: publicUrlData, error: publicUrlError } = supabase
        .storage
        .from("documents")
        .getPublicUrl(filePath);

      if (publicUrlError) throw publicUrlError;

      const publicUrl = publicUrlData.publicUrl;

      const { error: insertError } = await supabase
        .from("documents")
        .insert([
          {
            user_id: userId,
            document_name: file.name,
            document_type: file.type,
            file_url: publicUrl,
            is_encrypted: false,
            uploaded_at: new Date(),
          },
        ]);

      if (insertError) throw insertError;

      setMessage("✅ File uploaded successfully!");
      setFile(null);
      fileInputRef.current.value = "";
      fetchDocuments();
    } catch (error) {
      console.error(error.message);
      setMessage("❌ Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const renderFileIcon = (type) => {
    if (type.startsWith("image/")) return "🖼️";
    if (type === "application/pdf") return "📄";
    if (type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return "📝";
    return "📁";
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Upload a Document</h1>

      <form onSubmit={uploadFile} className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          disabled={uploading}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={uploading}
          className={`w-full py-2 px-4 text-white rounded ${uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center text-sm ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {/* Uploaded Documents */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-center mb-4">📂 Your Documents</h2>

        {documents.length === 0 ? (
          <p className="text-center text-gray-500">No documents uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className="flex items-center justify-between bg-gray-100 p-3 rounded hover:bg-gray-200 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{renderFileIcon(doc.document_type)}</span>
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate max-w-xs"
                  >
                    {doc.document_name}
                  </a>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(doc.uploaded_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
