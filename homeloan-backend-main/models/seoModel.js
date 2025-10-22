// SeoModel 
const db = require("../config/db");

const SeoModel = {
  getSeoById: (callback) => {
    db.query("SELECT * FROM seo_content WHERE id = 1", callback);
  },

  upsertSeo: (seoData, callback) => {
    const { page, meta_title, meta_description, schema_json } = seoData;

    db.query(
      `INSERT INTO seo_content (id, page, meta_title, meta_description, schema_json)
       VALUES (1, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
         page = VALUES(page),
         meta_title = VALUES(meta_title),
         meta_description = VALUES(meta_description),
         schema_json = VALUES(schema_json)`,
      [page, meta_title, meta_description, schema_json],
      callback
    );
  }
};

module.exports = SeoModel;
