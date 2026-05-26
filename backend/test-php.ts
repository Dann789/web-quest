import { PhpRunnerController } from "./src/controllers/user/phpRunner.controller";

async function main() {
  const result = await PhpRunnerController.run({
    codes: {
      php: "<?php echo 'Hello World dari PHP!'; ?>",
    }
  });
  console.log("Result:", result);
}

main();
