import {createReadStream} from 'node:fs';
import path from 'node:path';
import test from 'ava';
import {execa} from 'execa';

test('main', async t => {
	const {stdout} = await execa('./cli.js', ['--version']);
	t.true(stdout.length > 0);
});

test('supports opening files from stdin', async t => {
	const cliPath = path.join(import.meta.dirname, './cli.js');

	const stdinStream = createReadStream(cliPath);

	const subprocess = execa(cliPath, {
		input: stdinStream,
	});

	await t.notThrowsAsync(subprocess);
});
