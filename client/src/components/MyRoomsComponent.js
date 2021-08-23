import axios from '../services/axios.config'
import { React, useEffect, useState } from 'react'
import './MyRoomsComponent.css'
import { Carousel } from 'react-responsive-carousel'
import RoomOptions from '../components/RoomOptions'
import { ImUserPlus } from 'react-icons/im'
import InviteUsersModal from './InviteUsersModal'
//import $ from 'jquery'
export default function MyRoomsComponent({ Profiles_RC, MyProfile_RC }) {


    const [MyRooms, SetMyRoomsList] = useState([])
    const [OBJMyRooms, SetOBJMyRoomsList] = useState([])
    const [RoomIndex, SetRoomIndex] = useState(0)
    const [OpenRoomOptions, SetOpenRoomOptions] = useState(false)
    const [FocusedRoom, SetFocusedRoom] = useState(null)
    const [isOpen, SetisOpen] = useState(false)
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
            SetOBJMyRoomsList(res.data)
            for (let i = 0; i < res.data.length; i++) {
                const room = res.data[i]
                axios.get(`/games/info?name=${room.game}`).then((info) => {
                    //console.log(info.data.image)


                    SetMyRoomsList(MyRooms =>
                        [...MyRooms, <div key={i} onClick={() => { SetFocusedRoom(room); SetOpenRoomOptions(true) }}>
                            <label key={i} >{room.name}</label>
                            <img src={info.data.image} />
                        </div >])
                })


            }

        })

    }

    function ActionFriendInviteClicked(friend_id) {
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

    }


    useEffect(() => {

        GetAllGamesOption()

    }, [])

    /* Pc|Xbox|Playstation|Android|Apple|Psp */
    return (
        <div>
            <div className="container-md" id="my_rooms_comp">
                <label id="rooms_lable">My ROOMS</label>
                <ImUserPlus id="invite_friend_icon" data-tip="Invite Friend To Room"
                    onClick={() => SetisOpen(true)} />
                <InviteUsersModal open={isOpen}
                    friendTo={(friend_id) => ActionFriendInviteClicked(friend_id)}
                    Profiles={Profiles_RC} MyProfile={MyProfile_RC}
                    onClose={() => SetisOpen(false)}
                />
                <Carousel infiniteLoop useKeyboardArrows onChange={(index, obj) => {
                    SetRoomIndex(parseInt(obj.key.slice(2, 3)))
                }} >
                    {MyRooms}
                </Carousel>
            </div>
            <RoomOptions open={OpenRoomOptions}
                Room={FocusedRoom}
                onClose={() => SetOpenRoomOptions(false)} />


        </div >

    )
}
