const { execSync } = require('child_process');

const files = process.argv.slice(2);

files.forEach((file) => {
  try {
    console.log(`Running Code Analyzer for ${file}`);
    const command = `sf code-analyzer run --target "${file}"`;
    const output = execSync(command, { encoding: 'utf8' });

    console.log(output);

    // Simple pattern to count violations from console output
    const match = output.match(/Found\s+(\d+)\s+rule/gi);
    const ruleMatches = output.match(/^\s*\d+\s+/gm); // Lines that start with a number (rule rows)

    const violationsCount = ruleMatches ? ruleMatches.length : 0;

    if (violationsCount > 0) {
      console.error(`❌ Found ${violationsCount} violation(s) in ${file}`);
      process.exit(1);
    } else {
      console.log(`✅ No violations found in ${file}`);
    }
  } catch (error) {
    console.error(`🚨 Failed to run Code Analyzer for ${file}`);
    console.error(error.message || error);
    process.exit(1);
  }
});
