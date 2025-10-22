// const db = require("../config/db");

// const getSeo = async (page) => {
//   const [rows] = await db.promise().query(
//     "SELECT * FROM seo_contents WHERE page = ? LIMIT 1",
//     [page]
//   );
//   return rows[0] || null;
// };

// const updateSeo = async (page, meta_title, meta_description, schema_json) => {
//   // check if page exists
//   const [rows] = await db.promise().query(
//     "SELECT id FROM seo_contents WHERE page = ?",
//     [page]
//   );

//   if (rows.length > 0) {
//     // update
//     await db.promise().query(
//       "UPDATE seo_contents SET meta_title=?, meta_description=?, schema_json=? WHERE page=?",
//       [meta_title, meta_description, schema_json, page]
//     );
//   } else {
//     // insert new row
//     await db.promise().query(
//       "INSERT INTO seo_contents (page, meta_title, meta_description, schema_json) VALUES (?, ?, ?, ?)",
//       [page, meta_title, meta_description, schema_json]
//     );
//   }
// };

// module.exports = { getSeo, updateSeo };
