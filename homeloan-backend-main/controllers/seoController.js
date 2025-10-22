// seoController.js
const SeoModel = require("../models/seoModel");

exports.getSeo = (req, res) => {
  const page = req.params.page; // <-- add this
  SeoModel.getSeoById(page, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.json({
        meta_title: "",
        meta_description: "",
        schema_json: "{}",
      });
    }
    res.json(results[0]);
  });
};

exports.updateSeo = (req, res) => {
  // ✅ ensure page is always included
  const seoData = {
    page: req.params.page, // <-- pick from URL param
    ...req.body,           // meta_title, meta_description, schema_json
  };

  SeoModel.upsertSeo(seoData, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "SEO content upserted successfully!" });
  });
};
