import child_process from "child_process";

// export function run_shell_command(command: string) {
//   child_process.exec(command);
// }

export function run_shell_command(args: string) {
  const execProcess = child_process.exec(args, { 'encoding': 'utf8' }, (error, stdout) => {
    console.log(`exec stdout: ${stdout} error: ${error}`);
  });
  console.log('exec spawn');
  console.log(execProcess.spawnfile);
  execProcess.on('spawn', () => {
    console.log('exec on spawn');
  });
  execProcess.on('error', (err) => {
    console.log(`exec on error:${err}`);
  });
  execProcess.on('exit', (code, signal) => {
    console.log(`exec on exit code: ${code} signal: ${signal}`);
  });
  execProcess.on('close', (code: number, args: any[])=> {
    console.log(`exec on close code: ${code} args: ${args}`);
  });
}

