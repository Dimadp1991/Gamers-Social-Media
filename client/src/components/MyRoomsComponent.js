import { React, useEffect, useState } from 'react'
import NewRoomForm from '../components/NewRoomForm'
import RoomCard from '../components/RoomCard'
import RoomOptions from '../components/RoomOptions'
import axios from '../services/axios.config'
import ReactTooltip from 'react-tooltip'
import './MyRoomsComponent.css'
//import $ from 'jquery'
export default function MyRoomsComponent(/*{ Profiles_RC,MyProfile_RC } */) {

    //no


    const [MyRooms, SetMyRoomsList] = useState([])
    const [shownewRoomFormResults, setShownewRoomForm] = useState(false)
    // const [OBJMyRooms, SetOBJMyRoomsList] = useState([])
    // const [RoomIndex, SetRoomIndex] = useState(0)
    const [OpenRoomOptions, SetOpenRoomOptions] = useState(false)
    const [FocusedRoom, SetFocusedRoom] = useState(null)
    // const [isOpen, SetisOpen] = useState(false)
    /*     function CreateRoomclicked() {
            const new_room = {
                name: $('#room_name').val(),
                game: $('select[name=gameSelector] option').filter(':selected').val(),
                platform: $('select[name=PlatformSelector] option').filter(':selected').val(),
                description: $('#game_desc_ta').val()
            }
            // console.log(new_room)
    
            axios.post('/room/', new_room).then((res) => {
                // return ReactDOM.createPortal(`/room/${res.data}`, this.containerEl)
                window.open(`/room/${res.data}`, '_blank')
            })
    
    
        } */

    function GetAllGamesOption() {

        axios.get('/room/list').then((res) => {
            //console.log(res.data)
            // SetOBJMyRoomsList(res.data)
            for (let i = 0; i < res.data.length; i++) {
                const room = res.data[i]
                axios.get(`/games/info?name=${room.game}`).then((info) => {
                    //console.log(info.data.image)



                    SetMyRoomsList(MyRooms =>
                        [...MyRooms, <div key={i} className="room_card_" onClick={() => { SetFocusedRoom(room); SetOpenRoomOptions(true) }}>
                            <RoomCard game={room.name} img={info.data.image} />
                        </div >])
                })


            }

        })

    }

    /*   function ActionFriendInviteClicked(friend_id) {
          axios.post('/notifications/new_note',
              {
                  from_id: MyProfile_RC.userId,
                  to_id: friend_id,
                  update: `You Have Received new invitation From ${MyProfile_RC.name} <br>
                          <a href=${'/room/' + OBJMyRooms[RoomIndex]._id} >Link To Join The Room</a> `,
                  timestamp: new Date().now
              }).then(() => {
   
                  console.log('invitetion Sent')
              })
   
      } */


    useEffect(() => {

        GetAllGamesOption()

    }, [])

    /* Pc|Xbox|Playstation|Android|Apple|Psp */
    return (
        <div>
            <div className="container-md" id="my_rooms_comp_old">

                <div className="row mt-5">
					<RoomCard onClick={() => setShownewRoomForm(!shownewRoomFormResults)} game="" img="images/addnewroom.png" />
                    {MyRooms}
				</div>

                <ReactTooltip />
                {shownewRoomFormResults ? <NewRoomForm /> : null}
            </div>
            <RoomOptions open={OpenRoomOptions}
                Room={FocusedRoom}
                onClose={() => SetOpenRoomOptions(false)} />


        </div >

    )
}
