const fs = require("fs");
const path = require("path");

// Directories to modify
const targetDirs = ["src/app", "src/component"];
const suppressionCode = `\n\n`;

const addErrorSuppress = (dir) => {
  if (!fs.existsSync(dir)) return;

  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      addErrorSuppress(fullPath); // Recursively process subdirectories
    } else if (file.endsWith(".js") || file.endsWith(".jsx") || file.endsWith(".ts") || file.endsWith(".tsx")) {
      let content = fs.readFileSync(fullPath, "utf8");
      if (!content.includes("console.error = () => {};")) {
        fs.writeFileSync(fullPath, suppressionCode + content);
        console.log(`✅ Updated: ${fullPath}`);
      }
    }
  });
};

// Process all target directories
targetDirs.forEach((dir) => addErrorSuppress(path.join(__dirname, dir)));

console.log("✅ Done! All files updated.");
