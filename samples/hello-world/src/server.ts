/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import dotenv from 'dotenv';
import { resolve as resolvePath } from 'path';
import App from './app';
import App2 from './app';

//在这里添加一些通用错误处理程序，以记录我们不期望的任何异常
process.on('uncaughtException', err => console.log('uncaughtException', err));
process.on('unhandledRejection', reason => console.log('unhandledRejection', reason));

// Read .env 如果文件存在 read .env
dotenv.config();

//此功能启动MRE服务器。除非我们检测到代码正在可调试环境中运行，否则它将立即被调用。如果是这样，则会引入一个小延迟，以便在服务器开始接受连接之前有时间让调试器连接。
function runApp() {
	// 开始侦听连接，并提供静态文件
	const server1 = new MRE.WebHost({
		baseDir: resolvePath(__dirname, '../public')
	});

	const server2 = new MRE.WebHost({
		baseDir: resolvePath(__dirname, '../public'),
		port: 3902
	});

	// Handle new application sessions 处理新的应用程序会话
	server1.adapter.onConnection(context => new App(context));

	// Handle new application sessions 处理新的应用程序会话
	server2.adapter.onConnection(context => new App2(context));
}

// Check whether code is running in a debuggable watched filesystem
// environment and if so, delay starting the app by one second to give
// the debugger time to detect that the server has restarted and reconnect.
// The delay value below is in milliseconds so 1000 is a one second delay.
// You may need to increase the delay or be able to decrease it depending
// on the speed of your machine.
const delay = 1000;
const argv = process.execArgv.join();
const isDebug = argv.includes('inspect') || argv.includes('debug');

if (isDebug) {
	setTimeout(runApp, delay);
} else {
	runApp();
}
