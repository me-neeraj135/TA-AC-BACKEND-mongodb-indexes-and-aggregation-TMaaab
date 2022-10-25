/** @format */

let mongoose = require(`mongoose`);

let Schema = mongoose.Schema;

let articleSchema = new Schema({
  title: { type: String },
  description: { type: String },
  tagsString: [String],
});

// Add multikey indexes on tags which is an array of strings

articleSchema.index({ tagsString: 1 });

// Add text indexes on title as users will search for texts present in an article's title.

articleSchema.index({ title: "title_name" });

// Update text indexes to include descriptions as well. Implement text indexes on both title and description.

articleSchema.index({ title: "title_name", description: "text" });

// export schema

module.exports = mongoose.model(`Article`, articleSchema);
