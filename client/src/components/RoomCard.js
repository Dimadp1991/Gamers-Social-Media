import React from 'react'
export default function RoomCard(props) {
	return (
		<li>
			<div className="room" 
				style={{ 
					backgroundImage: 'url(' + props.img + ')' + (props.fallbackImg ? ', url(' + props.fallbackImg + ')' : ''), 
					backgroundRepeat: 'no-repeat', 
					backgroundPosition: 'center center', 
					backgroundSize: 'cover', 
					backgroundColor: 'white',
					cursor: 'pointer',
					margin: '5px',
					boxSizing: 'border-box',
					position: 'relative' }}
					onClick={props.onClick}>
				<div className="room_info" 
						style={{
							position: 'absolute',
							bottom: '0',
							width: '100%'
						}}>
					<p><strong>{props.game}</strong><br /></p>
				</div>
			</div>
		</li>
	)
}