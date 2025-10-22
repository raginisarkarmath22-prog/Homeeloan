import React, { useState, useEffect } from "react";

export default function SeoForm({ page }) {
  const [seo, setSeo] = useState({
    meta_title: "",
    meta_description: "",
    schema_json: "{}",
  });
  const [error, setError] = useState("");

  // Fetch SEO when component loads
  useEffect(() => {
    fetch(`/api/seo/${page}`)
      .then((res) => res.json())
      .then((data) => {
        // Ensure schema_json is a string
        setSeo({
          meta_title: data.meta_title || "",
          meta_description: data.meta_description || "",
          schema_json:
            typeof data.schema_json === "object"
              ? JSON.stringify(data.schema_json, null, 2)
              : data.schema_json || "{}",
        });
      });
  }, [page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    let parsedJson;
    try {
      parsedJson = JSON.parse(seo.schema_json || "{}"); 
    } catch (err) {
      setError("❌ Schema JSON is invalid. Please check formatting.");
      return;
    }

    fetch(`/api/seo/${page}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meta_title: seo.meta_title,
        meta_description: seo.meta_description,
        schema_json: JSON.stringify(parsedJson), 
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((err) => setError("❌ Failed to update SEO: " + err.message));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Update SEO for {page}
      </h2>

      {error && (
        <div
          style={{
            background: "#ffe0e0",
            color: "#a00",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "15px",
          }}
        >
          {error}
        </div>
      )}

      {/* Meta Title */}
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="meta_title"
          style={{
            display: "block",
            marginBottom: "5px",
            fontWeight: "bold",
            color: "#555",
          }}
        >
          Meta Title
        </label>
        <input
          id="meta_title"
          type="text"
          name="meta_title"
          value={seo.meta_title}
          onChange={handleChange}
          placeholder="Enter meta title"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Meta Description */}
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="meta_description"
          style={{
            display: "block",
            marginBottom: "5px",
            fontWeight: "bold",
            color: "#555",
          }}
        >
          Meta Description
        </label>
        <textarea
          id="meta_description"
          name="meta_description"
          value={seo.meta_description}
          onChange={handleChange}
          placeholder="Enter meta description"
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Schema JSON */}
      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="schema_json"
          style={{
            display: "block",
            marginBottom: "5px",
            fontWeight: "bold",
            color: "#555",
          }}
        >
          Schema JSON
        </label>
        <textarea
          id="schema_json"
          name="schema_json"
          value={seo.schema_json}
          onChange={handleChange}
          placeholder='Enter schema JSON'
          style={{
            width: "100%",
            height: "150px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
            fontFamily: "monospace",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Submit Button */}
      <div style={{ textAlign: "center" }}>
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        >
          Update SEO
        </button>
      </div>
    </form>
  );
}
