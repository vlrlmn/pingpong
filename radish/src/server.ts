import net from 'net';
import Config from './config'
import BackupStorage from './pkg/backup/BackupStorage';
import TCPRouter from './api/tcp/tcp';

const config = new Config()

BackupStorage.load(config.backupFile)
const server = net.createServer((socket) => {
	socket.on('data', (data:string) => {
		const messages = data.toString().trim().split('\n');
		messages.forEach(message => {
			const responseData = TCPRouter.handleRequest(message);
			socket.write(responseData);
		})
	});
});

server.listen(config.port, config.host, () => {
	console.log(`🌱 Radish running at ${config.host}:${config.port}`);
});

process.on('SIGINT', () => {
	server.close(() => {
		// console.log('✅ Server gracefuly closed.');
	});
	BackupStorage.save(config.backupFile)
});

process.on('SIGINT', async () => {
    server.close()
    process.exit(0)
  })
  
  process.on('SIGTERM', async () => {
    server.close()
    process.exit(0)
  })
  
  process.on('uncaughtException', (err) => {
    // console.error('Uncaught Exception:', err)
    process.exit(1)
  })