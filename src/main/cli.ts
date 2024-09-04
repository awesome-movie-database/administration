import { Command } from "commander";

import { createUserCommand } from "src/presentation/cli";


new Command("Administration")
    .version("0.1.0")
    .addCommand(createUserCommand)
    .parseAsync()
