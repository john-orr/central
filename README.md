# central
AKA Program 2

This is the NodeJS program running on the central server

<ul>
	<li>Provides REST API to allow the temperature listeners to send data to it</li>
	<li>Pushes data to MongoDB</li>
	<li>
		Broadcasts via web sockets to listening web applications
		<ul>
			<li>App doesn't have to constantly poll</li>
		</ul>
	</li>
	<li>1 purpose -> storage</li>
</ul>